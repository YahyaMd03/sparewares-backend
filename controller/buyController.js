const Cart = require('../model/cartModel')
const Product = require('../model/product_model')
exports.post_buy = async (req, res) => {
    try {
        const data = req.body;
        const { _id } = req.user;
        if (!data) {
            return res.status(400).json({ error: "Required fields are missing" });
        } else {
            const existingCart = await Cart.findOne({ cart_user_user_Id: _id, cart_product_product_Id: data.cart_product_product_Id, cart_quantity: data.cart_quantity, is_deleted: false });
            if (existingCart) {
                const product = await Product.findOne({ _id: existingCart.cart_product_product_Id });
                const combinedObject = { ...product.toObject(), ...existingCart.toObject() };
                return res.status(200).json({ success: true, products: combinedObject });
            } else {
                const newCart = await Cart.create(data);
                const product = await Product.findOne({ _id: newCart.cart_product_product_Id });
                const combinedObject = { ...product.toObject(), ...newCart.toObject() }
                return res.status(200).json({ success: true, products: combinedObject });
            }
        }
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

