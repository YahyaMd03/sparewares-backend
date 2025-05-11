const MainContent = require('../../../../model/admin_model/CMS/about/aboutUs_mainContent')





exports.getMainContent = async (req, res) => {
    try {
        const data = await MainContent.find()
        return res.status(200).json({ "Message": "success", "data": data })
    }
    catch (err) {
        return res.status(500).json({ "Message": "Error in getting main content" })
    }

}



exports.updateMainContent = async (req, res) => {
    try {
        const { content } = req.body;
        if(!content){
            return res.status(500).json({ message: 'Content is required' });
            }
        const updatedMainContent = await MainContent.findOneAndUpdate({}, { content }, { new: true });
        if (!updatedMainContent) {
           await MainContent.create(req.body);
        }
        return res.status(200).json({ message: 'Successfully updated' });
    } catch (err) {
        return res.status(500).json({ message: 'Error in updating main content' });
    }
};