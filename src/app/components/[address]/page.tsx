import React from 'react';
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import AddressForm from './AddressForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripe = loadStripe('pk_test_51OI3SXLt8ZHkUOknAk0zt4DV8XHusjfiMRnjXzZsFFWQtN7MdvYOSo0Yzyqgu0o90vPLA07RjnOBrWCCIZUxLbUb00C78UL2qe');

function App() {
  const options = {
    // Fully customizable with appearance API.
    appearance: {/*...*/},
  };

  return (
      <Elements stripe={stripe} options={options}>
	  <p>hi</p>
      <AddressForm />
    </Elements>
  );
};

export default App;