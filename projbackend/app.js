require('dotenv').config() //environment variable
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const coockieParser = require('cookie-Parser')
const cors = require('cors')

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const StripeRoutes = require("./routes/StripePayment")

//database cnnection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED")
})

// middlewares
app.use(express.json())
app.use(coockieParser());
app.use(cors());

//routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", orderRoutes)    
app.use("/api", StripeRoutes)


//Listening on port
const port = process.env.port || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})