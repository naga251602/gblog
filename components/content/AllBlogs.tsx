"use client"

import { useEffect, useState } from "react";
import { BlogItem } from "../content/BlogItem";
import { PostsDb } from "../mockData/DB";


export const AllBlogs = (props:any) => {
    const [blogs, setBlogs] = useState<any>(props.data || []);
    const [pages,setPages] = useState<any>([]);
    const [start,setStart] = useState<any>(0);
    const [end,setEnd] = useState<any>(5);

    const [filteredBlogs, setFilteredBlogs] = useState<any>(blogs || []);
    const [index, setIndex] = useState<any>(0);
    useEffect(() => {
        setBlogs(props.data || [])
        setFilteredBlogs(props.data.slice(0,5));
        let g = 0;
        const d = [];

        for(let i = 0; i < blogs.length; i+=5,g++){
            d.push(g);
        }
        setPages(d.slice(start,end));
    }, []);

    const search = (e:any) => {
        const search = e.target.value;
        const filteredBlogs = blogs.filter((blog:any) => blog.title.toLowerCase().includes(search.toLowerCase()));
        setFilteredBlogs(filteredBlogs);
    }

    return(
        <>
        <section className="flex flex-col justify-center items-center mt-5 w-full">
            <h1 className="text-2xl font-bold">All Blogs</h1>
            <section className="flex items-center my-5">
                        <input type="text" className="px-1 py-1 border border-gray-100 text-sm rounded" placeholder="search" onChange={search}/>
                        <button className="text-sm bg-gray-100 px-3 py-1 rounded">
                            search
                        </button>
            </section>
            <section className="flex flex-wrap items-center justify-center ">
            {
                filteredBlogs.map((blog:any,i:number)=><BlogItem key={i} {...blog}/>)
            }
            </section>
        </section>
        <section className="flex justify-center items-center my-5">
    {
        pages.length > 1 && pages.map((page:any,key:number) => {
            return <button onClick={() => {
                setFilteredBlogs(blogs.slice(page*5,page*5+5));
            }} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center m-2" key={key}
            >{page + 1}</button>
        })
    }

    </section>
        </>
    )
}