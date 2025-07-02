"use client"

import { useState } from "react";

export const Users = (props:any) => {
    const [users, setUsers] = useState<any>(props.props|| []);
    const [filteredUsers, setFilteredUsers] = useState<any>(props.props|| []);

    const search = (e:any) => {
        const search = e.target.value;
        const filteredUsers = users.filter((user:any) => user.email.toLowerCase().includes(search.toLowerCase()));
        setFilteredUsers(filteredUsers);
    }

    return     <section 
    className="flex flex-col justify-center items-center mt-5 w-full" style={{
        maxWidth: "500px"
    }}
>
    <section className="flex justify-between items-center my-5 w-full" >
        <h1 className="text-2xl font-bold my-2">Users</h1>
        <section className="flex items-center my-5">
            <input type="text" className="px-1 py-1 border border-gray-100 text-sm rounded" placeholder="search" onChange={search} />
            <button className="text-sm bg-gray-100 px-3 py-1 rounded">
                search
            </button>
        </section>
    </section>
    <table className="table table-striped">
        <thead>
            <tr>
                <th scope="col"
                    className="text-sm p-2"
                >S.NO</th>
                <th scope="col"
                className="text-sm p-2"
                >email</th>
                <th scope="col"
                className="text-sm p-2"
                >Actions</th>
            </tr>
        </thead>
        <tbody>
           {
                 filteredUsers.map((user:any,i:number)=>{
                      return(
                        <tr key={i}>
                             <th scope="row"
                                  className="text-sm p-2"
                             >{i+1}</th>
                             <td
                                  className="text-sm p-2"
                             >{user.email}</td>
                             <td>
                                {
                                    !user.isadmin ? <p className="text-xs text-center bg-blue-100 p-2 my-5 rounded" onClick={()=>{
                                        const confirm = window.confirm("Are you sure you want to make this user an admin?");
                                        if(confirm){
                                            fetch(`/api/admin/new`,{
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({
                                                    id: user.id
                                                })
                                            }).then(res=>res.json()).then(data=>{
                                                if(!data.error){
                                                    alert(data.message);
                                                    window.location.reload();
                                                }else{
                                                    alert(data.message);
                                                }
                                            });
                                        }
                                    }}>
                                    <i className="fas fa-crown"></i>
                                    </p>:<></>
                                }
                                         {
                                    user.isadmin ? <p className="text-xs text-center bg-blue-100 p-2 my-5 rounded" onClick={()=>{
                                        const confirm = window.confirm("Are you sure you want to demote this user?");
                                        if(confirm){
                                            fetch(`/api/admin/demote`,{
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({
                                                    id: user.id
                                                })
                                            }).then(res=>res.json()).then(data=>{
                                                if(!data.error){
                                                    alert(data.message);
                                                    window.location.reload();
                                                }else{
                                                    alert(data.message);
                                                }
                                            });
                                        }
                                    }}>
                                    <i className="fas fa-user-minus"></i>
                                    </p>:<></>
                                }
                             <p className="text-xs text-center bg-red-100 p-2 my-5 rounded" onClick={()=>{
                                    const confirm = window.confirm("Are you sure you want to delete this user?");  
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
                                                window.location.reload();
                                            }else{
                                                alert(data.message);
                                            }
                                        })
                                    }
                                }}>
                                <i className="fas fa-trash"></i>
                                </p>
                             </td>
                        </tr>
                      )
                 })
           }
        </tbody>
    </table></section>
}