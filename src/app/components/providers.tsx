'use client'

import React from 'react'
import { CartProvider as USCProvider } from 'use-shopping-cart'

function CartProvider({ children }: { children: React.ReactNode }) {
  return (
      <USCProvider
	  cartMode ="checkout-session"
	  stripe = {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
	  currency={'GBP'}
	  shouldPersist={false}
      >
      {children}
    </USCProvider>
  )
}

export default CartProvider
