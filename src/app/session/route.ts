import { stripe } from '../../lib/stripe'
import { headers } from 'next/headers'
import { products } from '../data/products'
import { validateCartItems } from 'use-shopping-cart/utilities'

export async function POST(request: Request) {
    const inventory = products
    const cartProducts = await request.json()
    const line_items = validateCartItems(inventory, cartProducts)
    console.log(cartProducts)
    console.log(cartProducts[1].product_data)
    const checkoutSession = await stripe.checkout.sessions.create({
	shipping_address_collection:{
            allowed_countries:["GB"]
        },
	mode: 'payment',
	submit_type: 'pay',
	line_items,
	success_url: `${headers().get('origin')}/success`,
	cancel_url: `${headers().get('origin')}/`,
	metadata:{
	    data: JSON.stringify(cartProducts.product_data)
	}
    })
    return Response.json({ sessionId: checkoutSession.id })
}
