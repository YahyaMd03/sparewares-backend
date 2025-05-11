const Companynamemodal = require('../../../model/admin_model/CMS/Cname')



exports.getCname = async (req, res) => {
    try {
        const data = await Companynamemodal.find()
        return res.status(200).json({ "Message": "success", "data": data })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ "Message": "Error in getting policy" })
    }

}




exports.updateCname = async (req, res) => {
    try {
        const { Cname } = req.body;
        const updatedCname = await Companynamemodal.findOneAndUpdate({}, { Cname }, { new: true });
        if (!updatedCname) {
            await Companynamemodal.create(req.body);
        }
        return res.status(200).json({ message: 'Successfully updated' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error in updating company name' });
    }
};