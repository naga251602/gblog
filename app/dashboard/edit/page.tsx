"use client"


import { useEffect, useState } from "react";
import { NavBar } from "@/components/Headers/NavBar";
import Link from "next/link";


export default function Edit() {
    const [user, setUser] = useState<any>(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const Handler = (e: any) => {
        e.preventDefault();
        setLoading(true);
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = "";
        const confirmPassword = "";
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            setLoading(false);
            return;
        }
        fetch("/api/admin/users", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: user.id,
                name: name,
                email: email,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error);
                    setLoading(false);
                    return;
                }
                sessionStorage.setItem("user", JSON.stringify(data.user));
                alert("Profile updated successfully");
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user")!);
        if (!user) {
            setLoggedIn(false);
        } else {
            setUser(user);
            setLoggedIn(true);
        }
    }
    , []);

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
                <span className="p-5 my-5 mt-10">
                    <Link href="/dashboard" className="text-sm bg-gray-200 px-3 py-2 rounded mt-2">
                    back
                    </Link>
                </span>
                <h1 className="text-2xl p-5">Update Profile</h1>
             
                <form className="flex flex-col mt-2 w-full p-5" style={{
                    maxWidth: "500px"
                }} onSubmit={ Handler }>
                    <label className="text-xl">Name</label>
                    <input className="border-2 border-gray-300 p-2 rounded-md" type="text" defaultValue={user.name} id="name" name="name"/>
                    <label className="text-xl">Email</label>
                    <input className="border-2 border-gray-300 p-2 rounded-md" type="email" defaultValue={user.email} id="email" name="email"/>
                    {/* <label className="text-xl">Password</label>
                    <input className="border-2 border-gray-300 p-2 rounded-md" type="password" id="password" name="password" required/>
                    <label className="text-xl">Confirm Password</label>
                    <input className="border-2 border-gray-300 p-2 rounded-md" type="password" id="confirmPassword" name="confirmPassword" required/> */}
                    {
                        loading ? <button className="bg-blue-500 p-2 rounded-md text-white mt-2" type="button">Loading...</button> : <button className="bg-blue-500 p-2 rounded-md text-white mt-2" type="submit">Update</button>
                    }
                </form>

            </>
        )
    }

}