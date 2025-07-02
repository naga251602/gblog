"use client"
import { NavBar } from "@/components/Headers/NavBar";
import { Loader } from "@/components/Loader/Loader";
import { AllBlogs } from "@/components/content/AllBlogs";
import { PostsDb } from "@/components/mockData/DB";
import prisma from "@/lib/client";
import { useEffect, useState } from "react";

export default function Blogs(){
    const [data,setData] = useState<any>([]);

    useEffect(() => {
        fetch("/api/admin/blogs",{
          method: "POST",
        })
          .then((response) => response.json())
          .then((json) => {
            setData(json.posts || []);
          }).catch((err) => {
                console.log(err);
        });
      }, [data]);

    return <>
    <NavBar/>
    {
      (data.length > 0)?<AllBlogs data={data} />:<Loader/>
    }

    </>
}