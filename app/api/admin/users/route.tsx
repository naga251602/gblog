import prisma from "@/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    try{
        const users = await prisma.user.findMany();
        prisma.$disconnect();
        return NextResponse.json({
            users: users.reverse(),
            userCount: users.length
        }); 
    }   catch(err){
        return NextResponse.json([]);
    }
}

export async function DELETE(request: Request){
    try{
        const { id } = await request.json();
        const user = await prisma.user.delete({
            where: {
                id: id
            }
        });

        const comment = await prisma.comment.deleteMany({
            where: {
                authorId: id
            }
        });
        await prisma.$disconnect();
        return NextResponse.json({
            message: "User deleted successfully"
        }); 
    }   catch(err){
        return NextResponse.json({
            error: "Something went wrong"
        });
    }
}

// put

export async function PUT(request: Request){
    const { id, name, email, password } = await request.json();
    try{
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: name,
                email: email,
            }
        });
        await prisma.$disconnect();
        return NextResponse.json({
            message: "User updated successfully",
            user:{
                id: user.id,
                name: user.name,
                email: user.email,
                isadmin: user.isadmin
            }
        });
    }   catch(err){
        return NextResponse.json({
            error: err
        });
    }
}
