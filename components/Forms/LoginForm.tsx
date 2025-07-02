"use client"

import Link from "next/link"
import { useState } from "react";
import { Loader } from "../Loader/Loader";

export const LoginForm = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const submitHandler = (e:any)=>{
        e.preventDefault();
        setLoading(true);
        fetch('/api/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: e.target.email.value,
                password: e.target.password.value
            })
        }).then(
            (res) => res.json()
        ).then(
            (data)=>{
                if(data.error){
                    setError(data.error);
                    setLoading(false);
                }else{
                    sessionStorage.setItem("user",JSON.stringify(data));
                    window.location.href = "/";
                }
            }
        ).catch((err)=>{
            console.log(err);
        })
    }

    if (loading) {
        return <Loader/>
    } else {
        return (
            <section className="flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-sm mb-3">Log in to your account</p>

                {/* error */}
                {error && <p className="text-sm text-red-500">{error}</p>}
                <form className="flex flex-col space-y-5" style={{
                    width: "300px"
                }} onSubmit={submitHandler}>
                    <input type="email" placeholder="Email" className="border border-gray-200 p-1 px-2 rounded" id="email" name="email"/>
                    <input type="password" placeholder="Password" className="border border-gray-200 p-1 px-2 rounded" id="password" name="password"/>
                    <button className="text-sm text-white bg-blue-500 px-2 py-1 rounded">Login</button>
                </form>
    
                {/* already */}
                <p className="text-sm mt-3">Don't have an account? <Link href="/register" className="text-blue-500">Register</Link></p>   
            </section>
        )
    }
}