import React from 'react'

const CheckoutForm = () => {
  return (
    <div>
          <div class="product">
            <img src="https://i.imgur.com/EHyR2nP.png" alt="The cover of Stubborn Attachments" />
            <div class="description">
              <h3>Stubborn Attachments</h3>
              <h5>$20.00</h5>
            </div>
          </div>
          <form action="/create-checkout-session" method="POST">
            <button type="submit" id="checkout-button">Checkout</button>
          </form>
      </div>
  )
}

export default CheckoutForm