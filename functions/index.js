const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe  = require("stripe")("sk_test_2vjpgxnK3h72nBFCz48cHbNn00PUvk11RB");
const cors = require('cors')({origin: true});
admin.initializeApp();

exports.getpayments = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        
        
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
    });    
});
