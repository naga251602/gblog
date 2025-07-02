"use client"
import Link from "next/link"
import { useState } from "react";
import { Loader } from "../Loader/Loader";

export const RegisterForm = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const submitHandler = (e:any)=>{
        e.preventDefault();
        setLoading(true);
        fetch('/api/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: e.target.name.value,
                email: e.target.email.value,
                password: e.target.password.value
            })
        }).then((res) => res.json()).then((data)=>{
            if(data.error){
                setError(data.error);
                setLoading(false);
            }else{
                sessionStorage.setItem("user",JSON.stringify(data));
                window.location.href = "/";
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    if(loading){
        return <Loader/>
    }else {
        return (
            <section className="flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold">
                    Register
                </h1>
                <p className="text-sm mb-3">
                    Create an account
                </p>
                <p className="text-sm text-red-500">
                    {error}
                </p>
                <form className="flex flex-col space-y-5" style={{
                    width: "300px"
                }} onSubmit={submitHandler}>
                    <input type="text" placeholder="Name" id="name" 
                    name="name"
                    className="border border-gray-200 p-1 px-2 rounded"/>
                    <input type="email" placeholder="Email" 
                    id="email" name="email"
                    className="border border-gray-200 p-1 px-2 rounded"/>
                    <input type="password" placeholder="Password"
                    id="password" name="password"
                    className="border border-gray-200 p-1 px-2 rounded"/>
                    <button className="text-sm text-white bg-blue-500 px-2 py-1 rounded">Login</button>
                </form>
    
                {/* already */}
                <p className="text-sm mt-3">Already have an account? <Link href="/login" className="text-blue-500">Login</Link></p>
            </section>
        )
    }
}