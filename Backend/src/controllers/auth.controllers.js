const userModel = require('../models/user.model');
const companyModel = require('../models/company.model');
const candidateModel = require('../models/candidate.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const uploadFile = require('../config/storage.config');


async function registerUser(req, res) {


    const { name, email, password, role } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        email
    })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        name,
        email,
        password: hash,
        role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET)

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(201).json({
        message: "Registered successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    })

}


async function candidateinfo(req, res) {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized. Please register first.",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (user.role !== "candidate") {
            return res.status(403).json({
                message: "Only candidates can create candidate profile",
            });
        }

        const {
            phone,
            collegeName,
            degree,
            branch,
            graduationYear,
            location,
            skills,
            bio,
        } = req.body;

        const existingCandidate = await candidateModel.findOne({
            userId: user._id,
        });

        if (existingCandidate) {
            return res.status(400).json({
                message: "Candidate profile already exists",
            });
        }

        const candidate = await candidateModel.create({
            userId: user._id,
            phone,
            collegeName,
            degree,
            branch,
            graduationYear,
            location,

            skills: skills
                ? skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter((skill) => skill)
                : [],

            bio,
        });

        return res.status(201).json({
            message: "Candidate profile created successfully",
            candidate,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }
}



async function recruiterinfo(req, res) {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized. Please login first.",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (user.role !== "recruiter") {
            return res.status(403).json({
                message: "Access denied",
            });
        }

        const {
            companyName,
            designation,
            companyWebsite,
            phone,
            location,
            companyDescription,
        } = req.body;

        // Check if recruiter already has a company
        const existingCompany = await companyModel.findOne({
            recruiterId: user._id,
        });

        if (existingCompany) {
            return res.status(400).json({
                message: "Company profile already exists",
            });
        }

        const company = await companyModel.create({

            recruiterId: user._id,

            companyName,

            companyWebsite,

            phone,

            location,

            companyDescription,

            designation,
        });

        return res.status(201).json({
            message: "Company profile created successfully",
            company,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

}



async function login(req, res) {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password",
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });



    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }

}


async function logout(req, res) {
    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
        });

        return res.status(200).json({
            message: "Logged out successfully",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }
}


async function getCurrentUser(req, res) {

    try {

        const user = await userModel.findById(req.user.id).select("-password");

        res.status(200).json({
            user,
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
        });

    }

}

module.exports = { registerUser, candidateinfo, recruiterinfo, login, logout, getCurrentUser }




