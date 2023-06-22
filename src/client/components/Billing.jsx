import React from 'react'

const Billing = (props) => {
  return (
    <div>Update billing info for {props.client}
    <br></br>
    <a onClick={() => props.setBack(!props.back)}>Back</a>
    </div>
  )
}

export default Billing