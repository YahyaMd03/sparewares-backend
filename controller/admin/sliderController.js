const Slider = require('../../model/admin_model/Slider')
exports.addSlider = async (req, res) => {
    try {
        const { img_name, sort_order } = req.body;
        const img_url = req.file.filename;
        if (!img_name || !img_url || !sort_order) {
            return res.status(400).json({ Msg: 'All fields are mandatory' });
        }
        const sliderData = {
            img_name,
            img_url,
            sort_order,
        };
        const slider = await Slider.create(sliderData);
        return res.status(200).json({ Message: 'Successfully added' });
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ Message:err.Message});
    }
};

exports.getSider = async (req, res) => {
    try {
        const slider = await Slider.find({ is_deleted: false })
        return res.status(200).json({ Message: 'Succes', data: slider })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ Message: 'Error in getting Sider' })
    }
}

exports.activeSlider = async (req, res) => {
    try {
        const { id } = req.body;
        const acticeSlider = await Slider.findByIdAndUpdate(id, { active: true })
        return res.status(200).json({ Message: 'Slider activated' })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ Mesage: 'Error in activating slider' })
    }
}

exports.deactiveSlider = async (req, res) => {
    try {
        const { id } = req.body;
        const deacticeSlider = await Slider.findByIdAndUpdate(id, { active: false })
        return res.status(200).json({ Message: 'Slider deactivated' })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ Mesage: 'Error in deactivating slider' })
    }
}

exports.deleteSlider = async (req, res) => {
    try {
        const { id } = req.body;
        const deleteSlider = await Slider.findByIdAndUpdate(id, { is_deleted: true })
        return res.status(200).json({ Message: 'Slider Deleted' })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ Mesage: 'Error in deleting slider' })
    }
}