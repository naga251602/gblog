"use client"

import Link from "next/link"
import { Tag } from "../tags/Tag"

export const BlogItem = (props:any) => {
    
    return<>
    <section className="flex flex-col justify-center px-3 py-5 rounded m-5" style={{
        maxWidth:"300px"
    }}>
        <h1 className="text-lg font-bold">{props.title}</h1>
        <span>
        <Tag id={props.categoryId}/>
        </span>
        
        <p className="text-xs my-2">{props.body.toString().slice(0,100) + "..."}</p>
        <section>
        <button className="text-sm bg-gray-200 px-3 py-2 rounded mt-2">
            <Link href={`/blogs/blog/${props.id}`}><i className="fa-solid fa-arrow-up-right-from-square"></i></Link>
        </button>
        
        </section>
    </section>
    </>
}