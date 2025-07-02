"use client";

import { useEffect, useState } from "react";



export const Tag = (props:any) => {
    const [name,setName] = useState("");


    useEffect(() => {
        fetch("/api/category", {
            method: "POST"
        }).then(res => res.json()).then(data => {
            const category = data.categories.filter((cat:any) => cat.id === props.id);
            setName(category[0].name);
        }).catch(err => console.log(err));
    },[])

    if(name)
    return(
        <div
        className="my-2 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-blue-100 text-blue-700 border"
      >
        { name }
      </div>
    )
    else return <></>
}