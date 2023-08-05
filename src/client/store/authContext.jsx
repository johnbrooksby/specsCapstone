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
  clientId: null,
  setClientId: () => {},
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
  const storedClientId = localStorage.getItem("clientId");
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
    clientId: storedClientId,
    bills: storedBills,
  };
};

export const AuthContextProvider = (props) => {
  const localData = getLocalData();

  let initialToken;
  let initialId;
  let initialAdmin;
  if (localData) {
    initialToken = localData.token;
    initialId = localData.userId;
  } else if (localData && admin){
    initialToken = localData.token;
    initialId = localData.userId;
    initialAdmin = true;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialId);
  const [admin, setAdmin] = useState(initialAdmin);
  const [client, setClient] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [bills, setBills] = useState(null);

  const logout = (logoutTimer) => {
    setToken(null);
    setUserId(null);
    setAdmin(false);
    setClient(null);
    setClientId(null);
    setBills(null);
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    localStorage.removeItem("userId");
    window.localStorage.removeItem("admin");
    localStorage.removeItem("client");
    localStorage.removeItem("clientId");
    localStorage.removeItem("bills");
    clearTimeout(logoutTimer);
    axios.put("/logout");
  };

  const login = (token, exp, userId, admin) => {
    setToken(token);
    setUserId(userId);
    setAdmin(admin)
    localStorage.setItem("token", token);
    localStorage.setItem("exp", exp);
    localStorage.setItem("userId", userId);
    localStorage.setItem("admin", admin);
    localStorage.setItem("client", client);
    localStorage.setItem("clientId", clientId);
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
    clientId,
    setClientId,
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
