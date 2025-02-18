"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotpassword", { email });
            toast.success("Reset password link sent to your email!");
            router.push("/login");
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="center">
            <div className="form-container">
                <h1 className="title">Reset Password</h1>
                
                <form onSubmit={onSubmit}>
                    <label className="label" htmlFor="email">Email</label>
                    <input 
                        className="input-field"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />

                    <button
                        type="submit"
                        className="button"
                        disabled={loading || !email}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                <Link href="/login" className="link">
                    Back to Login
                </Link>
            </div>
        </div>
    );
} 