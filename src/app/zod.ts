import { z } from "zod"

export const format = z.object({
    name: z.string().min(1),
    price: z.string().min(1),
    imageLocation: z.string().min(1),
    category: z.string().min(1),

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

export function centsToDollars(cents:number) {
    return (cents / 100).toFixed(2); // Converts cents to dollars and formats to two decimal places
}
