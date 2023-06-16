import { useState, createContext } from 'react'
import axios from 'axios'

let logoutTimer


const AuthContext = createContext({
  token: '',
  login: () => {},
  logout: () => {},
  userId: null,
  admin: false,
  setAdmin: () => {}
})

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime()
  const expTime = exp 
  const remainingTime = expTime - currentTime
  return remainingTime
}

const getLocalData = () => {
  const storedToken = localStorage.getItem('token')
  const storedExp = localStorage.getItem('exp')
  const storeId = localStorage.getItem('userId')
  const storedAdmin = localStorage.getItem('admin')
  const remainingTime = calculateRemainingTime(storedExp)
  
  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem('token')
    localStorage.removeItem('exp')
    localStorage.removeItem('userId')
    localStorage.removeItem('admin')
    return null
  }
  
  return {
    token: storedToken,
    duration: remainingTime,
    userId: +storeId,
    admin: storedAdmin
  }
}

export const AuthContextProvider = (props) => {
  const localData = getLocalData()
  
  let initialToken
  let initialId
  if (localData) {
    initialToken = localData.token
    initialId = localData.userId
  }
  
  const [token, setToken] = useState(initialToken)
  const [userId, setUserId] = useState(initialId)
  const [admin, setAdmin] = useState(false);

  const logout = () => {
    setToken(null)
    setUserId(null)
    setAdmin(false)
    localStorage.removeItem('token')
    localStorage.removeItem('exp')
    localStorage.removeItem('userId')
    localStorage.removeItem('admin')
    clearTimeout(logoutTimer)
    axios.get('/logout')
  }

  const login = (token, exp, userID, admin) => {
    setToken(token)
    setUserId(userID)
    localStorage.setItem('token', token)
    localStorage.setItem('exp', exp)
    localStorage.setItem('userId', userId)
    localStorage.setItem('admin', admin)

    const remainingTime = calculateRemainingTime(exp)

    logoutTimer = setTimeout(logout, remainingTime)
  }

  const contextValue = {
    token,
    login,
    logout, 
    userId,
    admin,
    setAdmin
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext