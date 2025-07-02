import prisma from "@/lib/client";

export async function GET(request: Request){
   try{
        const Comments = await prisma.comment.findMany({}) || [];
        await prisma.$disconnect();
        return new Response(JSON.stringify(Comments.reverse()));
   }catch(err){
       return new Response(JSON.stringify({
           error:"Something went wrong"
       }));
   }
}

export async function POST(request:Request){
    try{
        const { postId,authorId,body,name} = await request.json();
        
        const comment = await prisma.comment.create({
            data:{
                postId,
                authorId,
                body,
                name
            }
        });
        await prisma.$disconnect();
        return new Response(JSON.stringify(comment));
    }catch(err){
        return new Response(JSON.stringify({
            error:"Something went wrong"
        }));
        
    }
}