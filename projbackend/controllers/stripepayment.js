const stripe= require("stripe")("sk_test_51JKoCfSHLnE2edgEuZl6tRQtm4McBa7jH3N2cEOJVc9GTgEJv3l2QnBpe46Zn3vK9JyRO3cBxrduMvrj1YgNU5Mx00ck5ZELrY")
const { v4: uuidv4 } = require('uuid');
exports.makepayment =(req,res)=>{
    const {products, token}=req.body
    console.log("PRoducts",products)

    let amount =0;
    products.map(p=>{
        amount+=p.price;
    })

    const idempotencyKey =uuid()
    return stripe.customers.create(
        {
            email:toekn.email,
            Sourse:token.id
        }
    ).then(cust=>{
        stripe.charge.create({
            amount:amount*100,
            currency:"USD",
            customer: customer.id,
            receipt_email:token.email,
            shipping:{
                name:token.card.name
            }
        },{idempotencyKey})
        .then(result=>res.status(200).json(result))
        .catch(err=>console.log(err))
    })
}