"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState("");

    const onLogin = async () => {
        try {
            setError(""); // Изчистваме предишни грешки
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            
            if (response.data.success) {
                router.push("/profile");
                router.refresh();
            }
        } catch (error: any) {
            console.log("Login error:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            setError(error.response?.data?.error || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="center">
            <div className="form-container">
                <h1 className="title">{loading ? "Processing..." : "Login"}</h1>
                
                {error && (
                    <span className="error-message">
                        {error}
                    </span>
                )}
                
                <label className="label" htmlFor="email">Email</label>
                <input 
                    className="input-field"
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="Enter your email"
                />

                <label className="label" htmlFor="password">Password</label>
                <div className="password-container">
                    <input 
                        className="input-field"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="show-password-button"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <button
                    onClick={onLogin}
                    disabled={buttonDisabled || loading}
                    className="button"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <Link href="/signup" className="link">
                    Don&apos;t have an account? Sign up
                </Link>
                <Link href="/forgotpassword" className="link">
                    Forgot your password?
                </Link>
            </div>
        </div>
    )
}