'use server'
import { cache } from 'react'
import { productCatalouge, colour, ribbon, mensSize, womansSize, kidsSize, images, users, orders, orderItems, addresses, specificItem} from '@/db/schema'
import { db } from "@/db/index"
import { eq } from 'drizzle-orm'
import { Size, Ribbon, Product, Images, Orders, Addresses, OrderItems, SpecificItem, OrderStat } from "@/app/types"
import { User } from "@/app/zod"
import { z } from "zod"

export const authManage = cache(async (email: string | null = null, name: string | null = null, authId: string) => {
    const existingUser = await db.select().from(users)
        .where(eq(users.authId, authId))
        .limit(1)

    if (existingUser.length === 0) {
        await db.insert(users).values({
            email: email,
            authId: authId,
            authName: name
        })
    }
})

export const getAddresses = cache(async (addressID: number): Promise<Addresses> => {
    const address = await db.query.addresses.findFirst({
        where: eq(addresses.addressId, addressID)
    })
    if (!address) {
        throw new Error(`failed to fetch address`)
    }
    return address
})

export const getSpecItem = cache(async (productID: number): Promise<SpecificItem> => {
    const item = await db.query.specificItem.findFirst({
        where: eq(specificItem.id, productID)
    })
    if (!item) {
        throw new Error(`Failed to fetch product`)
    }
    return item
})

export const getOrderItems = cache(async (orderID: number) => {
    const orderItem = await db.query.orderItems.findMany({
        where: eq(orderItems.orderId, orderID)
    })
    if (!orderItem) {
        throw new Error('Failed to fetch items')
    }
    return orderItem
})

export const getOrders = cache(async () => {    
    const order = await db.select().from(orders)
        .where(eq(orders.orderStatus, "Your order has been received."))   
    if (!order) {
        throw new Error('Failed to fetch orders.')
    }
    return order
})

export const getCustomerOrders = cache(async (ID: number) => {    
    const order = await db.select().from(orders)
        .where(eq(orders.userId, ID))
    if (!order) {
        throw new Error('Failed to fetch orders.')
    }
    return order
})

export const getShippedOrders = cache(async () => {    
    const order = await db.select().from(orders)
        .where(eq(orders.orderStatus, "Your order has been shipped."))   
    if (!order) {
        throw new Error('Failed to fetch orders.')
    }
    return order
})

export const getProduct = cache(async (itemId: number) => {
    const product = await db.query.productCatalouge.findFirst({
        where: eq(productCatalouge.id, itemId),
    })
    if (!product) {
        throw new Error(`Product not found`)
    }
    return product
})

export const getUserID = cache(async (ID: string) => {
    const user = await db.query.users.findFirst({
        where: eq(users.authId, ID),
    })
    const parsedUser = User.parse(user)
    if (!parsedUser) {
        throw new Error('User not found')
    }
    return parsedUser.id
})

export const getColourTable = cache(async () => {
    const colourTable = await db.select().from(colour)
    return colourTable
})

export const getImages = cache(async (): Promise<Images[]> => {
    const image: Images[] = await db.select().from(images)
    return image
})

export const getImage = cache(async (imageId: number) => {
    const image = await db.query.images.findFirst({
        where: eq(images.imageId, imageId),
    })
    if (!image) {
        throw new Error(`Image with id ${imageId} not found`)
    }
    return image
})

export const getSizeCategory = cache(async (x: number) => {
    let size: Size = [{ sizeId: 1, size: "M" }]
    let ribbonTable: Ribbon = []
    const product: Product = await getProduct(x)
    switch (product?.category) {
        case "mens":
            size = await db.select().from(mensSize)
            break
        case "womans":
        case "kids":
            size = await db.select().from(product?.category === "womans" ? womansSize : kidsSize)
            ribbonTable = await db.select().from(ribbon)
            break
        default:
            break
    }
    return { size, ribbonTable }
})

export const getAllProducts = cache(async (): Promise<Product[]> => {
    try {
        const results: Product[] = await db.select().from(productCatalouge)
        return results
    } catch (error) {
        console.error('Error fetching products:', error)
        throw new Error('Failed to fetch data')
    }
})
