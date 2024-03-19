"use server"
import { z } from 'zod'
import { stripe } from '@/lib/stripe'
import { checkRole } from "@/../utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { productCatalouge, colour, ribbon, mensSize, womansSize, kidsSize} from '@/db/schema'; 
import { db } from "@/db/index";
import { S3Client, PutObjectCommand,   } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from "crypto"

const format = z.object({
    name: z.string().min(1),
    price: z.string().min(1),
    imageLocation: z.string().min(1),
    category: z.string().min(1),

})

export async function setRole(formData: FormData) {
  // Check that the user trying to set the role is an admin
  if (!checkRole("admin")) {
    return { message: "Not Authorized" };
  }
 
  try {
    const res = await clerkClient.users.updateUser(
      formData.get("id") as string,
      {
        publicMetadata: { role: formData.get("role") },
      }
    );
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}

export async function createProduct(prevState: any, formData: FormData) {
    const info = format.parse({
	name: formData.get('name'),
	price: formData.get('price'),
	imageLocation: formData.get('imageLocation'),
	category: formData.get('category'),
    })
    const price = info
try {
    await db.insert(productCatalouge).values({
        name: info.name as string,
        imageLocation: info.imageLocation as string,
        price: info.price as string,
        category: info.category as string,
      });
    await stripe.products.create({
	name: info.name as string,
    });
    await stripe.prices.create({
	currency: 'gpp',
	unit_amount: Number(info.price.toString().replace(/\./g, "")),
	product_data: {
	    name: info.name as string,
	},
    })

    return { message: 'Product created successfully!' };
  } catch (error) {
    return { message: 'Error creating product' };
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
}
export const getSignedURL = async ({
  fileType,
  fileSize,
  checksum,
}: GetSignedURLParams): SignedURLResponse => {


  if (!allowedFileTypes.includes(fileType)) {
    return { failure: "File type not allowed" }
  }

  if (fileSize > maxFileSize) {
    return { failure: "File size too large" }
  }

  const fileName = generateFileName()

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
  })

  const url = await getSignedUrl(
      s3Client,
    putObjectCommand,
    { expiresIn: 60 } // 60 seconds
  )

    console.log({ success: url })
    
    return { success: { url, id: 1 } }
}
