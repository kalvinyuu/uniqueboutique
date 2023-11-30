// Your file containing the getAllProducts function
import { product_catalouge } from '@/db/schema';
import {db} from "@/db/index";
import { NextResponse } from 'next/server'
 
export default async function getAllProducts(): Promise<Product[]> {
    try {
        const results: Product[] = await db.select({
            id: product_catalouge.id,
            name: product_catalouge.name,
            price: product_catalouge.price,
            image_location: product_catalouge.image_location,
	    category: product_catalouge.category,
        }).from(product_catalouge);
        return results;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch data');
    }
}
