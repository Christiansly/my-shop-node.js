const express = require('express')
const shopController = require('../controllers/shop.js')

const router = express.Router()

router.get('/products', shopController.getProduct)
router.get('/', shopController.getIndex)
router.get('/product/:productid', shopController.getProductDetail)
router.get('/aboutus', shopController.getAboutUs)
router.get('/contact', shopController.getContact)
router.get('/login', shopController.getLogin)

exports.router = router