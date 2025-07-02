"use client"

import { Post } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";


export const Blogs = (props:any) => {
    const blogs = props.props || [];
    const [filter, setFilter] = useState<Post[]>(blogs || []);

    const search = (e:any) => {
        const search = e.target.value;
        const filteredBlogs = blogs.filter((blog:any) => blog.title.toLowerCase().includes(search.toLowerCase()));
        setFilter(filteredBlogs);
    }

    return     <section 
    className="flex flex-col justify-center items-center mt-5 w-full" style={{
        maxWidth: "500px"
    }}
>
    <section className="flex justify-between items-center my-5 w-full">
        <h1 className="text-2xl font-bold my-2">Blogs</h1>
        <section className="flex items-center my-5">
            <input type="text" className="px-1 py-1 border border-gray-100 text-sm rounded" placeholder="search" onChange={search} />
            <button className="text-sm bg-gray-100 px-3 py-1 rounded">
                search
            </button>
        </section>
    </section>
    <section className="w-full mb-5">
        <Link href="/admin/create">
            <span className="text-sm bg-blue-100 px-3 py-1 rounded">
                <i className="fas fa-plus mr-2"></i>
                Add New Blog
            </span>
        </Link>
    </section>
    <table className="table table-striped">
        <thead>
            <tr>
                <th scope="col"
                    className="text-sm p-1"
                >S.NO</th>
                <th scope="col"
                    className="text-sm p-1"
                >Title</th>
                <th scope="col"
                className="text-sm p-3"
                >Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                filter.map((blog:any,i:number)=>{
                    return(
                        <tr key={i}>
                            <th scope="row"
                                className="text-sm p-2"
                            >{i+1}</th>
                            <td
                                className="text-sm p-2"
                            >{blog.title.slice(0,20) + "..."}</td>
                            <td
                                className="text-sm p-5"
                            >
                                <Link href={`/admin/edit/${blog.id}`}>
                                    <span className="text-xs bg-blue-100 px-3 py-1 rounded">
                                        <i className="fas fa-edit mr-2"></i>
                                        Edit
                                    </span>
                                </Link> 
                                <p className="text-xs bg-red-100 px-3 py-1 my-5 rounded" onClick={()=>{
                                    const confirm = window.confirm("Are you sure you want to delete this blog?");  
                                    if(confirm){
                                        fetch(`/api/blogs`,{
                                            method: "DELETE",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify({
                                                id: blog.id
                                            })
                                        }).then(res=>res.json()).then(data=>{
                                            if(!data.error){
                                                alert(data.message);
                                                window.location.reload();
                                            }else{
                                                alert(data.message);
                                            }
                                        })
                                    }
                                }}>
                                <i className="fas fa-trash mr-2"></i>
                                    Delete
                                </p>
                                </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table></section>
}