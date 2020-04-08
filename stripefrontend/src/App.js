import React from 'react';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';
function App() {
  const logo = "https://firebasestorage.googleapis.com/v0/b/the-gestor.appspot.com/o/logo.PNG?alt=media&token=d5e25676-747f-47bb-ad73-d038967b182f";

  const makePayment = token => {
    const product = {
      name : "My 10 bucks",
      price : 10*100,
      productBy  : "Facebook"
    }
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type" : "application/json"
    }

    return fetch('http://localhost:8080/payment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then((res) => { 
      console.log("App -> res", res)
      if(res.status == "200" ||res.status == 200){
        alert("Payment Completed Successfully");
      } 
    })
    .catch((res) => {
      console.log("App -> res", res)
      alert("Problem in Payment Transaction");
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo}  alt="logo" style={{ "width" : "400px" }} />
        <h2>
         <b>
         Welcome to Secure platform for <br/> 
          Payment Gateway 
         </b>
        </h2>

        <br/>
        <br/>
        


        <div className="row">
          <div className="container">
            <div className="col m6 s12">
              <h2>Monthly Subscription (39$)</h2>
              <StripeCheckout
                stripeKey="pk_test_kfVB9v3DNkQMR5Nx45vBi9P300vQtBCkGY"
                token={makePayment}
                amount={39*100}
                name="Pay for subscription" 
                description="Monthly Subscription (39$)" 
                image={logo}
                locale="es"
                ComponentClass="div"
                panelLabel="Give Money"
                amount={39 * 100} // cents
                currency="USD"
              >
              <button className="btn waves-effect btn-large waves-light pink">
                <b>Pay 39$ for Subscription</b>
                  <i class="material-icons right">send</i>
              </button>
              </StripeCheckout>
            </div>

            <div className="col m6 s12">

              <h2>Yearly Subscription  (390$)</h2>
              <StripeCheckout
                stripeKey="pk_test_kfVB9v3DNkQMR5Nx45vBi9P300vQtBCkGY"
                token={makePayment}
                name="Buy Me"
                amount={390*100}
              >

              <button className="btn waves-effect btn-large waves-light pink">
                <b>Pay 390$ for Subscription</b>
                  <i class="material-icons right">send</i>
              </button>
              </StripeCheckout>

            </div>

          </div>
        </div>

      </header>
    </div>
  );
}

export default App;
