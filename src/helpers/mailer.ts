import nodemailer from 'nodemailer';
import User from "../models/userModel";
import bcryptjs from 'bcryptjs';
import { toast } from "react-hot-toast";

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        console.log(`Starting email send process for ${email} (${emailType})`);
        toast.loading("Preparing verification email...");
        
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        console.log("Token created:", hashedToken);

        if (emailType === "VERIFY") {
            console.log("Updating user with verification token");
            await User.findByIdAndUpdate(userId, 
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            );
            console.log("User updated with verification token");
            toast.success("Verification token created");
        } else if (emailType === "RESET"){
            console.log("Updating user with password reset token");
            await User.findByIdAndUpdate(userId, 
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            );
            console.log("User updated with password reset token");
            toast.success("Reset token created");
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        toast.loading("Sending email...");

        const mailOptions = {
            from: 'auth@example.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
                    <h2 style="color: #333; text-align: center;">
                        ${emailType === "VERIFY" ? "Verify Your Email Address" : "Reset Your Password"}
                    </h2>
                    <p style="color: #666; font-size: 16px; line-height: 1.5;">
                        Please click the button below to ${emailType === "VERIFY" ? "verify your email address" : "reset your password"}.
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}"
                           style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                            ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
                        </a>
                    </div>
                    <p style="color: #666; font-size: 14px;">
                        Or copy and paste this link in your browser:<br>
                        <span style="color: #007bff;">${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}</span>
                    </p>
                    <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
                        If you didn't request this email, you can safely ignore it.
                    </p>
                </div>
            `
        };

        const mailresponse = await transport.sendMail(mailOptions);
        console.log("Email sent successfully:", mailresponse.messageId);
        toast.success(emailType === "VERIFY" 
            ? "Verification email sent! Please check your inbox." 
            : "Password reset email sent! Please check your inbox."
        );
        
        return mailresponse;

    } catch (error:any) {
        console.error("Error in sendEmail:", error.message);
        toast.error("Failed to send email. Please try again.");
        throw new Error(error.message);
    } finally {
        toast.dismiss(); // Dismiss any loading toasts
    }
}