"use client";

import { NavBar } from "@/components/Headers/NavBar";
import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
    id: string;
    name: string;
    email: string;
    isadmin: boolean;
}

export default function Dashboard() {
    const [user, setUser] = useState<User>({
        id: "",
        name: "",
        email: "",
        isadmin: false,
    });
    const [loggedIn, setLoggedIn] = useState(false);
    const [comments, setComments] = useState<any>([]);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user")!);
        if (!user) {
            setLoggedIn(false);
        } else {
            setUser(user);
            setLoggedIn(true);
        }

        fetch("/api/admin/users/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: user.id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setComments(data.comments || []);
            }).catch(err=>{
                console.log(err);
            });
    }, []);

    if(!loggedIn){
        return (
            <>
                <NavBar/>
                <h1>You are not logged in</h1>
            </>
        )
    }else{
        return (
            <>
                <NavBar/>
                <h1 className="text-2xl p-5">Dashboard</h1>
                <main className="flex flex-col p-5">
                    <table className="table-auto" style={{
                        maxWidth: "500px",
                    }}>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">
                                   <span className="font-bold mr-2"> Name: </span>
                                {user.name}
                                </td>
                                </tr><tr>
                                <td className="border px-4 py-2">
                                    <span className="font-bold mr-2"> Email: </span>
                                    {user.email}
                                    </td>
                            </tr>
                        </tbody>
                    </table>
                </main>
                <section className="flex p-5">
                    <Link href="/dashboard/edit"  className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded">
                        Edit Profile
                    </Link>
                </section>
                <h1 className="text-2xl p-5">Actions</h1>
                <section className="flex flex-col p-5 pt-2">
                    <section className="flex flex-col">
                        <h1 className="text-xl font-bold">Your Comments</h1>
                        <div style={{
                            maxHeight: "300px",
                            overflowY: "scroll",
                            marginTop: "10px",
                        }}>
                        {
                            (comments.length > 0) ? comments.map((comment:any,i:number)=>{
                                return (
                                    <section className="flex justify-between p-5" key={i}>
                                        <section className="flex flex-col ">
                                        <h1 className="text-xl font-bold">{comment.name}</h1>
                                        <p className="text-lg">{comment.body}</p>
                                        </section>
                                        <button className="bg-red-500 hover:bg-red-700 text-white mt-4  py-2 px-4 rounded"
                                        onClick={()=>{
                                            const confirm = window.confirm("Are you sure you want to delete this comment ?");
                                            if(confirm){
                                                fetch(`/api/admin/users/comments`,{
                                                    method: "DELETE",
                                                    headers: {
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify({
                                                        id: comment.id
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
                                        }}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </section>
                                )
                            }): <h1 className="text-sm">You have not commented on any post</h1>
                        }
                        </div>
                    </section>
                    <button className="bg-red-500 hover:bg-red-700 text-white mt-4  py-2 px-4 rounded"
                    onClick={()=>{
                        const confirm = window.confirm("Are you sure you want to delete your account ?");  
                        if(confirm){
                            fetch(`/api/admin/users`,{
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    id: user.id
                                })
                            }).then(res=>res.json()).then(data=>{
                                if(!data.error){
                                    alert(data.message);
                                    sessionStorage.removeItem("user");
                                    window.location.href = "/";
                                    
                                }else{
                                    alert(data.message);
                                }
                            })
                        }
                    }}
                    >
                        Delete my  Account
                    </button>
                </section>
            </>
        )
    }
}