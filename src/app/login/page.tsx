"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {

  const router = useRouter()

  const [user, setuser] = useState({
    email: "",
    password: ""
  })
  const [buttondisabled, setbuttondisabled] = useState(false)
  const [loading, setloading] = useState(false)

  const onLogin = async () => {

    try {
      setloading(true)
      const response = await axios.post("/api/users/login", user)
      console.log("Login Sucess" + response.data);
      toast.success("Login Sucessfully 🎉")
      router.push("/profile")


    } catch (error) {
      console.log("Login Failed" + error)
      toast.error("Login Failed")
    }
  }

  useEffect(() => {

    if (user.email.length > 0 && user.password.length > 0) {
          setbuttondisabled(false);
    }else{
      setbuttondisabled(true);
    }


  }, [user])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Login"}</h1>
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
        required
        value={user.password}
        onChange={(e)=> setuser({...user,password:e.target.value})}
        placeholder='🔑password'
       type="text"
      />
      <button
      onClick={onLogin}
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >
        {buttondisabled ? "Fill the Details" : "Login"}
      </button>
      <Link href="/signup">visit signup page</Link>
    </div>
  )
}

