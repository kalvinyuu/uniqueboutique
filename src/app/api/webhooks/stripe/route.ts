import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { eq } from 'drizzle-orm';
import { addresses, specificItem, orders, orderItems } from "@/db/schema";
import {Addresses } from "@/app/types"
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
		const ADDRESS = await db.query.addresses.findFirst({
		    where: ((addresses, { eq, and }) => and(eq(addresses.streetAddress, address.line1),
							    eq(addresses.name, completed.shipping_details.name),
							    eq(addresses.postCode, address.postal_code)
							   ))
		});
		if(ADDRESS===undefined) {
                    const addressRes = await db.insert(addresses).values({
			name: completed.shipping_details.name,
			streetAddress: address.line1,
			city: address.city,
			postCode: address.postal_code,
			country: address.country , 
			userId: user || null,
                    });
		    
		    var orderRes = await db.insert(orders).values({
			userId: user,
			addressId: addressRes[0].insertId ,
			totalAmount: completed.amount_total
		    })
		}
		else {
		    var orderRes = await db.insert(orders).values({
			userId: user,
			addressId: ADDRESS.addressId ,
			totalAmount: completed.amount_total
		    }) 
		}
		for (const item of data) {
		    console.log(item)
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
