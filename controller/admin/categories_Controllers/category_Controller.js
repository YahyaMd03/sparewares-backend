const Category = require('../../../model/admin_model/categories_Model/Category')
//Post category
exports.create_category = async (req, res) => {
    try {
        const { name, desc } = req.body;
        const image = req.file;
        if (!name || !desc || !image) {
            return res.status(400).json({ error: " required fields" })
        } else {
            const Category_field = await Category.create({ name, desc, image: image.location });
            return res.status(200).json({ success: true, Category: Category_field })
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
        const Category_field = await Category.find({ is_deleted: false });
        return res.status(200).json({ success: true, Category: Category_field })
    } catch (err) {
        console.log("error :", err)
        return res.status(500).json({ message: "internal server error ", error: err })
    }
}

//fetch category BY ID  
exports.fetch_category_id = async (req, res) => {
    try {
        const Category_id = req.params.id;
        const fetch_Category_id = await Category.find({ _id: Category_id });
        return res.status(200).json({ success: true, Category: fetch_Category_id })
    } catch (err) {
        console.log("error :", err)
        return res.status(500).json({ message: "internal server error ", error: err })
    }

}

//UPDATE category BY ID 
exports.update_category = async (req, res) => {
    try {
        const { name, desc } = req.body;
        const Category_id = req.params.id;
        if (req.file) {
            const imagePath = req.file.location;
            await Category.findByIdAndUpdate(
                Category_id,
                { name, desc, image: imagePath },
                { new: true }
            );
        } else {
            await Category.findByIdAndUpdate(
                Category_id,
                { name, desc },
                { new: true }
            );
        }

        return res.status(200).json({
            success: true,
            message: 'Category updated successfully',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};



//delete category BY ID 
exports.delete_category = async (req, res) => {
    try {
        const Category_id = req.params.id;
        const updated_Category = await Category.findByIdAndUpdate(Category_id, { is_deleted: true }, { new: true });
        if (!updated_Category) {
            return res.status(404).json({ message: 'Category not found' });
        } else {
            return res.status(200).json({ success: true, Category: updated_Category })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "internal server error ", error: err })
    }
}

