"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {

  const router = useRouter()

  const [user, setuser] = useState({
    email: "",
    password: "",
    username: ""
  })
  const [buttondisabled, setbuttondisabled] = useState(false)
  const [loading, setloading] = useState(false)

  const onSignup = async () => {

    try {
      setloading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup Sucess" + response.data);
      toast.success("Signup Sucessfully 🎉")
      router.push("/login")


    } catch (error) {
      console.log("Signup Failed" + error)
      toast.error("Signup Failed")
    }
  }

  useEffect(() => {

    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
          setbuttondisabled(false);
    }else{
      setbuttondisabled(true);
    }


  }, [user])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <label htmlFor='username'>username</label>
      <input 
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='username'
        value={user.username}
        onChange={(e)=> setuser({...user,username:e.target.value})}
        placeholder=' 👤username'
       type="text"
      />
      <label htmlFor='email'>email</label>
      <input 
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='email'
        value={user.email}
        onChange={(e)=> setuser({...user,email:e.target.value})}
        placeholder=' 📧email'
       type="text"
      />
      <label htmlFor='password'>password</label>
      <input 
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='password'
        value={user.password}
        onChange={(e)=> setuser({...user,password:e.target.value})}
        placeholder='🔑password'
       type="text"
      />
      <button
      onClick={onSignup}
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >
        {buttondisabled ? "Fill the Details" : "Signup"}
      </button>
      <Link href="/login">visit login page</Link>
    </div>
  )
}

