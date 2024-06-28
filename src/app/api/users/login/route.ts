import { connectDB } from "@/dbConfig/dbconfig";
import user from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const reqbody = await request.json();
    const { email, password }:any = reqbody;
   
    console.log(reqbody);
    const presentuser = await user.findOne({ email });
    
    
    if (!presentuser) {
      return NextResponse.json({ error: "User does not exists " }, { status: 400 });
    }

    console.log("user present");
    const validPassword = await bcrypt.compare(password,presentuser.password)

    if(!validPassword){
      return NextResponse.json({ error: "please provide valid password" }, { status: 400 });
    }

     const tokendata = {
        id:presentuser._id,
        username:presentuser.username,
        email:presentuser.email
     }

     const token = jwt.sign(tokendata, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

     const response = NextResponse.json({
        message:"Logged In Success",
        success: true
     })

    response.cookies.set("token",token,{
        httpOnly:true
    })

    return response


  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
