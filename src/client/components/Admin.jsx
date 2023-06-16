import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import Unauthorized from "./Unauthorized";


const Admin = () => {
  const [users, setUsers] = useState([]);
  const [billingPage, setBillingPage] = useState(false)
  const [client, setClient] = useState([])
  const [back, setBack] = useState(false)

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/admin")
      .then((res) => {
        if (authCtx.admin) {
          setBillingPage(false)
          authCtx.setAdmin(true)
          console.log(res.data);
          setUsers(res.data);
        } else {
          return;
        }
      })
      .catch((err) => {
        console.error(err);
        return (
          <div>
            <Unauthorized />
          </div>
        );
      });
  }, [back]);
  console.log("users:", users);
  const mappedUsers = users.map((user) => {
    // console.log("-------User-------",user)
    return (
      <div key={user.id} className="userCard">
        <h3>{user.name}</h3>
        <p>User Id: {user.id}</p>
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
    : (<div>Hello, update billing info for {client}
    <br></br>
    <a onClick={() => setBack(!back)}>Back</a>
    </div>)
};

export default Admin;
