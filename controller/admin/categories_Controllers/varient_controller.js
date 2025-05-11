const Varient = require('../../../model/admin_model/categories_Model/VarientModel')
//Post category
exports.varient_post = async (req, res) => {
    try {
        const data = req.body;
        console.log(data , "file")
        if (!data) {
            return res.status(400).json({ error: " required fields" })
        } else {
            const Varient_field = await Varient.create(data);
            return res.status(200).json({ success: true, Varient: Varient_field })
        }
    }
    catch (err) {
        console.log("error :", err)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

//fetch category
exports.varient_fetch = async (req, res) => {
    try {
        const fetch_Category = await Varient.find({ is_deleted: false });
        return res.status(200).json({ success: true, Categories: fetch_Category })
    } catch (err) {
        console.log("error :", err)
        return res.status(500).json({ message: "internal server error ", error: errz })
    }
}

//fetch category BY ID  
exports.varient_fetch_id = async (req, res) => {
    try {
        const category_id = req.params.id;
        const fetch_Category_id = await Varient.find({ _id: category_id });
        return res.status(200).json({ success: true, Categories: fetch_Category_id })
    } catch (err) {
        console.log("error :", err)
        return res.status(500).json({ message: "internal server error ", error: err })
    }

}

//UPDATE category BY ID 
exports.update_varient_id = async (req, res) => {
    try {
        const data = req.body;
        const category_id = req.params.id;
        const updatedCategory = await Varient.findByIdAndUpdate(category_id, data, { new: true });
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
exports.delete_varient = async (req, res) => {
    try {
        const category_id = req.params.id;
        const updatedCategory = await Varient.findByIdAndUpdate(category_id, { is_deleted: true }, { new: true });
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

