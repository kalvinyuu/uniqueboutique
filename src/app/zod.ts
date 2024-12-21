import { z } from "zod"

export const format = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.coerce.number().positive("Price must be positive"),
    imageLocation: z.string().url("Invalid image URL"),
    category: z.enum(['mens', 'womens', 'kids'] )
})

export const Order = z.object({
    id: z.number(),
    userId: z.number().or(z.null()),
    addressId: z.number(),
    orderDate: z.string(),
    totalAmount: z.number(),
    orderStatus: z.literal("Your order has been received.")
	.or(z.literal("Your order has been shipped."))
})

export const User = z.object({
    id: z.number(),
    authId: z.string(),
    email: z.string().or(z.null()),
    authName: z.string().or(z.null()),
})

export const insertResultSchema = z.array(
  z.object({
    insertId: z.number(),
  })
);


export function centsToDollars(cents:number) {
    const pounds = cents;
    return (pounds / 100).toFixed(2);
}
