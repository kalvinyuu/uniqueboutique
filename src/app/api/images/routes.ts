import { NextResponse } from "next/server";
import { db } from "@/db/index";
import {images} from '@/db/schema'; 
import {Images } from "@/app/types" 

export async function GET(request: Request) {
    const images: Images[] = await db.query.images.findMany();
    console.log(images)
    return NextResponse.json(images, {status: 200})
}
