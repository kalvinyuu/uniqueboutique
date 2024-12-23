import Stripe from "stripe";
import {insertResultSchema} from"@/app/zod"
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { addresses, specificItem, orders, orderItems } from "@/db/schema";
import { getUserID } from '@/app/utils';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!
    const sig = req.headers.get('stripe-signature');
    let event;

    try {
	const body = await req.text(); // Read the body as text
	event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
    } catch (err) {
	console.error('Error verifying webhook signature:', err);
	return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
    }

    switch (event.type) {
	case "checkout.session.async_payment_failed":
	    const checkoutSessionAsyncPaymentFailed = event.data.object;
	    break;
	case "checkout.session.async_payment_succeeded":
	    const checkoutSessionAsyncPaymentSucceeded = event.data.object;
	    break;
	case "checkout.session.completed":
	    console.log(JSON.stringify(event.data.object))
	    const completed: any = event.data.object;
	    const address = completed.shipping_details.address;
	    const metadata = JSON.parse(completed.metadata.data);
            const data = metadata[0].data; // Assuming this is an array
            const username = metadata[0].userID;
	    console.log(username)
	    const user = await getUserID(username)
	    console.log(user)
	    try {
		const addressRes = await db.insert(addresses).values({
		    name: completed.shipping_details.name,
		    streetAddress: address.line1,
		    city: address.city,
		    postCode: address.postal_code,
		    country: address.country , 
		    userId: user || null,
		});


		const parsedAddressRes = insertResultSchema.parse(addressRes);
		const addressId = parsedAddressRes[0].insertId;
		
		const orderRes = await db.insert(orders).values({
		    userId: user,
		    addressId,
		    totalAmount: completed.amount_total
		})
		
		for (const item of data) {
		    console.log(item)
		    const specRes = await db.insert(specificItem).values({
			size: item.size,
			colour: item.colour,
			productId: item.productId,
			message: item.message,
			ribbon: item.ribbon,
		    })

		    const parsedOrderRes = insertResultSchema.parse(addressRes);
		    const orderId = parsedOrderRes[0].insertId;
		    
		    const parsedSpecificRes = insertResultSchema.parse(addressRes);
		    const specificId = parsedSpecificRes[0].insertId;
		    
		    await db.insert(orderItems).values({
			orderId: orderId,
			specificItemId: specificId,
			price: item.price
		    })
		}
		
		console.log('Data inserted successfully');
	    } catch (dbError) {
		console.error('Database insertion error:', dbError);
		return NextResponse.json({ error: 'Database Error' }, { status: 500 });
	    }

	    break;
	default:
	    console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
}
