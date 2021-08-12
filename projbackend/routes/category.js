const express = require("express")
const router = express.Router()

const { GetCategoryByID, createCategory, getCategory, getAllCategories, updateCategory, removeCategory } = require("../controllers/category")
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

router.param("userID", getUserById)
router.param("categoryId", GetCategoryByID)


//actual routers goes here

router.post("/category/create/:userID", isSignedIn, isAuthenticated, isAdmin, createCategory)


router.get("/category/:categoryId", getCategory)
router.get("/categories", getAllCategories)


router.put("/category/:categoryId/:userID", isSignedIn, isAuthenticated, isAdmin, updateCategory)

router.delete("/category/:categoryId/:userID", isSignedIn, isAuthenticated, isAdmin, removeCategory)

module.exports = router