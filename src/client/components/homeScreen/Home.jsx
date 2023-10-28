import React from 'react'
import Welcome from './Welcome'
import CompThree from './CompThree'
import CompFour from './CompFour'
import Credentials from './Credentials'

const Home = () => {
  // console.log("Home screen")
  return (
    <div>
        {/* <Welcome /> */}
        <CompThree />
        <CompFour />
        <Credentials />
    </div>
  )
}

export default Home