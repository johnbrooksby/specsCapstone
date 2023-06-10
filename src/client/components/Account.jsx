import React, {useContext} from 'react'
import StripePayment from './Stripe'

const Account = () => {
  return (
    <div className='testimonial accountPage'>
      <StripePayment />
        {/* <img src='https://i.gifer.com/7i16.gif' /> */}
        {/* <h1 className='accountPageText'>- - - - Under Construction - - - -</h1> */}
    </div>
  )
}

export default Account