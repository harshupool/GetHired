const nodemailer = require("nodemailer");
const userModel = require("../models/user.model");
const companyModel = require("../models/company.model");

const sendEmail = async (req, res) => {

    try {

        const { to, subject, message } = req.body;

        const recruiter = await userModel.findById(req.user.id);

        const company = await companyModel.findOne({
            recruiterId: req.user.id,
        });

        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {

                user: process.env.EMAIL,
                pass: process.env.EMAIL_APP_PASSWORD,

            },

        });

        await transporter.sendMail({

            from: process.env.EMAIL,
            to,
            subject,
            text: `${message}

----------------------------------------

Recruiter:
${recruiter.name}

Recruiter Email:
${recruiter.email}

Company:
${company.companyName}

----------------------------------------

This email was sent via GetHired.
`,

        });

        return res.status(200).json({

            success: true,
            message: "Email sent successfully",

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,
            message: "Unable to send email",

        });

    }


};


module.exports = {
    sendEmail,
};