const Model = require('../../../model/admin_model/categories_Model/Model')
//Post category
exports.model_post = async (req, res) => {
    try {
        const data = req.body;
        console.log(data , "file")
        if (!data) {
            return res.status(400).json({ error: " required fields" })
        } else {
            const model_field = await Model.create(data);
            return res.status(200).json({ success: true, model: model_field })
        }
    }
    catch (err) {
        console.log("error :", err)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

//fetch category
exports.model_fetch = async (req, res) => {
    try {
        const fetch_Category = await Model.find({ is_deleted: false });
        return res.status(200).json({ success: true, Categories: fetch_Category })
    } catch (err) {
        console.log("error :", err)
        return res.status(500).json({ message: "internal server error "})
    }
}

//fetch category BY ID  
exports.model_fetch_id = async (req, res) => {
    try {
        const category_id = req.params.id;
        const fetch_Category_id = await Model.find({ _id: category_id });
        return res.status(200).json({ success: true, Categories: fetch_Category_id })
    } catch (err) {
        console.log("error :", err)
        return res.status(500).json({ message: "internal server error ", error: err })
    }

}

//UPDATE category BY ID 
exports.update_model_id = async (req, res) => {
    try {
        const data = req.body;
        const category_id = req.params.id;
        const updatedCategory = await Model.findByIdAndUpdate(category_id, data, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        } else {
            return res.status(200).json({ success: true, Category: updatedCategory })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "internal server error ", error: err })
    }
}

//delete category BY ID 
exports.delete_model = async (req, res) => {
    try {
        const category_id = req.params.id;
        const updatedCategory = await Model.findByIdAndUpdate(category_id, { is_deleted: true }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        } else {
            return res.status(200).json({ success: true, Category: updatedCategory })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "internal server error ", error: err })
    }
}

