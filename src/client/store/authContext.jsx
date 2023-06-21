import { useState, createContext } from "react";
import axios from "axios";

let logoutTimer;

const AuthContext = createContext({
  token: "",
  login: () => {},
  logout: () => {},
  userId: null,
  admin: false,
  setAdmin: () => {},
  client: null,
  setClient: () => {},
  bills: null,
  setBills: () => {},
});

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime();
  const expTime = exp;
  const remainingTime = expTime - currentTime;
  return remainingTime;
};

const getLocalData = () => {
  const storedToken = localStorage.getItem("token");
  const storedExp = localStorage.getItem("exp");
  const storeId = localStorage.getItem("userId");
  const storedAdmin = localStorage.getItem("admin");
  const storedClient = localStorage.getItem("client");
  const storedBills = localStorage.getItem("bills");
  const remainingTime = calculateRemainingTime(storedExp);

  if (remainingTime <= 60 * 60 * 24 * 14) {
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    localStorage.removeItem("userId");
    localStorage.removeItem("admin");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    userId: +storeId,
    admin: storedAdmin,
    client: storedClient,
    bills: storedBills,
  };
};

export const AuthContextProvider = (props) => {
  const localData = getLocalData();

  let initialToken;
  let initialId;
  if (localData) {
    initialToken = localData.token;
    initialId = localData.userId;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialId);
  const [admin, setAdmin] = useState(false);
  const [client, setClient] = useState(null);
  const [bills, setBills] = useState(null);

  const logout = (logoutTimer) => {
    setToken(null);
    setUserId(null);
    setAdmin(false);
    setClient(null);
    setBills(null);
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    localStorage.removeItem("userId");
    localStorage.removeItem("admin");
    localStorage.removeItem("client");
    localStorage.removeItem("bills");
    clearTimeout(logoutTimer);
    axios.put("/logout");
  };

  const login = (token, exp, userId, admin) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem("token", token);
    localStorage.setItem("exp", exp);
    localStorage.setItem("userId", userId);
    localStorage.setItem("admin", admin);
    localStorage.setItem("client", client);
    localStorage.setItem("bills", bills);

    const remainingTime = calculateRemainingTime(exp);

    logoutTimer = setTimeout(logout, remainingTime);
  };

  const contextValue = {
    token,
    login,
    logout,
    userId,
    admin,
    setAdmin,
    client,
    setClient,
    bills,
    setBills,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
