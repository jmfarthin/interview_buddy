import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// the stripe API key
const stripePromise = loadStripe('Ysk_test_4eC39HqLyjWDarjtT1zdp7dc');

const CheckoutComponent = () => {
  const handleCheckout = async () => {
    // When the customer clicks on the button, sends them them to Checkout.
    const stripe = await stripePromise;

    const response = await fetch('/create-checkout-session', { method: 'POST' });
    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, the local error gets shown 
      alert(result.error.message);
    }
  };

  return (
    <button onClick={handleCheckout}>Support The Dev Team</button>
  );
};

export default CheckoutComponent;
