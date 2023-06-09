const {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/products");
const router = require('express').Router();

router.route('/')
    .get(getAllProducts)
    .post(createProduct)

router.route('/:id')
    .get(getSingleProduct)
    .patch(updateProduct)
    .delete(deleteProduct)

module.exports = router;