// Your file containing the getAllProducts function
import { Product} from "@/app/types"
import { productCatalouge } from '@/db/schema';
import {db} from "@/db/index";
import { NextResponse } from 'next/server'
 
export default async function getAllProducts(): Promise<Product[]> {
    try {
        const results: Product[] = await db.select({
            id: productCatalouge.id,
            name: productCatalouge.name,
            price: productCatalouge.price,
            imageLocation: productCatalouge.imageLocation,
	    category: productCatalouge.category,
        }).from(productCatalouge);
	console.log(results)
        return results;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch data');
    }
}
