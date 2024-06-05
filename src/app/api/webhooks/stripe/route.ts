import Stripe from "stripe";
import { NextRequest } from "next/server";
import { db } from "@/db/index";
import { headers } from "next/headers";
import { addresses, specificItem } from "@/db/schema";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;
  const sig = headers().get("stripe-signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case "checkout.session.async_payment_failed":
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      break;
    case "checkout.session.async_payment_succeeded":
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;

      break;
    case "checkout.session.completed":
	  const completed: any = event.data.object;
	  const address = completed.shipping_details.address
	  const data = JSON.parse(completed.metadata.data)
	  const res1 = await db
        .insert(addresses)
        .values({
	    streetAddress: address.line1,
	    city: address.city,
	    postCode: address.postal_code,
        })
	  const res2 = await db
		  .insert(specificItem)
		  .values({
	              size: data.size,
		      colour:  data.colour,
		      productId:  data.productId,
		      message: data.message,
		      ribbon: data.ribbon,
		  })
	  break;
      default:
	  console.log(data)
      console.log(`Unhandled event type ${event.type}`);
  }
  return new Response("RESPONSE EXECUTE", {
    status: 200,
  });
}
