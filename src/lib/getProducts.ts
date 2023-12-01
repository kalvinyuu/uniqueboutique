// Your file containing the getAllProducts function
import { productCatalouge } from '@/db/schema';
import {db} from "@/db/index";
import { NextResponse } from 'next/server'
 
export default async function getAllProducts(): Promise<Product[]> {
    try {
        const results: Product[] = await db.select({
            id: productCatalouge.id,
            name: productCatalouge.name,
            price: productCatalouge.price,
            image_location: productCatalouge.imageLocation,
	    category: productCatalouge.category,
        }).from(productCatalouge);
        return results;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch data');
    }
}
