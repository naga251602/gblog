"use client"

import { useEffect, useState } from "react";

export const CommentForm = (props:any) => {
    const [user,setUser] = useState<{
        name:string,
        email:string
        id:string
    }>({
        name:"",
        email:"",
        id:""
    });

    const [loggedIn,setLoggedIn] = useState<boolean>(false);
    const [loading , setLoading] = useState<boolean>(false);

    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem("user")!);
        if(!user){
            setLoggedIn(false);
        }else {
            setUser(user);
            setLoggedIn(true);
        }
    },[]);

    const Handler = (e:any) => {
        e.preventDefault();
        setLoading(true);
        const body = e.target[1].value;
        const data = {
            name:user.name,
            body:e.target.body.value,
            authorId:user.id,
            postId:props.id
        }
        fetch("/api/comments",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }).then(res=>res.json()).then(data=>{
            e.target[1].value = "";
            setLoading(false);
        }).catch(err=>{
            console.log(err)
        })
    }
        if(!loggedIn) return <></>
        return <>
        <section className="flex flex-col justify-center items-center mt-5 w-full" style={{
            maxWidth: "500px"
        }}>
            <section className="flex justify-between items-center my-2 w-full" >
                <h1 className="text-2xl font-bold my-2">Comment</h1>
            </section>
            <form className="flex flex-col my-2 w-full" onSubmit={Handler} >
                <input type="text" className="px-1 py-1 border border-gray-300 text-sm rounded" defaultValue={user.name} disabled/>
                <textarea className="px-1 py-1 border border-gray-300 text-sm rounded my-2" placeholder="comment" style={{
                    height: "150px",
                    resize: "none"
                }} name="body" id="name"/>
                {
                    (!loading)?<button className="text-sm bg-blue-100 px-3 py-1 rounded">
                    comment
                </button>:<button className="text-sm bg-blue-100 px-3 py-1 rounded" disabled>
                    loading...
                </button>
                }
            </form>
            
        </section>
        </>
}