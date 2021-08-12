var express = require('express')
var router = express.Router()
const { check, validationResult } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require("../controllers/auth")

router.post("/signup", [
    check("name", "Name Should be greter than 3 characters").isLength({ min: 3 }),
    // check("password", "Enter valid Password").isStrongPassword({ min: 5, max: 12 }),
    check("email", "Enter valide Email Adress").isEmail()
], signup)

router.post("/signin", [
    check("email", "Enter valide Email Adress").isEmail()
], signin)

router.get("/signout", signout)

router.get("/testroute", isSignedIn, (req, res) => {
    res.send("A protected route")
})
module.exports = router