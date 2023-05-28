const {Schema, model} = require('mongoose')

const productSchema = new Schema({
    featured: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required']
    },
    rating: {
        type: Number,
        required: [true, 'Product rating is required']
    },
    company: {
        type: String,
        required: [true, 'Product company is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Product', productSchema)