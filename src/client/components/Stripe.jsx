// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
// import { useContext } from 'react';
// import AuthContext from "../store/authContext";
// import CheckoutForm from './Checkout';


// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// export default function StripePayment() {

//   const authCtx = useContext(AuthContext);
//   console.log("authCtx.userId", authCtx.userId)

//   // const options = {
//   //   // passing the client secret obtained from the server
//   //   clientSecret: `${authCtx.userid}_secret_${authCtx.userId}`,
//   // };

//   return (
//     <Elements stripe={stripePromise}
//     //  options={options}
//      >
//       <CheckoutForm />
//     </Elements>
//   );
// };