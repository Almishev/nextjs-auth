"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/users/resetpassword", {
                token,
                password
            });

            toast.success("Password reset successful!");
            router.push("/login");
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            toast.error("Invalid reset token");
            router.push("/login");
        }
    }, [token, router]);

    return (
        <div className="center">
            <div className="form-container">
                <h1 className="title">Reset Your Password</h1>
                
                <form onSubmit={onSubmit}>
                    <div className="password-container">
                        <label className="label" htmlFor="password">New Password</label>
                        <input 
                            className="input-field"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                            minLength={6}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="show-password-button"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <div className="password-container">
                        <label className="label" htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            className="input-field"
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        className="button"
                        disabled={loading || !password || !confirmPassword}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
} 