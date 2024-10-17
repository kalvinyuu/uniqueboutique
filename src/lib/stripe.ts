import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // https://github.com/stripe/stripe-node#configuration
  appInfo: {
    name: 'uniqueboutiquee',
      url: 'https://www.uniqueboutiquee.co.uk/',
  },
})
