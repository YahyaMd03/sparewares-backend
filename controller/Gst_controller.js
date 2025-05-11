const GST = require('../model/Gst_model');

exports.create_GST = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ error: " required fields" })
        } else {
            const GST_field = await GST.create(data);
            return res.status(200).json({ success: true, GST: GST_field })
        }
    }
    catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}


//fetch category
exports.fetch_GST = async (req, res) => {
    try {
        const fetch_GST = await GST.find({ is_deleted: false })
        return res.status(200).json({ success: true, GST: fetch_GST })
    } catch (err) {
        return res.status(500).json({ message: "internal server error ", error: err })
    }
}

//fetch category BY ID  
exports.fetch_GST_id = async (req, res) => {
    try {
        const gst_id = req.params.id;
        const GST_id = await GST.find({ _id: gst_id });
        return res.status(200).json({ success: true, GST: GST_id })
    } catch (err) {
        return res.status(500).json({ message: "internal server error ", error: err })
    }

}

//UPDATE category BY ID 
exports.update_GST = async (req, res) => {
    try {
        const data = req.body;
        const GST_id = req.params.id;
        const updatedGST = await GST.findByIdAndUpdate(GST_id, data, { new: true });
        if (!updatedGST) {
            return res.status(404).json({ message: 'GST not found' });
        } else {
            return res.status(200).json({ success: true, GST: updatedGST })

        }
    } catch (err) {
        return res.status(500).json({ message: "internal server error ", error: err })
    }
}

//delete category BY ID 
exports.delete_GST = async (req, res) => {
    try {
        const GST_id = req.params.id;
        const updatedGST = await GST.findByIdAndUpdate(GST_id, { is_deleted: true }, { new: true });
        if (!updatedGST) {
            return res.status(404).json({ message: 'GST not found' });
        } else {
            return res.status(200).json({ success: true, GST: updatedGST })
        }
    } catch (err) {
        return res.status(500).json({ message: "internal server error ", error: err })
    }
}