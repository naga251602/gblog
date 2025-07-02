import prisma from "@/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    try{
        const likes = await prisma.comment.findMany();
        await prisma.$disconnect();
        return NextResponse.json({
            likes: likes.reverse(),
            likesCount: likes.length
        }); 
    }   catch(err){
        return NextResponse.json([]);
    }
}