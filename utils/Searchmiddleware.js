const Fuse = require('fuse.js');
const Product = require('../model/product_model'); // Adjust the path to your Product model

class SearchProduct {
    constructor(querystr) {
        this.querystr = querystr;
    }

    // escapeRegex(text) {
    //     return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    // }

    async Search() {
        // Fetch all products from the database
        let products = await Product.find({ is_deleted: false }).lean().exec();

        if (this.querystr.keyword) {
            const options = {
                keys: [
                    'product_name',
                    'manufacture',
                    'category',
                    'variant',
                    'brand',
                    'model',
                    'part_number',
                    'keyword',
                    'description'

                ],
                threshold: 1.0, 
                distance: 100, 
                minMatchCharLength: 2, 
            };
            const fuse = new Fuse(products, options);
        
            const result = fuse.search(this.querystr.keyword);
            products = result.map(res => res.item); 


            products = products.slice(0,1000)
        }

        return products;
    }
}

module.exports = SearchProduct;
