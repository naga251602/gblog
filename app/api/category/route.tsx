import prisma from "@/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    try{
        const categories = await prisma.category.findMany();
        await prisma.$disconnect();
        return NextResponse.json({
            categories:categories,
            categoriesCount:categories.length
        });
    }catch(err){
        return NextResponse.json([]);
    }
}