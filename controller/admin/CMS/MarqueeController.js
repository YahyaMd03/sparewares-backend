const Marquee = require('../../../model/admin_model/CMS/Marqueetag')
//Post category
exports.create_category = async (req, res) => {
    try {
        const {name,sort_tag,image} = req.body;
        if (!name  || !image) {
            return res.status(400).json({ error: " required fields" })
        } else {
            const Category_field = await Marquee.create({ name,sort_tag,image: image });
            return res.status(200).json({ success: true, Marquee: Category_field })
        }
    }
    catch (err) {
        console.log("error :", err)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

//fetch category
exports.fetch_category = async (req, res) => {
    try {
        const Category_field = await Marquee.find({ is_deleted: false }).sort("sort_tag");
        return res.status(200).json({ success: true, Marquee: Category_field })
    } catch (err) {
        console.log("error :", err)
        return res.status(500).json({ message: "internal server error ", error: err })
    }
}



//delete category BY ID 
exports.delete_category = async (req, res) => {
    try {
        const Marquee_id = req.params.id;
        const updated_Category = await Marquee.findByIdAndUpdate(Marquee_id,{ is_deleted: true },{ new: true });
        if (!updated_Category) {
            return res.status(404).json({ message: 'Category not found' });
        } else {
            return res.status(200).json({ success: true, Marquee: updated_Category })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "internal server error ", error: err })
    }
}

