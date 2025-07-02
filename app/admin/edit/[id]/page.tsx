import { EditPostForm } from "@/components/Forms/EditPostForm";
import { NavBar } from "@/components/Headers/NavBar";
import { Loader } from "@/components/Loader/Loader";
import prisma from "@/lib/client";
import Link from "next/link";

export default async function Edit(props:any) {
    try{
        const blog = await prisma.post.findUnique({
            where: {
                id: props.params.id
            }
        }) || {};
    
        return <>
        <NavBar/>
        <EditPostForm {...blog}/>
        </>
    }catch (err) {
        return <>
        <NavBar/>
        <Loader/>
        <Link href="/admin" 
        className="text-sm bg-blue-100 px-3 py-1 rounded"
        >
            Go Home
        </Link>
        </>
    }
}