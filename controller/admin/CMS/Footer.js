
const Footer = require('../../../model/admin_model/CMS/Footer')





exports.getFooter = async (req, res) => {
    try {
        const data = await Footer.find()
        return res.status(200).json({ "Message": "success", "data": data })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ "Message": "Error in getting policy" })
    }

}



exports.updatefooter = async (req, res) => {
    try {
        const { Fname } = req.body;

        const updatedfooter = await Footer.findOneAndUpdate({}, { Fname }, { new: true });
        if (!updatedfooter) {
           await Footer.create(req.body);
        }
        console.log(updatedfooter)
        return res.status(200).json({ message: 'Successfully updated' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error in updating company name' });
    }
};