import user from "@/models/usermodel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
    const updateuser=  await user.findByIdAndUpdate(userId, {
      $set:{
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
       }
      });
    } else if (emailType === "RESET") {
      await user.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
       
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
       to ${ emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"  }
       or copy and paste the link below in your browser.
       <br>
       <h4>
       ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
       </h4>
      </p>`,
    };

    const mailRespone = await transporter.sendMail(mailOptions);
    return mailRespone;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
