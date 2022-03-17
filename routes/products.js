const express = require("express")
const router = express.Router()

const {getAppProductsStatic, getAppProducts} = require("../controllers/products")

router.route('/').get(getAppProducts)
router.route('/static').get(getAppProductsStatic)

module.exports = router