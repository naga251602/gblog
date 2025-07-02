"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { CommentForm } from "../Forms/CommentForm";
import { Tag } from "../tags/Tag";

export const BlogItemFulScreen = (props:any) => {
    const [likes, setLikes] = useState(props.likes);
    const [user, setUser] = useState({
        id:"",
        name:"",
        email:""
    });
    const [loggedIn, setLoggedIn] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem("user")!);
        if(!user){
            setLoggedIn(false);
        }else {
            setUser(user);
            setLoggedIn(true);
        }
        fetch("/api/admin/comments",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: props.id
            })
        }).then(res=>res.json()).then((data:{comments:[]})=>{
            setComments(data.comments || []);
        }).catch(err=>{
            console.log(err)
        })
    },[comments]);
    const [message, setMessage] = useState("");
    return (
        <>
        <section className="flex flex-col justify-center px-2 py-2 rounded m-2">
        <span>
            <Link href="/blogs" className="text-sm bg-gray-200 px-3 py-2 rounded mt-2">
            back
            </Link>
        </span>
        <img src={props.image} alt={props.title} className="rounded h-50 my-5" style={{
            maxHeight: "300px",
            objectFit: "cover"
            
        }}/>


        <section className="mt-5">
            <h1 className="text-lg font-bold"
            >{props.title}</h1>
            {
                (props.categoryId != "")? <Tag id={props.categoryId}/> : <></>
            }
            <p className="text-xs my-2">{props.body}</p>
            {
                props.links && <p className="my-5 text-sm my-2">Links: <Link className="text-blue-700 text-decoration-line: underline " href={props.links}>Follow Link</Link></p>
            }
            
            {
                message && <p className="text-sm bg-blue-100 px-2 py-1 w-fit">{message}</p>
            }
        {
            (!loggedIn)? <><p className="text-sm my-5 bg-gray-100 px-2 py-1 w-fit"><Link className="text-sm text-blue-700 px-2 py-1 w-fit" href="/login">Login</Link> to like and comment 
            </p></>:<></>
        }
            <section className="flex items-center my-2">
                <button className="text-sm bg-green-200 px-3 py-1 rounded" disabled={!loggedIn} onClick={()=>{
                    
                    const data = {
                        postId:props.id,
                        authorId:user.id
                    }

                    fetch("/api/likes",{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify(data)

                    }).then(res=>res.json()).then(data=>{
                        if(data.message){
                            setMessage(data.message)
                        }
                        setLikes(data.blog_like)
                    }).catch(err=>{
                        console.log(err)
                    })

                }}>
                    <i className="fas fa-thumbs-up mr-2"></i>
                    {likes}
                </button>
                </section>
        </section>
                <CommentForm id={props.id}/>
                <section className="flex flex-col mt-5 w-full" style={{
                    maxWidth: "500px"
                }}>
                    <h1 className="text-2xl font-bold my-2">Comments</h1>
                    <div className="flex flex-col my-2 w-full" style={{
                        maxHeight: "200px",
                        overflowY: "scroll"
                    }}>
                       {
                        (comments.length === 0 )?(<p className="text-sm">No comments yet</p>):(
                                comments.map((comment:any)=>(
                                    <div className="flex flex-col my-2 w-full" key={comment.id}>
                                        <p className="text-sm font-bold">{comment.name}</p>
                                        <p className="text-lg">{comment.body}</p>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </section>
        </section>
        </>
    )
}