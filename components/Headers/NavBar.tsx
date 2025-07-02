"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import './css/style.css';

type User = {
    id:string,
    name:string,
    email:string,
    isadmin:boolean
}

export const NavBar = () => {
    const [user, setUser] = useState<User>({
        id: "",
        name: "",
        email: "",
        isadmin: false
    });
    const [menu, setMenu] = useState<boolean>(false);
    const [isloggedin, setIsLoggedIn] = useState<boolean>(false);

    useEffect(()=> {
        const user = sessionStorage.getItem("user") || null;
        if(user){
            setUser(JSON.parse(user));
            setIsLoggedIn(true);
        }
    },[])
    return (
        <>
            <nav className="flex p-5 justify-between items-center">
            <h1 className="text-2xl font-bold">Gblog</h1>
            <ul className="flex space-x-5 items-center" 
            id="navLinks"
            >
                <li >
                    <Link className="text-sm bold" href="/">Home</Link>
                </li>
                <li>
                    <Link href="/blogs" className="text-sm bold">Blogs</Link>
                </li>
                {
                    (isloggedin && user.isadmin) ? (<li>
                        <Link href="/admin" className="text-sm bold">Admin</Link>
                    </li>):(<></>)
                }
   
                <li>
                    <Link href="/" className="text-sm bold">Contact</Link>
                </li>
            </ul>
            <button className="text-lg bold bg-blue-500 px-3 py-1 rounded text-white" id="menuBtn" onClick={
                () => {
                    setMenu(!menu);
                }
            }>
                <i className="fas fa-bars"></i>

            </button>

            {
                (isloggedin) ? (
                    <section className="flex space-x-5" id="navBtn1">
                        <Link href="/dashboard" className="text-sm text-white bg-blue-500 mr-2 px-2 py-1 rounded">
                        {user.name}</Link>
                        <button className="text-sm bg-gray-200 mr-2 px-2 py-1 rounded"
                        onClick={
                            ()=>{
                                sessionStorage.removeItem("user");
                                window.location.href = "/";
                            }
                        }>logout</button>
                    </section>
                ):(
                    <section id="navBtn2">
                        <button className="text-sm text-white bg-blue-700 mr-5 px-5 py-1 rounded">
                            <Link href="/login">Login</Link>
                        </button>
                        <button className="text-sm bg-gray-200 mr-5 px-5 py-1 rounded">
                            <Link href="/register">Register</Link>
                        </button>
                    </section>
                )
            }
        </nav>
        <aside className={(menu)?"flex flex-col justify-start p-5":"hidden flex flex-col justify-start p-5"} id="menu">
            <ul className="flex flex-col space-y-5 " id="navLinks2">
                <li>
                    <Link href="/" className="text-sm bold">Home</Link>
                </li>
                <li>
                    <Link href="/blogs" className="text-sm bold">Blogs</Link>
                    </li>
                    {
                    (isloggedin && user.isadmin) ? (<li>
                        <Link href="/admin" className="text-sm bold">Admin</Link>
                    </li>):(<></>)
                }
            </ul>
            {
                (isloggedin) ? (
                    <>
                    <Link href="/dashboard" className="text-sm text-white bg-blue-500 mr-5 px-2 py-2 my-2">
                    {user.name}</Link>
                    <span className="text-sm bg-gray-200 mr-5 px-2 py-2"
                        onClick={
                            ()=>{
                                sessionStorage.removeItem("user");
                                window.location.href = "/";
                                }
                            }
                    >logout</span>
                    </>
                ):(
                    <>
                        <Link className="text-sm text-white bg-blue-500 mr-5 px-2 py-2 my-2" href="/login">Login</Link>
                        <Link className="text-sm bg-gray-200 mr-5 px-2 py-2" href="/register">Register</Link>
                    </>
                )
            }

        </aside>
        </>
    )
}