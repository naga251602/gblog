import prisma from "@/lib/client";

export async function POST(request:Request){
    try{
        const { postId,authorId } = await request.json();
        const blog = await prisma.post.findUnique({
            where:{
                id:postId
            }
        }) || {likes:0};

        const isLiked = await prisma.like.findMany({
            where:{
                postId,
                authorId
            }
        }) || [];

        if(isLiked.length == 0 && blog){
            const blog_like:number = blog.likes + 1 || 0;
            try{
                await prisma.post.update({
                    where:{
                        id:postId
                    },
                    data:{
                        likes:blog_like
                    }
                })
                const like = await prisma.like.create({
                    data:{
                        postId,
                        authorId
                    }
                });
                await prisma.$disconnect();
                return new Response(JSON.stringify({
                    like,
                    blog_like
                }));
            }catch(err){
                return new Response(JSON.stringify({
                    error:"Something went wrong"
                }));
            }
        }
        await prisma.$disconnect();
        return new Response(JSON.stringify({
            message:"you have already liked this post",
            blog_like:blog.likes
        }));

    }catch(err){
        return new Response(JSON.stringify({
            error:"Something went wrong"
        }));
    }
}