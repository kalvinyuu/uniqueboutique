import { cache } from 'react'
import { productCatalouge, colour, ribbon, mensSize, womansSize, kidsSize, images} from '@/db/schema'; 
import { db } from "@/db/index";
import { eq } from 'drizzle-orm';
import { Size, Colour, Ribbon, Product, ProductCatalouge, ColourTable, Images } from "@/app/types" 

export const getProduct = cache(async (itemId: number) => {
  const product = await db.query.productCatalouge.findFirst({
    where: eq(productCatalouge.id, itemId),
  });
    if (!product) {
    throw new Error(`Product with id ${itemId} not found`);
  }
  return product;
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

