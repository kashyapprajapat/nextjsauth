import { connectDB } from "@/dbConfig/dbconfig";
import user from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

import { getdataFromToken } from "@/helpers/getdataFromToken";

connectDB();

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const userid = await getdataFromToken(request);
    const puser = await user.findById(userid).select("-password");

    if (!puser) {
      return NextResponse.json({ error: "Inavalid Token" }, { status: 400 });
    }

    return NextResponse.json({
      message: "User Found",
      data: puser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
