import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from "@/db/index";
import { users } from '@/db/schema'; 
import {authManage} from "@/app/utils"

export async function POST(req: Request) {    

    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
    
    if (!WEBHOOK_SECRET) {
	throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }
    
    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");
    
    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
	return new Response('Error occurred -- no svix headers', {
	    status: 400
	})
    }
    
    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);
    
    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);
    
    let evt: WebhookEvent
    
    // Verify the payload with the headers
    try {
	evt = wh.verify(body, {
	    "svix-id": svix_id,
	    "svix-timestamp": svix_timestamp,
	    "svix-signature": svix_signature,
	}) as WebhookEvent
    } catch (err) {
	console.error('Error verifying webhook:', err);
	return new Response('Error occured', {
	    status: 400
	})
    }
    
    // Get the ID and type
    const id = evt.data.id;
    const eventType = evt.type;
    const email = JSON.stringify(payload.email_address);
    const username = JSON.stringify(payload.username);
    
    if (!id) {
	throw new Error('ID is required for user insertion');
    }

    await authManage(email, username, id)
    
    console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
    console.log('Webhook body:', body)

    return new Response('', { status: 200 })
}

