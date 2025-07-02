"use client"

import Link from "next/link"
import { useEffect, useState } from "react";

export const EditPostForm = ( props :any ) => {
    const [userId, setUserId] = useState<string>("");
    const [category, setCategory] = useState<any>({});
    const [categories,setCategories] = useState<any>([]);
    const [loading,setLoading] = useState<boolean>(false);
    
    const handler = (e: any) => {
        e.preventDefault();
        setLoading(true);
        
        const data = {
            id:e.target.id.value,
            title:e.target.title.value,
            body:e.target.body.value,
            image:e.target.image.value,
            authorId:e.target.authorId.value,
            links:e.target.links.value,
            categoryId:e.target.category.value
        }
      
        fetch("/api/blogs", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(
            (res) => res.json()
        ).then(
            (data) => {
                window.location.href="/admin";
            }
        ).catch((err) => {
            console.log(err);
        }
        )
    } 
    useEffect(() => {
        const user = sessionStorage.getItem("user");
        if(user){
            setUserId(JSON.parse(user).id);
            fetch("/api/category",{
                method: "POST"
            }).then(res => res.json()).then(data => {
                setCategories(data.categories);
                const c = data.categories.filter((category:any) => category.id === props.categoryId);
                setCategory(c[0]);
            }
            ).catch(err => console.log(err));
        }

        
    },[]);

    return <section className="p-5 items-center">
        <section className="flex items-center" >
        <Link href="/admin">
            <span className="text-sm bg-blue-100 px-3 py-1 rounded">
              black
            </span>
        </Link>

        </section>
        <section className="flex flex-col justify-center items-center mt-5 w-full">
        <h1 className="text-2xl font-bold my-5">Edit Blog Post <i className="fa fa-edit"></i></h1>
            <form className="w-full" style={{
                maxWidth: "500px"
            }}  onSubmit={
                handler
            }>
                <input type="text" className="w-full p-2 border border-gray-100 rounded my-2"  disabled defaultValue={userId} id="authorId" name="authorId"/>
                <input type="text" className="w-full p-2 border border-gray-100 rounded my-2"  disabled defaultValue={props.id} id="id" name="id"/>
                <input type="text" className="w-full p-2 border border-gray-100 rounded my-2" placeholder="Title" id="title" name="title" defaultValue={props.title}/>
                <textarea className="w-full p-2 border border-gray-100 rounded my-2" placeholder="Content" style={{
                    height: "200px",
                    resize: "none"
                }} id="body" name="body"  defaultValue={props.body}/>
                <input className="w-full p-2 border border-gray-100 rounded my-2" placeholder="Image address" id="image" name="image" defaultValue={props.image} />
                <input className="w-full p-2 border border-gray-100 rounded my-2" placeholder="links" id="links" name="links" defaultValue={props.links} />
                <select className="w-full p-2 border border-gray-100 rounded my-2" id="category" name="category">
                    <option value={category.id}>{category.name}</option>
                {
                        categories.map((category:any) => {
                            if (category.id != props.categoryId)
                            return <option value={category.id}
                            key={category.id}
                            >{category.name}</option>
                        })
                }
                </select>
                {
                    (loading)? (
                        <button className="text-sm bg-green-300 px-3 py-2 rounded mt-10 w-full" disabled>
                           Loading....
                        </button>
                    ):(
                        <button className="text-sm bg-green-300 px-3 py-2 rounded mt-10 w-full">
                            Update
                            <i className="fas fa-check ml-2"></i>
                        </button>
                    )
                }
            </form>

        </section>
    </section>
}