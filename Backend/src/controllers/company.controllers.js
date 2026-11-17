const companyModel = require('../models/company.model');
const {uploadFile} = require('../config/storage.config');
// const upload = require('../middlewares/multer.middleware');

const getCompanyProfile = async (req, res) => {

    try {

        const company = await companyModel.findOne({
            recruiterId: req.user.id
        });

        if (!company) {

            return res.status(404).json({
                message: "Company not found"
            });

        }

        res.status(200).json(company);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }


}


const updateCompanyProfile = async (req, res) => {

    try {

        const company = await companyModel.findOne({
            recruiterId: req.user.id,
        });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
            });
        }

        const {
            companyName,
            companyWebsite,
            designation,
            phone,
            location,
            companyDescription,
        } = req.body;

        company.companyName = companyName;
        company.companyWebsite = companyWebsite;
        company.designation = designation;
        company.phone = phone;
        company.location = location;
        company.companyDescription = companyDescription;


          if (req.file) {

            const uploadedFile = await uploadFile(req.file);

            company.logo = uploadedFile.url;

        }

        await company.save();

        return res.status(200).json(company);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

}





module.exports = { getCompanyProfile, updateCompanyProfile };