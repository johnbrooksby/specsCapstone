import React, {useContext, useEffect, useState} from 'react'
import Billing from './Billing'
import AuthContext from '../store/authContext'
import axios from 'axios';
// import StripePayment from './Stripe'

const Account = () => {
  const authCtx = useContext(AuthContext);
  
  const [client, setClient] = useState(authCtx.client);
  const [bills, setBills] = useState([]);


  useEffect(() => {
    // console.log(authCtx.admin)
    let body = authCtx.userId
    axios
      .post("/account", body)
      .then((res) => {
          // console.log(res.data);
          // setClient(res.data);
        console.log(res.data)
        }
      )
      .catch((err) => {
        console.error(err);
      });
  });
  // console.log("users:", users);
  // console.log('bills', bills)
  // console.log("client", client);
  // console.log(billingPage);
  return (
    <Billing client={client} bills={bills} />
  );
};

export default Account