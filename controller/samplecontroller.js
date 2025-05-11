const sample = require('../model/sample');

exports.create_sample = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ error: " required fields" })
        } else {
            const sample_field = await sample.create(data);
            return res.status(200).json({ success: true, samples: sample_field })
        }
    }
    catch (err) {
        console.log("error :", err)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

