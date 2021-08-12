const User = require("../model/user")
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken')
var expressJwt = require("express-jwt")

exports.signup = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg //see the documentation
        })
    }
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "user not registerd something went wrong"
            });
        } else {
            res.json({
                name: user.name,
                lname: user.lastname,
                email: user.email,
                id: user._id
            })
        }
    })
}
exports.signin = (req, res) => {
    const { email, password } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg //see the documentation
        })
    }
    User.findOne({ email }, (err, user) => {
        if (user && user.authenticate(password)) {
            //create token 
            const token = jwt.sign({ _id: user._id }, process.env.SECRET)
                // put token in cookie
            res.cookie("token", token, { expire: new Date() + 9999 })
                //send to front end
            const { _id, name, email, role } = user;
            return res.json({
                token,
                user: { _id, name, email, role }
            })
        } else {
            return res.status(400).json({
                error: "Email Id or Password do not match"
            })
        }
    })
}
exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({
        msg: "user Signout successfully"
    })
}

//protected route
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
});
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if (!checker) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next()
}
exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not an admin, Access Denied"
        })
    }
    next()
}