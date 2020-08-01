import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { resetCart as resetCartAction } from '../../redux/cart/cart.actions';
const API_URL = 'http://localhost:2121/'

const StripeCheckoutButton = ({ price, push, resetCart, cartItems}) => {
  debugger;
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_KzWXSJxJu3foClpqvGjmUlnp00c4Xcfgbb';

  const onToken = token => {
    debugger;
    let p1 = JSON.stringify(cartItems);
    let p2 = price; 
    window.fetch(`${API_URL}generateBill?price=${p2}&item=${p1}`)
      .then(response => response.blob())
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "bill.html";
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove();  //afterwards we remove the element again         
      })
      .catch(error => {});

    alert('Successful payment!');
  };

  return (
    <StripeCheckout
      label='Pay with 💳'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      panelLabel='Pay now'
      amount={priceForStripe}
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  resetCart: () => dispatch(resetCartAction()),
  push: route => dispatch(push(route))
});

export default connect(
  null,
  mapDispatchToProps
)(StripeCheckoutButton);
