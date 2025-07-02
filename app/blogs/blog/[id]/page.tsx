import { NavBar } from "@/components/Headers/NavBar";
import { Loader } from "@/components/Loader/Loader";
import { BlogItemFulScreen } from "@/components/content/BlogItemFullScreen";
import prisma from "@/lib/client";

export default async function Blog(props:any){
    try{
        const blog = await prisma.post.findUnique({
            where: {
                id: props.params.id
            }
        }) || {};
        await prisma.$disconnect();
        return(
            <div>
                <NavBar/>
                <BlogItemFulScreen {...blog} />
            </div>
        )
    }catch (err) {
        return(
            <div>
                <NavBar/>
                <Loader/>
            </div>
        )
    }
}