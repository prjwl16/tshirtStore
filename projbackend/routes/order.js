const express = require("express")
const router = express.Router()

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById, pushOderPurchaseList } = require("../controllers/user")
const { updateStock } = require("../controllers/product")
const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } = require("../controllers/order")

//params
router.param("userID", getUserById)
router.param("orderId", getOrderById)

router.post("/order/create/:userID", isSignedIn, isAuthenticated, pushOderPurchaseList, updateStock, createOrder)

//read

router.get("/order/all/:userID", isSignedIn, isAuthenticated, isAdmin, getAllOrders)


router.get("/order/status/:userSID", isSignedIn, isAuthenticated, isAdmin, getOrderStatus)
router.put("/order/:orderId/status/:userID", isSignedIn, isAuthenticated, isAdmin, updateStatus)

//Actual routes
module.exports = router