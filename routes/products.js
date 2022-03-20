const express = require("express")
const router = express.Router()

const {getAllProductsStatic, getAllProducts} = require("../controllers/products")

router.route('/').get(getAllProductsStatic)
router.route('/product').get(getAllProducts)

module.exports = router