"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();

    useEffect(() => {
        const urlToken = searchParams.get("token");
        setToken(urlToken || "");
    }, [searchParams]);

    useEffect(() => {
        const verifyUserEmail = async () => {
            try {
                setLoading(true);
                const response = await axios.post("/api/users/verifyemail", { token });
                setVerified(true);
                toast.success("Email verified successfully!");
            } catch (error: any) {
                setError(true);
                console.error("Verification error:", error);
                toast.error(error.response?.data?.error || "Verification failed");
            } finally {
                setLoading(false);
            }
        };

        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="center">
            <div className="form-container">
                <h1 className="title">Email Verification</h1>
                
                <div className="profile-info">
                    {loading ? (
                        <p className="text">Verifying your email...</p>
                    ) : verified ? (
                        <div>
                            <p className="text">Email verified successfully!</p>
                            <Link href="/login" className="button">
                                Login
                            </Link>
                        </div>
                    ) : error ? (
                        <div>
                            <p className="text">Error verifying email. The link may be invalid or expired.</p>
                            <Link href="/login" className="button">
                                Back to Login
                            </Link>
                        </div>
                    ) : (
                        <p className="text">Please wait while we verify your email...</p>
                    )}
                </div>
            </div>
        </div>
    );
}