const User = require("../model/user_model")

//fetch category BY ID  
exports.fetch_address = async (req, res) => {
    try {
        const { _id } = req.user;
        const address_field = await User.findOne({ _id: _id });
        return res.status(200).json({ success: true, address: address_field })
    } catch (err) {
        return res.status(500).json({ message: "internal server error ", error: err })
    }

}

//post address BY ID
exports.post_address = async (req, res) => {
    try {
        const data = req.body;
        const { _id } = req.user;
        const address = await User.find({ _id: _id });
        if(address[0].shipping_address.length>=4){
            return res.status(404).json({Message:'Sorry u cant add more address'})
        }
        const billing = address[0].billing_address == 0;
        let address_post;
        if (billing) {
            address_post = await User.updateOne(
                { _id: _id },
                {
                    $push: {
                        shipping_address: data, billing_address: {
                            b_fname: data.s_fname,
                            b_country: data.s_country,
                            b_number: data.s_number,
                            b_address: data.s_address,
                            b_city: data.s_city,
                            b_state: data.s_state,
                            b_pincode: data.s_pincode
                        }
                    }
                }
            );
        } else {
            if (data.defaultAddress === true) {
                await User.updateOne(
                    { _id: _id },
                    { $set: { "shipping_address.$[].defaultAddress": false } }
                );
            }
            const address_post = await User.updateOne(
                { _id: _id },
                { $push: { shipping_address: data } }
            );
        }

        return res.status(200).json({ success: true, address: address_post });
    } catch (err) {
        return res.status(500).json({ message: "internal server error", error: err });
    }
};


exports.address_edit = async (req, res) => {
    try {
        const { id } = req.params
        const get_address = await User.findOne(
            { "shipping_address._id": id },
            { "shipping_address.$": 1 }
        );
        return res.status(200).json({ get_address })
    } catch (err) {
        return res.status(500).json({ message: "internal server error ", error: err })
    }
}

exports.address_update = async (req, res) => {
    try {
        const data = req.body;

        const { _id } = req.user;
        const { id } = req.params;
        if (data.defaultAddress === true) {
            await User.updateOne(
                { _id: _id },
                { $set: { "shipping_address.$[].defaultAddress": false } }
            );
        }
        const address_put = await User.findOneAndUpdate(
            { _id: _id, "shipping_address._id": id },
            { $set: { "shipping_address.$": data } },
            { new: true }
        );

        if (!address_put) {
            return res.status(404).json({ message: 'Address not found' });
        } else {
            return res.status(200).json({ success: true, address: address_put });
        }
    } catch (err) {
        console.error("Error updating address:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


exports.address_delete = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id } = req.user;
        const delete_address = await User.updateOne(
            { _id: _id },
            { $pull: { shipping_address: { _id: id } } }
        );
        return res.status(200).json({ message: "Address deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error", error: err });
    }
}