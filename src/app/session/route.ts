import { stripe } from '../../lib/stripe'
import { headers } from 'next/headers'
import {promises as fs} from 'fs'
import { validateCartItems } from 'use-shopping-cart/utilities'

export async function POST(request: Request) {
    const file = await fs.readFile(process.cwd() + '/app/data/products.json', 'utf8')
    const inventory = JSON.parse(file)
  const cartProducts = await request.json()
  const line_items = validateCartItems(inventory, cartProducts)
    console.log('line_items', line_items)
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    submit_type: 'pay',
    line_items,
    success_url: `${headers().get('origin')}/`,
    cancel_url: `${headers().get('origin')}/`
  })
  return Response.json({ sessionId: checkoutSession.id })

}
