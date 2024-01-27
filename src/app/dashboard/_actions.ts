"use server";`` 
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

export async function createProduct(name:string, price:string, imageLocation:string, category:string) {
  await db.insert(productCatalouge).values({ name, imageLocation, price, category });
  return { success: true, message: 'Product created successfully!' };
}

