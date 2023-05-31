import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:5556/admin")
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
      });
  }, []);
  console.log("users:",users)
  const mappedUsers = users.map((user) => {
    return (
      <div key={user.id} className="userCard">
        <h3>{user.name}</h3>
        <p>User Id: {user.id}</p>
        <p>Email: {user.email_address}</p>
        <p>Address: {user.street_address} {user.city}, {user.state}  {user.zip}</p>
        <a className="blue-btn" onClick={() => {}}>See Billing Info</a>
      </div>
    );
  });

  return <div className="adminPage">{mappedUsers}</div>;
};

export default Admin;
