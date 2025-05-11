const Logomodal = require('../../../model/admin_model/CMS/Logoupdate')
const FooterLogo = require('../../../model/admin_model/CMS/Footerlogo')


exports.create_logo = async (req, res) => {
    try {
        const { image } = req.body;
        console.log(image)
        const Logo_post = await Logomodal.findOneAndUpdate({}, { image: image }, { new: true });
        if (!Logo_post) {
            await Logomodal.create(req.body)
        }
        return res.status(200).json({ message: 'Successfully updated', data: Logo_post });
    } catch (err) {
        return res.status(500).json({ message: 'Error in updating ' });
    }
};


exports.getlogo = async (req, res) => {
    try {
        const data = await Logomodal.find()
        return res.status(200).json({ "Message": "success", "data": data })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ "Message": "Error in getting refund and cancellation" })
    }

}

exports.createFooterLlogo = async (req, res) => {
    try {
        const { image } = req.body;
        const Logo_post = await FooterLogo.findOneAndUpdate({}, { image: image }, { new: true });
        if (!Logo_post) {
            await FooterLogo.create(req.body)
        }
        return res.status(200).json({ message: 'Successfully updated', data: Logo_post });
    } catch (err) {
        return res.status(500).json({ message: 'Error in updating ' });
    }
};

exports.getfooterlogo = async (req, res) => {
    try {
        const data = await FooterLogo.find()
        return res.status(200).json({ "Message": "success", "data": data })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ "Message": "Error in getting refund and cancellation" })
    }

}
