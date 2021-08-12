const { Order, ProductCart } = require("../model/order")

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id).populate("products.product", "name price").exec((err, order) => {
        if (err)
            return res.status(400).json({
                error: "No Order Found "
            })
        req.order = order
        next()
    })
}

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile

    const order = new Order(req.body.order)

    order.save((err, order) => {
        if (err)
            return res.status(400).json({
                error: "Failed to save Order"
            })

        res.json(order)
    })
}

exports.getAllOrders = (req, res) => {
    Order.find()
        .populate("user", "user_id name ")
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: "No orders found"
                })
            }
            res.json(orders)
        })
}

exports.updateStatus = (req, res) => {
    res.json(Order.Schema.path("status").enumValues)
}

exports.getOrderStatus = (req, res) => {
    Order.update[{ _id: req.body.orderId }, { $set: { status: req.body.status } },

        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "cannot update status"
                })
            }
            res.json(order)
        }

    ]
}