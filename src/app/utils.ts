import { cache } from 'react'
import { productCatalouge, colour, ribbon, mensSize, womansSize, kidsSize, images, users, orders, orderItems, addresses, specificItem} from '@/db/schema'; 
import { db } from "@/db/index";
import { eq } from 'drizzle-orm';
import { Size, Colour, Ribbon, Product, ProductCatalouge, ColourTable, Images,  } from "@/app/types" 

export async function 

export async function getOrderItems(orderID:number) {
    const item = await db.query.orderItems.findMany({
	where: eq(orderItems.orderId, orderID)
    })
    return item
}


export async function getOrders() {
    const order = await db.select().from(orders).where(eq(orders.orderStatus, 'Your order has been received.'))
    return order
}

export async function authManage(email:string|null, name:string|null, authId:string ) {
    const userId = await getUserID(authId)
    if (userId == 0) {
	await db.insert(users).values({
	    email: email,
	    authId: authId,
	    authName: name
	})
    }
}

export const getProduct = cache(async (itemId: number) => {
  const product = await db.query.productCatalouge.findFirst({
    where: eq(productCatalouge.id, itemId),
  });
    if (!product) {
    throw new Error(`Product with id ${itemId} not found`);
  }
  return product;
});

export const getUserID = cache(async (username: string) => {
    const user = await db.query.users.findFirst({
        where: eq(users.authId, username),
    });
    
    return user ? user.id : 0;
});

// Create a resource for fetching colour data
export const getColourTable = cache(async () => {
  const colourTable = await db.select().from(colour);
  return colourTable;
});

export const getImages = cache(async () => {
    const image: Images[] = await db.select().from(images);
  return image;
});

export const getImage = cache(async (imageId: number) => {
    const image = await db.query.images.findFirst({
	where: eq(images.imageId, imageId ),
    });
        if (!image) {
    throw new Error(`image with id ${imageId} not found`);
  }
    return image;
});

export const getSizeCategory = cache(async (x: number) => {
    let size: Size = [{sizeId: 1,
		       size:"M"}]
    let ribbonTable: Ribbon = []
    
    const product: Product = await getProduct(x)	
    switch (product?.category) {
	case "mens":
            size = await db.select().from(mensSize);
            break;
	case "womans":
	case "kids":
            size = await db.select().from(product?.category === "womans" ? womansSize : kidsSize);
            ribbonTable = await db.select().from(ribbon);
            break;
	default:
            break;
    }
    return {size, ribbonTable}
});

 
export const getAllProducts = cache(async() => {
    try {
        const results: Product[] = await db.select().from(productCatalouge);
        return results;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch data');
    }
})

