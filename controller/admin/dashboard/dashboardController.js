const Orders = require('../../../model/order_model');
const OrderItems = require('../../../model/Order_items');
const Product = require('../../../model/product_model')
const Customer = require('../../../model/user_model')
const Session = require('../../../model/admin_model/Session')
const Notification = require('../../../model/admin_model/Notification')


 exports.getDashboardDetails = async (req,res) =>{
    try{
        //For Counting number of orders
        const orderCount = await Orders.countDocuments();

        //For getting the total price
        const price = await Orders.find({status:'delivered'}).select('order_total_amount -_id')
        let totalPrice = 0;
        price.forEach(item => {
            totalPrice += parseInt(item.order_total_amount);
        });

        //For getting no of users logged in
        const sessionCount = await Customer.countDocuments();

        //For calculating number of products
        const products = await Product.find({is_deleted:false})
        productCount = products.length

        //Returning the values
        return res.status(200).json({Message:'ok' , totalPrice:totalPrice , totalOrders:orderCount , sessionCount:sessionCount , productCount:productCount})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Message:'Error in getting dashboard'})
    }
}

const aggregateMonthlyCounts = async (Model) => {
    try {
        const monthlyOrderCounts = await Model.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" }, 
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    count: 1
                }
            },
            {
                $sort: { month: 1 } 
            }
        ]);

        const result = [];

        for (let i = 1; i <= 12; i++) {
            const countForMonth = monthlyOrderCounts.find(item => item.month === i);
            const count = countForMonth ? countForMonth.count : 0;
            result.push({ month: i, count });
        }

        return  result ;
    } catch (error) {
        console.log(error);
        throw new Error('Error in aggregating monthly counts');
    }
};



exports.graphDetails = async (req, res) => {
    try {
        const orderCounts = await aggregateMonthlyCounts(Orders);
        const customerCounts = await aggregateMonthlyCounts(Customer);
        
        return res.status(200).json({ orderCounts, customerCounts });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ Message: 'Error in graph details' });
    }
}

exports.fetchRadialData = async(req,res)=>{
    try{
        //for calculaing customer details
        const totalUser = await Customer.countDocuments()
        const activeUser = await Session.countDocuments();
        const inActiveUser = totalUser - activeUser
        const customerData = {
            totalUser: totalUser,
            activeUser: activeUser,
            inActiveUser: inActiveUser
            }

        //for calculating order details
        const totalOrders = await Orders.countDocuments()
        const pendingOrders = await Orders.find({status:'pending'})
        const processingOrders = await Orders.find({status:'processing'})    
        const dispatchedOrders = await Orders.find({status:'dispatched'})    
        const deliveredOrders = await Orders.find({status:'delivered'})    
        const cancelledOrders = await Orders.find({status:'cancelled'})
        const orderData = {
            totalOrders:totalOrders,
            pendingOrders:pendingOrders.length,
            processingOrders:processingOrders.length,
            dispatchedOrders:dispatchedOrders.length,
            deliveredOrders:deliveredOrders.length,
            cancelledOrders:cancelledOrders.length
        }
        return res.status(200).json({customerData , orderData })
    }
    catch(e){
        console.log(e)
        return res.status(500).json({Message:'Error in fecting radial data'})
    }
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

exports.fetchBarGraphDetailsForP = async(req,res)=>{
    try{
        const productIds = await OrderItems.find().select('product_id order_item_qty -_id')
        const productData = {};
        
        for (let product of productIds) {
            const findProduct = await Product.findOne({ _id: product.product_id });
            const productName = findProduct?.manufacture;
            if (productData[productName]) {
                // If product already exists in productData, increment the quantity
                productData[productName] += parseInt(product.order_item_qty); 
            } else {
                // If product doesn't exist in productData, add it with its quantity
                productData[productName] = parseInt(product.order_item_qty); 
            }
        }
        
        const sortedData = Object.entries(productData)
            .map(([name, products]) => ({ name, products }))
            .sort((a, b) => b.products - a.products)
            .slice(0, 5);
            const shuffledData = shuffleArray(sortedData);
            return res.status(200).json({ product: shuffledData });
    }
    catch(e){
        console.log(e)
        return res.status(500).json({Message:'Error in fetching bar graph details'})
    }
}
exports.filteredBarGraphDetails = async(req,res)=>{
    try{
        const {userFilter} = req.body
        const productIds = await OrderItems.find().select('product_id order_item_qty -_id')
        const productData = {};
        
        for (let product of productIds) {
            const findProduct = await Product.findOne({ _id: product.product_id });
            const productName =findProduct?.[userFilter];
            if(findProduct?.[userFilter]){
                if (productData[productName]) {
                    // If product already exists in productData, increment the quantity
                    productData[productName] += parseInt(product.order_item_qty); 
                } else {
                    // If product doesn't exist in productData, add it with its quantity
                    productData[productName] = parseInt(product.order_item_qty); 
                }
            }
        }
        
        const sortedData = Object.entries(productData)
            .map(([name, products]) => ({ name, products }))
            .filter(entry => entry.products > 0)
            .slice(0, 5);
            const shuffledData = shuffleArray(sortedData);
        return res.status(200).json({ product: shuffledData });
    }
    catch(e){
        console.log(e)
        return res.status(500).json({Message:'Error in fetching bar graph details'})
    }
}
exports.fetchBarGraphDetailsForc = async(req,res)=>{
    try{
        const customerIds = await Orders.find().select('user_id total_items -_id')
        const customerData = {};
        
        for (let customer of customerIds) {
            const findCustomer = await Customer.findOne({ _id: customer.user_id });
            const customerType = findCustomer.user_type;
            if (customerData[customerType]) {
                // If customer already exists in customerData, increment the quantity
                customerData[customerType] += parseInt(customer.total_items); 
            } else {
                // If customer doesn't exist in customerData, add it with its quantity
                customerData[customerType] = parseInt(customer.total_items); 
            }
        }
        
        const sortedData = Object.entries(customerData)
            .map(([name, products]) => ({ name, products }))
            .sort((a, b) => b.products - a.products)
            .slice(0, 5);
            const shuffledData = shuffleArray(sortedData);
            return res.status(200).json({ customer: shuffledData });
    }
    catch(e){
        console.log(e)
        return res.status(500).json({Message:'Error in fetching bar graph details'})
    }
}

exports.fetchNotification = async(req,res) =>{
    try{
        const newReturn = await Notification.find({type:'return'}).countDocuments()
        const newOrder = await Notification.find({type:'order'}).countDocuments()
        return res.status(200).json({newReturn:newReturn , newOrder:newOrder})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({Message:'Error in fetching notification'})
    }
}

exports.deleteNotification = async(req,res) =>{
    try{
        const {type} = req.body
        console.log(type)
        await Notification.deleteMany({type:type})
        return res.status(200).json({Message:'Notification deleted'})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({Message:'Error in deleting notification'})
    }
}