'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'


export default function ProfilePage() {
    const router = useRouter()
    const [data, setdata] = useState("nothing");

    const getUserDetails = async () => {
        try {
            const res = await axios.post("/api/users/profile")
            console.log(res.data.data._id);
            setdata(res.data.data._id);
        } catch (error: any) {
            console.log(error)
        }
    }

    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout Successfully")
            router.push("/login");

        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <div
            className='flex flex-col items-center justify-center min-h-screen py-2'
        >
            <h1> 👤 Profile Page </h1>
            <hr />
            <h2>{data === "nothing" ? "Nothing 🤔" :
                <Link href={`/profile/${data}`}>{data}</Link>}</h2>

            <hr/>
           
            <button
            onClick={getUserDetails}
            className='bg-red-500 mt-4 hover:bg-red-700  text-white font-bold py-2 px-4 rounded'
            >GetuserDetails</button>


  

            <button
            onClick={logout}
            className='bg-blue-500 mt-4 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded'
            >Logout</button>
        </div>
    )
}

