const BannerImage = require("../../../../model/admin_model/CMS/about/aboutUs_bannerImage")

exports.createBannerImage = async (req, res) => {
    try {
        const image  = req?.file;    
        if (!image) {
            return res.status(400).json({ message: 'No image uploaded' });
        }
        const bannerImage = await BannerImage.findOneAndUpdate({}, { image: image.location }, { new: true });
        if (!bannerImage) {
            await BannerImage.create({ image: image.location })
        }
        return res.status(200).json({ message: 'Successfully updated', data: bannerImage });
    } catch (err) {
        return res.status(500).json({ message: 'Error in creating or updating banner image ' });
    }
};


exports.getBannerImage = async (req, res) => {
    try {
        const data = await BannerImage.find()
        return res.status(200).json({ "Message": "success", "data": data })
    }
    catch (err) {
        return res.status(500).json({ "Message": "Error in getting banner image" })
    }

}