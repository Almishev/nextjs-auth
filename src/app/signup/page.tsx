"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState("");

    // Валидация на email формата
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Валидация на паролата
    const isValidPassword = (password: string) => {
        return password.length >= 6;
    }

    const validateForm = () => {
        if (!user.email || !user.password || !user.username) {
            setError("All fields are required!");
            return false;
        }

        if (!isValidEmail(user.email)) {
            setError("Please enter a valid email address!");
            return false;
        }

        if (!isValidPassword(user.password)) {
            setError("Password must be at least 6 characters long!");
            return false;
        }

        setError(""); // Изчистваме грешката ако всичко е наред
        return true;
    }

    const onSignup = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success:", response.data);
            
            if (response.data.success) {
                router.push("/login");
            }
        } catch (error: any) {
            console.log("Signup error:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            setError(error.response?.data?.error || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    // Валидация при промяна на полетата
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));

        // Изчистваме грешката при промяна
        setError("");
    }

    useEffect(() => {
        // Активираме бутона само ако има стойности във всички полета
        const isFormFilled = user.email && user.password && user.username;
        setButtonDisabled(!isFormFilled);
    }, [user]);

    return (
        <div className="center">
            <div className="form-container">
                <h1 className="title">{loading ? "Creating Account..." : "Sign Up"}</h1>
                
                {error && (
                    <span className="error-message">
                        {error}
                    </span>
                )}
                
                <label className="label" htmlFor="username">Username</label>
                <input 
                    className="input-field"
                    id="username"
                    name="username"
                    type="text"
                    value={user.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                />

                <label className="label" htmlFor="email">Email</label>
                <input 
                    className="input-field"
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                />

                <label className="label" htmlFor="password">Password</label>
                <div className="password-container">
                    <input 
                        className="input-field"
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={user.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password (min 6 characters)"
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
                    onClick={onSignup}
                    disabled={buttonDisabled || loading}
                    className="button"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

                <Link href="/login" className="link">
                    Already have an account? Login
                </Link>
            </div>
        </div>
    )
}