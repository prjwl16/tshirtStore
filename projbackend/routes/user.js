const express = require("express")
const router = express.Router()

const { getUserById, getUser, updateUser, userPurchaseList } = require("../controllers/user")
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth")

router.param("userID", getUserById)

router.get("/user/:userID", isSignedIn, isAuthenticated, getUser)
router.put("/user/:userID", isSignedIn, isAuthenticated, updateUser)
router.get("/user/user/userID", isSignedIn, isAuthenticated, userPurchaseList)

module.exports = router