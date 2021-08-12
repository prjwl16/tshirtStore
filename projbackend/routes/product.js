const express = require("express")
const router = express.Router()

const { getProductById, createProduct, getProduct, photo, updateProduct, deleteProduct, getAllProducts, updateStock, getProductCategories } = require("../controllers/product")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

router.param("userID", getUserById)
router.param("productId", getProductById)

router.post("/product/create/:userID", isSignedIn, isAuthenticated, isAdmin, createProduct)

//read routes
router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", photo)

//delete
router.delete("/product/:productId/:userID", isSignedIn,isAuthenticated,isAdmin, deleteProduct)

//update
router.put("/product/:productId/:userID", isSignedIn, isAuthenticated, isAdmin, updateProduct)

//listing all
router.get("/products", getAllProducts)
router.get("/products/categories", getProductCategories)


module.exports = router