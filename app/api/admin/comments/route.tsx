import prisma from "@/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    try{
        const { id } = await request.json();
        const comments = await prisma.comment.findMany({
            where:{
                postId: id
            }
        });
        await prisma.$disconnect();
        return NextResponse.json({
            comments: comments.reverse(),
            commentsCount: comments.length
        }); 
    }   catch(err){
        return NextResponse.json([]);
    }
}