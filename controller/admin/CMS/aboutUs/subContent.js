const SubContent = require('../../../../model/admin_model/CMS/about/aboutUs_subContent')





exports.getSubContent = async (req, res) => {
    try {
        const data = await SubContent.find()
        return res.status(200).json({ "Message": "success", "data": data })
    }
    catch (err) {
        return res.status(500).json({ "Message": "Error in getting sub content" })
    }

}



exports.updateSubContent = async (req, res) => {
    try {
        const { content } = req.body;
        if(!content){
            return res.status(500).json({ message: 'Content is required' });
            }
        const updatedSubContent = await SubContent.findOneAndUpdate({}, { content }, { new: true });
        if (!updatedSubContent) {
           await SubContent.create(req.body);
        }
        return res.status(200).json({ message: 'Successfully updated' });
    } catch (err) {
        return res.status(500).json({ message: 'Error in updating sub content' });
    }
};