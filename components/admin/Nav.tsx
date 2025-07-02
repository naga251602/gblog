"use client"

import { useState } from "react";
import { Users } from "../users/Users";
import { Blogs } from "../blogs/Blogs";
import { Category } from "../categories/Category";

export const Nav = (props:any) => {
    const [choice,setChoice] = useState(1);
    return <>
    <nav className="mt-5" style={{
            maxWidth: "500px"
        }}>
        <ul className="flex justify-center">
            <li style={{
                borderRight: "1px solid black",
                padding: "10px"
            }} onClick={() => {
                setChoice(1);
            }}>
                Blogs
            </li>
            <li style={{
                borderRight: "1px solid black",
                padding: "10px"
            }} onClick={() => {
                setChoice(2);
            }}>
                Users
            </li>
            <li style={{
                padding: "10px"
            }} onClick={() => {
                setChoice(3);
            }}>
                Categories
            </li>
        </ul>
    </nav>
    {
       (choice === 1) ? <Blogs props={props.blogs}/> : <></> 
    }
    {
       (choice === 2) ? <Users props={props.users}/> : <></>
    }
    {
        (choice === 3) ? <Category props={props.categories}/> : <></>
    }
    </>
}