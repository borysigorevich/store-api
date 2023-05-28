const Product = require("../models/Product")
const asyncHandler = require("../utils/asyncHandler")

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().exec()
    res.status(200).json({products})
})

const createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body)
    res.status(201).json({product})
})

const getSingleProduct = asyncHandler(async (req, res) => {
    const {id} = req.params

    const product = await Product.findById(id).exec()
    if(!product) return res.status(404).json({message: `No product with id: ${id}`})

    res.status(200).json({product})
})

const updateProduct = asyncHandler(async (req, res) => {
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {
        returnDocument: 'after',
        runValidators: true,
    })
    if(!product) return res.status(404).json({message: `No product with id: ${id}`})

    res.status(200).json({product})
})

const deleteProduct = asyncHandler(async (req, res) => {
    const {id} = req.params
    console.log({id})
    const product = await Product.findByIdAndDelete(id)
    if(!product) return res.status(404).json({message: `No product with id: ${id}`})

    res.status(200).json({product})
})

module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}