const stripe  = require("stripe")("sk_test_2vjpgxnK3h72nBFCz48cHbNn00PUvk11RB");
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())
app.use(express.json());

app.post("/payment",cors(),  (req, res) => {

    const { product, token } = req.body;
    const amount = 10*100;
    
    return stripe.customers.create({
            email: token.email, // customer email, which user need to enter while making payment
            source: token.id // token for the given card 
        })
        .then(customer =>
            stripe.charges.create({ // charge the customer
                amount : product.price,
                description: "Sample Charge",
                currency: "usd",
                customer: customer.id
            }))
        .then((result) => {
            console.log("Success");
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log("Fail", err);
            res.send(false)
        });

})

app.listen(8080, () => { console.log("Listening on port 8080") })
