import prisma from "@/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    try{
        const { id } = await request.json();
        const comments = await prisma.comment.findMany({
            where:{
                authorId: id
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

export async function DELETE(request: Request){
    try{
        const { id } = await request.json();
        const comments = await prisma.comment.delete({
            where:{
                id: id
            }
        })
        await prisma.$disconnect();
        return NextResponse.json({
            message: "Comment deleted successfully",
        }); 
    }   catch(err){
        return NextResponse.json({
            error: "Something went wrong"
        });
    }
}
