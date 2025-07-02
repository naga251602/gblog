"use client"

import { BlogItem } from "../content/BlogItem";

export const LatestBlogs = (props:any) => {
    const blogs = props.data.slice(0,2) || [];
    return(
        <section className="flex flex-col justify-center items-center mt-5">
            <h1 className="text-2xl font-bold">Latest Blogs</h1>
            <section className="flex flex-wrap items-center justify-center ">
            {
                blogs.map((blog:any,i:number)=><BlogItem key={i} {...blog} />)
            }
            </section>
        </section>
    )
}