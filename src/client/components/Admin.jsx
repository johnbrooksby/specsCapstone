import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import Unauthorized from "./Unauthorized";

const Admin = () => {
  const [users, setUsers] = useState([]);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/admin")
      .then((res) => {
        if (authCtx.admin) {
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
  }, []);
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
            
            console.log(res.data)})
          .catch(err => console.error(err))
        }}>
          See Billing Info
        </a>
      </div>
    );
  });

  return <div className="adminPage">{mappedUsers}</div>;
};

export default Admin;
