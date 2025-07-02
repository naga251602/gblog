import prisma from "@/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    try{
        const { name } = await request.json();

        await prisma.category.create({
            data: {
                name
            }
        });

        const categories = await prisma.category.findMany();
        await prisma.$disconnect();
        return NextResponse.json(categories);
    }catch(err){
        return NextResponse.json([]);
    }
}

export async function PUT(request: Request){
    try{
        const { id,name } = await request.json();
        await prisma.category.update({
            where: {
                id
            },
            data: {
                name
            }
        });
        const categories = await prisma.category.findMany();
        await prisma.$disconnect();
        return NextResponse.json({
            messge:"Category updated successfully",
            categories
        });
    }catch(err){
        return NextResponse.json([]);
    }
}

export async function DELETE(request: Request){
    try{
        const { id } = await request.json();

        await prisma.category.delete({
            where: {
                id
            }
        });

        const categories = await prisma.category.findMany();
        await prisma.$disconnect();
        return NextResponse.json({
            message:"Category deleted successfully",
            categories
        });

    }catch(err){
        return NextResponse.json([]);
    }
}