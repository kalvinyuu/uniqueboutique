import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { addresses, specificItem, orders, orderItems } from "@/db/schema";

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
	    const data = JSON.parse(completed.metadata.data.data);
	    const username = JSON.parse(completed.metadata.data.userId);
	    
	    try {
		await db.insert(addresses).values({
		    streetAddress: address.line1,
		    city: address.city,
		    postCode: address.postal_code,
		    userId: username,
		});
		
		const orderRes = await db.insert(orders).values({
		    userId: username,
		    totalAmount: completed.amount_total
		})

		for (const item of data) {
		    
		    const specRes = await db.insert(specificItem).values({
			size: item.size,
			colour: item.colour,
			productId: item.productId,
			message: item.message,
			ribbon: item.ribbon,
		    })

		    await db.insert(orderItems).values({
			orderId: orderRes[0].insertId,
			specificItemId: specRes[0].insertId,
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
