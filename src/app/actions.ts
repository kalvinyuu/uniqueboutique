"use server"
import { z } from 'zod'
import { stripe } from '@/lib/stripe'
import { checkRole } from "@/../utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { productCatalouge, colour, ribbon, mensSize, womansSize, kidsSize} from '@/db/schema'; 
import { db } from "@/db/index";

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


