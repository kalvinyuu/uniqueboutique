import { NextResponse } from "next/server";
import { db } from "@/db/index";
import {images} from '@/db/schema'; 
import {Images } from "@/app/types" 

export async function GET(request: Request) {
    const image: Images[] = await db.select().from(images);

    return NextResponse.json(image, {status: 200})
}
