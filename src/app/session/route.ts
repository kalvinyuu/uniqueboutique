import { stripe } from '../../lib/stripe'
import { headers } from 'next/headers'
import { products } from '../data/products'
import { validateCartItems } from 'use-shopping-cart/utilities'

interface ProductData {
  data: any[]; // Replace 'any' with the actual type if known
}

interface CartItem {
  id: string;
  price_id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  quantity: number;
  value: number;
  timestamp: string;
  price_data: any; // Replace 'any' with the actual type if known
  product_data: ProductData;
  formattedValue: string;
  formattedPrice: string;
}


export async function POST(request: Request) {
    const inventory = products
    const cartProducts: {[key: string]: CartItem} = await request.json()
    const line_items = validateCartItems(inventory, cartProducts)
    console.log(cartProducts)
    const allProductData = Object.values(cartProducts).map(item => item.product_data);

    const checkoutSession = await stripe.checkout.sessions.create({
	shipping_address_collection:{
            allowed_countries:["GB"]
        },
	mode: 'payment',
	submit_type: 'pay',
	line_items,
	success_url: `${headers().get('origin')}/`,
	cancel_url: `${headers().get('origin')}/`,
	metadata:{
	    data: JSON.stringify(allProductData)
	}
    })
    return Response.json({ sessionId: checkoutSession.id })
}
