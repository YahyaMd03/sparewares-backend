const ReturnModel = require("../../../model/admin_model/CMS/ReturnReason")


exports.create_reason = async (req, res) => {
    try {
        const { reason } = req.body
        if (!reason) {
            return res.status(400).json({ error: " reason is required" })
        }
        else {
            const reasonField = await ReturnModel.create({ reason: reason })
            return res.status(200).json({ success: true, reasonField })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Interval server error" })
    }
}

exports.getAll_reason = async (req, res) => {
    try {
        const result = await ReturnModel.find({ is_deleted: false })
        return res.status(200).json({ success: true, result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Interval server error" })
    }
}

exports.get_reason = async (req, res) => {
    const id = req.params.id
    try {
        const result = await ReturnModel.findOne({ _id: id, is_deleted: false })
        return res.status(200).json({ success: true, result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Interval server error" })
    }
}
exports.update_reason = async (req, res) => {
    try {
        const { reason } = req.body;
        const id = req.params.id;
        const updatedReason = await ReturnModel.findByIdAndUpdate(id, { reason: reason }, { new: true });
        if (!updatedReason) {
            return res.status(404).json({ message: 'reason not found' });
        } else {
            return res.status(200).json({ success: true, reason: updatedReason })

        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "internal server error ", error: err })
    }
}

exports.delete_Reason = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedReason = await ReturnModel.findByIdAndUpdate({ _id: id }, { is_deleted: true }, { new: true });
        if (!updatedReason) {
            return res.status(404).json({ message: 'reason not found' });
        } else {
            return res.status(200).json({ success: true, reason: updatedReason })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "internal server error ", error: err })
    }
}
