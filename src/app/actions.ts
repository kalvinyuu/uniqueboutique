"use server"
import { z } from 'zod'
import { stripe } from '@/lib/stripe'
import { checkRole } from "@/../utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { productCatalouge, images, orders, users } from '@/db/schema'; 
import { db }  from "@/db/index";
import { eq } from 'drizzle-orm';
import { S3Client, PutObjectCommand,   } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from "crypto"
import { Orders, Product} from "@/app/types"
import { format, Order } from "@/app/zod"
import { cache } from 'react'
import { revalidatePath } from 'next/cache';

export async function authManage(email:string|null=null, name:string|null=null, authId:string ) {
	await db.insert(users).values({
	    email: email,
	    authId: authId,
	    authName: name
	})
}

export const getAllProducts = cache(async (): Promise<Product[]> => {
    try {
        const results: Product[] = await db.select().from(productCatalouge)
        return results
    } catch (error) {
        console.error('Error fetching products:', error)
        throw new Error('Failed to fetch data')
    }
})


export async function orderStatus(orderID: number) {
    const order = await db.select().from(orders).where(eq(orders.id, orderID))
	const parsedOrder = Order.parse(order)
	return parsedOrder.orderStatus
}

export async function updateOrderStatus(orderID: number) {
    const order = await db.query.orders.findFirst({
	where: eq(orders.id, orderID)
    })
    	const parsedOrder = Order.parse(order)
    if (parsedOrder.orderStatus == "Your order has been shipped." ) {
	await db.update(orders).set({orderStatus: "Your order has been received." })
	    .where(eq(orders.id, orderID))
    }
    else {
	await db.update(orders).set({orderStatus: "Your order has been shipped." })
	    .where(eq(orders.id, orderID))
    }
}

export async function setRole(formData: FormData) {
    const client = await clerkClient()
    if (!checkRole("admin")) {
	return { message: "Not Authorized" };
    }  
 try {
    const res = await client.users.updateUser(formData.get('id') as string, {
      publicMetadata: { role: formData.get('role') },
    })
    return { message: res.publicMetadata }
  } catch (err) {
    return { message: err }
  }
}

export async function createProduct(formData: FormData) {
    const info = format.parse({
        name: formData.get('name'),
        price: formData.get("price"),
        imageLocation: formData.get('imageLocation'),
        category: formData.get('category'),
    });
    try {
        await db.insert(productCatalouge).values({
            name: info.name,
            imageLocation: info.imageLocation ,
            price: info.price,
            category: info.category ,
        });
        await stripe.products.create({
            name: info.name,
        });
        await stripe.prices.create({
            currency: 'gbp',
            unit_amount: Math.round(info.price * 100),
            product_data: {
                name: info.name,
            },
        });
        console.log('Product created successfully!');
    } catch (error) {
        console.error('Error creating product:', error);
    }
}


const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
	accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
})

const allowedFileTypes = [
    "image/jpeg",
    "image/png",
]

const maxFileSize = 1048576 * 10 // 1 MB

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")

type SignedURLResponse = 
    | { type: 'success'; success: { url: string; id: number } }
    | { type: 'failure'; failure: string }

type GetSignedURLParams = {
    fileType: string
    fileSize: number
    checksum: string
    name: string
    type: string
    productId?: number | null
}
export const getSignedURL = async ({
  fileType,
  fileSize,
  checksum,
  name,
  type,
  width,
  height,
  productId,
}: GetSignedURLParams & { width: number; height: number }): Promise<SignedURLResponse> => {
  if (!allowedFileTypes.includes(fileType)) {
return { type: 'failure', failure: 'File type not allowed' };
  }

  if (fileSize > maxFileSize) {
    return { type: 'failure', failure: 'File size too large' };
  }

  const fileName = generateFileName();

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
  });

    const url = await getSignedUrl(s3Client, putObjectCommand, { expiresIn: 60 });
    
    const results = await db
	.insert(images).values({
    url: url.split('?')[0],
    width,
    height,
    name,
    type,
    productId: productId || null,
	}).returning()

    if (!results) {
    return { type: 'failure', failure: 'Failed to save image details in the database' };
  }
    
    return { type: 'success', success: { url, id: results[0].id } };
};

const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

export async function createProductWithImage(formData: FormData) {
    try {
        // Extract form data
        const name = formData.get('name') as string;
        const price = parseFloat(formData.get('price') as string);
        const category = formData.get('category') as string;
        const imageName = formData.get('imageName') as string;
        const imageType = formData.get('imageType') as string;
        const imageWidth = parseInt(formData.get('imageWidth') as string) || 0;
        const imageHeight = parseInt(formData.get('imageHeight') as string) || 0;
        const imageFile = formData.get('image') as File;

        // Validate required fields
        if (!name || !price || !category || !imageName || !imageType || !imageFile) {
            throw new Error('Missing required fields');
        }

        // Step 1: Upload image first to get the URL
        const checksum = await computeSHA256(imageFile);
        
        const signedURLResult = await getSignedURL({
            fileSize: imageFile.size,
            fileType: imageFile.type,
            checksum,
            name: imageName,
            type: imageType,
            width: imageWidth,
            height: imageHeight,
            productId: null, // Will be updated after product creation
        });

            if (signedURLResult.type == 'failure') {
                throw new Error(signedURLResult.failure);
            }

        const { url, id: imageId } = signedURLResult.success;
        
        // Upload file to S3
        const uploadResponse = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': imageFile.type },
            body: imageFile,
        });

        if (!uploadResponse.ok) {
            // Clean up the image record if upload fails
            await db.delete(images).where(eq(images.id, imageId));
            throw new Error('Failed to upload image to S3');
        }

        // Get the clean S3 URL (without query parameters)
        const imageUrl = url.split('?')[0];

        // Step 2: Create product with the image URL
        const productResults = await db.insert(productCatalouge).values({
            name,
            price,
            category,
            imageLocation: imageUrl,
        }).returning();

        const product = productResults[0];

        // Step 3: Update the image record with the product ID
        await db.update(images)
            .set({ productId: product.id })
            .where(eq(images.id, imageId));

        // Step 4: Create Stripe product and price
        const stripeProduct = await stripe.products.create({
            name: name,
        });

        await stripe.prices.create({
            currency: 'gbp',
            unit_amount: Math.round(price * 100),
           product: stripeProduct.id,
        });

        console.log('Product created successfully!', product);

        // Revalidate any relevant paths
        revalidatePath('/dashboard');

    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}
