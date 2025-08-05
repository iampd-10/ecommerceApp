import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const verifyEmail = async (token, email, fullName, userName, password, role) => {
  console.log("verifyEmail() called with email:", email); 
  if (!email) {
    throw new Error("Recipient email is missing.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });

  if (!email) {
  throw new Error("Recipient email address is missing");
}


  const mailConfigurations = {
    from: process.env.email,
    to: email,
    subject: `Hii ${fullName} Email Verification for iampd10 Shop`,
    text: `Hi ${fullName},

Thank you for registering as a ${role} on **iampd10 Shop**.

You are just one step away from accessing your account.


We’re excited to have you onboard! To complete your registration, please verify your email address by clicking the link below:

🔗 http://localhost:5173/user/verify/${token}

Your username is: **${userName}**
Your temporary login password is: **${password}**  
*Please keep this password confidential and do not share it with anyone.*

Kindly complete the verification process at your earliest convenience.  
**Note:** This email is part of a mock practice and not a real verification.

If you did not sign up for this account, please ignore this message.

Best regards,  
**The iampd10 Shop Team** `,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
      
      throw new Error(error);
    }
    console.log(`Email sent successfully to ${fullName} at ${email}`);
    console.log("Sending email to:", email);


    console.log(info);
  });
};
