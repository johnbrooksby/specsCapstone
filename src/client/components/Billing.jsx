import React from "react";

const Billing = (props) => {
  // const { bills, client, back, setBack } = props;
  console.log('bills in billing page', props.bills)
  console.log('client in billing page', props.client)

  // const billList = props.bills.map((charge) => {
  //   return (
  //     <div>
  //       {charge.charge_explanation}
  //       {charge.amount_due}
  //     </div>
  //   );
  // });

  return (
    <div>
      Update billing info for {props.client}
      <br></br>
      {/* {billList} */}
      {/* {props.bills.charge_explanation} */}
      {/* {props.bills.amount_due} */}
      <a onClick={() => props.setBack(!props.back)}>Back</a>
    </div>
  );
};

export default Billing;
