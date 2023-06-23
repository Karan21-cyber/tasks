import React from 'react'
import StripeCheckout from "react-stripe-checkout"


function Payment() {

  const onToken = (token) => {
    console.log(token);
  }

  return (
    <div>
      <StripeCheckout
        token={onToken}
        name="karan"
        currency='USD'
        amount={10*100}
        stripeKey="pk_test_51LZqfgGvAh1KpdvlVs63fTwyUzHVaWLIqt7zkW69E6fZ1PkSLQ6uY36tDAQYDgtLZWZVb9BMZMjAqDZxV45tKfiV00WvOf6JcI"
      />
    </div>
  );
}

export default Payment