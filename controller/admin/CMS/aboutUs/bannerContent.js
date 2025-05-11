const BannerContent = require('../../../../model/admin_model/CMS/about/aboutUs_bannerContent')





exports.getBannerContent = async (req, res) => {
    try {
        const data = await BannerContent.find()
        return res.status(200).json({ "Message": "success", "data": data })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ "Message": "Error in getting banner content" })
    }

}



exports.updateBannerContent = async (req, res) => {
    try {
        const { content } = req.body;
        if(!content){
        return res.status(500).json({ message: 'Content is required' });
        }

        const updatedBannerContent = await BannerContent.findOneAndUpdate({}, { content }, { new: true });
        if (!updatedBannerContent) {
           await BannerContent.create(req.body);
        }
        return res.status(200).json({ message: 'Successfully updated' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error in updating banner content' });
    }
};