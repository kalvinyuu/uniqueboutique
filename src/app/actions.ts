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
            currency: 'gpp',
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

type SignedURLResponse = Promise<
    | { failure?: undefined; success: { url: string; id: number } }
    | { failure: string; success?: undefined }
>

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
}: GetSignedURLParams & { width: number; height: number }): SignedURLResponse => {
  if (!allowedFileTypes.includes(fileType)) {
    return { failure: 'File type not allowed' };
  }

  if (fileSize > maxFileSize) {
    return { failure: 'File size too large' };
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
    return { failure: 'Failed to save image details in the database' };
  }
    
    return { success: { url, id: results[0].id } };
};
