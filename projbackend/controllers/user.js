const User = require("../model/user")
const Order = require("../model/order")

exports.getUserById = (req, res, next, id) => { //Get user
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No User Found"
            })
        }
        req.profile = user
        next()
    })
}

exports.getUser = (req, res) => {
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    return res.json(req.profile)
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true, useFindAndModify: false }, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Not Authorized"
            })
        }
        user.salt = undefined
        user.encry_password = undefined
        return res.json(user)
    })
}

exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    "error": "No orders In this Account"
                })
            }
            return res.json(order)
        })
}

exports.pushOderPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.orders.products.forEach(product => {
        purchase.push[{
            _id: product._id,
            name: product.name,
            Description: product.Description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        }]
    })
    next()
}