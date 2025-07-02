"use client";

import { LatestBlogs } from "@/components/Headers/LatestBlogs";
import { NavBar } from "@/components/Headers/NavBar";
import { Loader } from "@/components/Loader/Loader";
import { AllBlogs } from "@/components/content/AllBlogs";
import { useEffect, useState } from "react";

export default function Home() {
    const [
        blogs,
        setBlogs
      ] = useState([]);

      useEffect(() => {
        fetch("/api/admin/blogs",{
          method: "POST",
        })
          .then((response) => response.json())
          .then((json) => {
            setBlogs(json.posts.slice(0,5));
          }).catch((err) => {
                console.log(err);
            });
      }, [blogs]);

      return (
        <>
        <NavBar/>
        {
          (blogs.length > 0)?(<><LatestBlogs data={blogs}/>
          <AllBlogs data={blogs} isFrontpage={true}/></>):<Loader/>
        }
        </>
      )
}
