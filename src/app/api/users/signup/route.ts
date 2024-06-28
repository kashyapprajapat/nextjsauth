import { connectDB } from "@/dbConfig/dbconfig";
import user from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { emit } from "process";

connectDB();

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const reqbody = await request.json();
    const { username, email, password }: any = reqbody;
    console.log(reqbody);

    const existuser = await user.findOne({ email });
    if (existuser) {
      return NextResponse.json(
        { error: "user Alreday exist" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new user({
      username,
      email,
      password: hashpassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    //send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    console.log(`Email sent to ${email} sucessfully.`)
    return NextResponse.json({
      message: "User Register Sucessfully",
      sucess: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
