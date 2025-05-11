const Shipping = require('../../../model/admin_model/CMS/Shipping')
const InitialshippingFee = require('../../../model/admin_model/CMS/Initialshipping')


exports.create_shipping = async (req, res) => {
    try {
        const { price } = req.body;
        const shipping_fee = await Shipping.findOneAndUpdate({}, { price: price });

        if (!shipping_fee) {
            await Shipping.create(req.body);
        }

        return res.status(200).json({ message: 'Successfully updated', data : shipping_fee });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error in updating ' });
    }
};

exports.create_Intitalshipping = async (req, res) => {
    try {
        const { initialPrice } = req.body;
        const shipping_fee = await InitialshippingFee.findOneAndUpdate({}, { initialPrice: initialPrice });

        if (!shipping_fee) {
            await InitialshippingFee.create(req.body);
        }


        return res.status(200).json({ message: 'Successfully updated', data : shipping_fee });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error in updating ' });
    }
};

exports.getShipping = async (req, res) => {
    try {
        const data = await Shipping.find().select('price -_id')
        return res.status(200).json({ "Message": "success", "data": data })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ "Message": "Error in getting refund and cancellation" })
    }

}

exports.getInitalShipping = async (req, res) => {
    try {
        const data = await InitialshippingFee.find().select('initialPrice -_id')
        return res.status(200).json({ "Message": "success", "data": data })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ "Message": "Error in getting refund and cancellation" })
    }

}