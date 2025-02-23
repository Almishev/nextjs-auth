import nodemailer from 'nodemailer';
import User from "../models/userModel";
import bcryptjs from 'bcryptjs';

export async function sendEmail({ email, emailType, userId }: any) {
    try {
        console.log(`Starting email send process for ${email} (${emailType})`);
        
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
        } else if (emailType === "RESET"){
            console.log("Updating user with password reset token");
            await User.findByIdAndUpdate(userId, 
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            );
            console.log("User updated with password reset token");
        }

        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
        };

        const mailResponse = await transport.sendMail(mailOptions);
        console.log("Email sent successfully:", mailResponse.messageId);
        return mailResponse;

    } catch (error: any) {
        console.error("Error in sendEmail:", error.message);
        throw new Error(`Error sending email: ${error.message}`);
    }
}

export const sendBookingConfirmation = async ({email, bookingDetails}: any) => {
    try {
        const transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false, // true за 465 порт, false за други портове
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"Хотелски резервации" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Потвърждение на вашата резервация",
            html: `
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
                    <h2 style="color: #333; text-align: center;">Потвърждение на резервация</h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #444;">Детайли за престоя:</h3>
                        <p><strong>Настаняване:</strong> ${new Date(bookingDetails.startDate).toLocaleDateString('bg-BG')}</p>
                        <p><strong>Напускане:</strong> ${new Date(bookingDetails.endDate).toLocaleDateString('bg-BG')}</p>
                        <p><strong>Брой гости:</strong> ${bookingDetails.guests}</p>
                        <p><strong>Стая:</strong> ${bookingDetails.roomName}</p>
                        <p><strong>Обща цена:</strong> $${bookingDetails.totalPrice}</p>
                    </div>

                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
                        <h3 style="color: #444;">Информация за госта:</h3>
                        <p><strong>Име:</strong> ${bookingDetails.name}</p>
                        <p><strong>Телефон:</strong> ${bookingDetails.phone}</p>
                        <p><strong>Имейл:</strong> ${bookingDetails.email}</p>
                    </div>

                    <p style="color: #666; margin-top: 20px;">
                        Благодарим ви, че избрахте нашия хотел! Ако имате въпроси, моля свържете се с нас.
                    </p>
                </div>
            `
        };

        const mailresponse = await transport.sendMail(mailOptions);
        console.log("Booking confirmation email sent:", mailresponse.messageId);
        return mailresponse;

    } catch (error: any) {
        console.error("Error sending booking confirmation:", error.message);
        throw new Error(error.message);
    }
}