import prisma from "@/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    try{
        const { id } = await request.json();
        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                isadmin: true
            }
        });
        const users = await prisma.user.findMany();
        return NextResponse.json({
            users: users.reverse(),
            userCount: users.length,
            message: "User made admin successfully"
        }); 
    }   catch(err){
        return NextResponse.json({
            error: "Something went wrong"
        });
    }
}