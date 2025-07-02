import prisma from "@/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    try{
        const posts = await prisma.post.findMany();
        await prisma.$disconnect();
        return NextResponse.json({
            posts: posts.reverse(),
            postCount: posts.length
        }); 
    }   catch(err){
        return NextResponse.json([]);
    }
}