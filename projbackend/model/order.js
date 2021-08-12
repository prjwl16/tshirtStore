const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ProductCartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "product"
    },
    name: String,
    count: Number,
    price: Number
})

const OrderSchema = new Schema({
    products: [ProductCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
        type: String,
        default: "Recieved",
        enum: ["cancelled",
            "shipped",
            "deleverd",
            "Processing",
            "Recieved"
        ]
    },
    updated: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamp: true });

module.exports = mongoose.model("Order", OrderSchema)
module.exports = mongoose.model("ProductCart", ProductCartSchema)