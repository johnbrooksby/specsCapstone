import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import Unauthorized from "./Unauthorized";
import Billing from "./Billing";


const Admin = () => {
  const [users, setUsers] = useState([]);
  const [billingPage, setBillingPage] = useState(false)
  const [client, setClient] = useState([])
  const [back, setBack] = useState(false)

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    // console.log(authCtx.admin)
    axios
      .get("/admin")
      .then((res) => {
        if (authCtx.admin) {
          setBillingPage(false)
          authCtx.setAdmin(true)
          // console.log(res.data);
          setUsers(res.data);
        } else {
          return;
        }
      })
      .catch((err) => {
        console.error(err);
        {<Unauthorized />};
      });
      if (!authCtx.admin){
        {<Unauthorized />}
      }
  }, [back]);
  console.log("users:", users);
  const mappedUsers = users.map((user) => {
    // console.log("-------User-------",user)
    return (
      <div key={user.id} className="userCard">
        <h3>{user.name}</h3>
        <p>Email: {user.email_address}</p>
        <p>
          Address: {user.street_address} {user.city}, {user.state} {user.zip}
        </p>
        <a className="blue-btn" onClick={() => {
          // console.log("-------User.id--------", user.id)
          let body = {id: user.id}
          axios
          .post('/billing', body)
          .then(res => {
            console.log(res.data)
           setBillingPage(true)
           setClient(res.data.name)
           console.log(billingPage)
        })
          .catch(err => console.error(err))
        }}>
          See Billing Info
        </a>
      </div>
    );
  });
  console.log(billingPage)
  return !billingPage ? (<div className="adminPage">{mappedUsers}</div>)
    : (<Billing 
        client={client}
        back={back}
        setBack={setBack}
        />)
};

export default Admin;
