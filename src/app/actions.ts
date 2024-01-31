"use server" 

import { checkRole } from "@/../utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { productCatalouge, colour, ribbon, mensSize, womansSize, kidsSize} from '@/db/schema'; 
import { db } from "@/db/index";

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

export async function createProduct(formData: FormData) {
    const info = {
	name: formData.get('name'),
	price: formData.get('price'),
	imageLocation: formData.get('imageLocation'),
	category: formData.get('category'),
    }
try {
    await db
      .insert(productCatalouge)
      .values({
        name: info.name as string,
        imageLocation: info.imageLocation as string,
        price: info.price as string,
        category: info.category as string,
      });

    return { success: true, message: 'Product created successfully!' };
  } catch (error) {
    return { success: false, message: 'Error creating product' };
  }
}


