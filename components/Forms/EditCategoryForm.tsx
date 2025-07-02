"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
export const EditCategoryForm = (props:any) => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");

    useEffect(()=> {
        fetch("/api/category", {
            method: "POST"
        }).then(res => res.json()).then(data => {
            const category = data.categories.filter((cat:any) => cat.id === props.id);
            setName(category[0].name);
        }).catch(err => console.log(err));

    },[]);

    const Handler = (e: any) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            id: props.id,
            name: e.target.name.value
        }

        fetch("/api/admin/category", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(
            (res) => res.json()
        ).then((data) => {
            if(data.error){
                alert(data.error);
            }else{
                alert("Category Updated successfully");
                window.location.href="/admin";
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    return <>
        <section className="flex items-center p-5" >
        <Link href="/admin">
            <span className="text-sm bg-blue-100 px-3 py-1 rounded">
              black
            </span>
        </Link>

        </section>
        <form className="flex flex-col p-5 mt-5" onSubmit={Handler}>
            <h1 className="text-2xl font-bold mb-10">Edit Category</h1>
            <input type="text" className="border p-2 my-2" placeholder="Category Name"  
            name="name" id="name" defaultValue={name}/>
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

    </>

}