import { connectDB } from "@/dbConfig/dbconfig";
import user from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { Source_Sans_3 } from "next/font/google";

connectDB();

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const reqbody = await request.json();
    const { token } = reqbody;
    console.log(token);

    if (!token) {
      return NextResponse.json(
        { error: "Please Provide Token 🔑" },
        { status: 500 }
      );
    }

    const presntuser = await user.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

   
    if (!presntuser) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    }

    console.log(presntuser);
    presntuser.isVerified = true
    presntuser.verifyToken = undefined
    presntuser.verifyTokenExpiry = undefined

    await presntuser.save();

    return NextResponse.json({
     message:"Email Verified Sucessfully",
     success:true
    },  
    { status: 200 });



  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
