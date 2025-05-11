const Cart = require('../model/cartModel')
const Product = require('../model/product_model')
exports.create_cart = async (req, res) => {
    try {
        const { _id } = req.user;
        const data = req.body;

        if (!data) {
            return res.status(400).json({ error: "Required fields are missing" });
        } else {
            data.cart_user_user_Id = _id;
            const existing = await Cart.findCartItem(_id, data.cart_product_product_Id);
            if (existing) {
                existing.cart_quantity += data.cart_quantity;
                await existing.save();
            } else {
                await Cart.create(data);
            }
            const carts = await Cart.find({ cart_user_user_Id: _id, is_deleted: false });
            return res.status(200).json({ success: true, carts: carts });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

}


//fetch category
exports.fetch_cart = async (req, res) => {
    try {
        const fetch_Cart = await Cart.find({ is_deleted: false })
        return res.status(200).json({ success: true, Carts: fetch_Cart })
    } catch (err) {
        return res.status(500).json({ message: "internal server error ", error: err })
    }
}

//fetch category BY ID  
exports.fetch_cart_id = async (req, res) => {
    try {
        const { _id } = req.user;
        if (!_id) {
            return res.status(400).json({ Message: "user no" });
        }
        const cart_fetch = await Cart.find({ cart_user_user_Id: _id, is_deleted: false });
        const combinedData = [];
        for (let i = 0; i < cart_fetch.length; i++) {
            const cart = cart_fetch[i];
            const product = await Product.findOne({ _id: cart.cart_product_product_Id , stock_status:true });
            if (!product || !cart) {
                continue;
            }
            const combinedObject = { ...product.toObject(), ...cart.toObject() };
            combinedData.push(combinedObject);
        }
        return res.status(200).json({ success: true, products: combinedData });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }


}

exports.delete_cart = async (req, res) => {
    try {
        const { _id } = req.user;
        const cartdelete = await Cart.deleteMany(
            { cart_user_user_Id: _id } // Filter criteria condtition
        );
        if (!cartdelete) {
            return res.status(404).json({ message: 'Cart not found' });
        } else {
            return res.status(200).json({ success: true, cart: cartdelete })
        }
    } catch (err) {
        return res.status(500).json({ message: "internal server error ", error: err })
    }
}

exports.update_cart = async (req, res) => {
    try {
        const id = req.params.id;
        const cartdelete = await Cart.findOneAndDelete(
            { _id: id }
        );
        if (!cartdelete) {
            return res.status(404).json({ message: 'Cart not found' });
        } else {
            return res.status(200).json({ success: true, cart: cartdelete })
        }
    } catch (err) {
        return res.status(500).json({ message: "internal server error ", error: err })
    }
}


// exports.cart_qauntity = async (req, res) => {
//     try {
//         const { id, operation } = req.body;
//         if (operation === 'minus') {
//             const decrement = await Cart.findByIdAndUpdate(
//                 { _id: id },
//                 { $inc: { cart_quantity: -1 } },
//                 { new: true }
//             );
//             return res.status(200).json({ success: true, cart_qauntity: decrement })
//         } else {
//             const increment = await Cart.findByIdAndUpdate(
//                 { _id: id },
//                 { $inc: { cart_quantity: +1 } },
//                 { new: true }
//             );
//             return res.status(200).json({ success: true, cart_qauntity: increment })
//         }


//     } catch (err) {
//         console.log(err, "wiallimas")
//         return res.status(500).json({ message: "internal server error ", error: err })
//     }
// }




exports.cart_quantity = async (req, res) => {
    try {
        const { id, operation } = req.body;

        const cart = await Cart.findById(id);
        if (!cart) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        let newQuantity = cart.cart_quantity;
        let newWeight = cart.weight;
        

        if (operation === 'minus') {
            newQuantity -= 1;
            if (newQuantity < 0) {
                return res.status(400).json({ message: "Invalid quantity value" });
            }
            newWeight -= cart.weight / cart.cart_quantity; 
        } else if (operation === 'plus') {
            newQuantity += 1;
            newWeight += cart.weight / cart.cart_quantity; 
        } else {
            return res.status(400).json({ message: "Invalid operation" });
        }

        const updatedCart = await Cart.findByIdAndUpdate(
            id,
            { cart_quantity: newQuantity, weight: newWeight },
            { new: true }
        );

        return res.status(200).json({ success: true, cart_quantity: updatedCart.cart_quantity, weight: updatedCart.weight });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error", error: err });
    }
};







exports.checkcartexists = async (req, res) => {
    try {
        const { _id } = req.user
        const check = await Cart.find({ cart_user_user_Id: _id });
        const data = [];
        for (let product of check) {
            data.push(product.cart_product_product_Id)
        }
        return res.status(200).json({ data: data })
    } catch (err) {
        console.error('Error checking product in cart:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}