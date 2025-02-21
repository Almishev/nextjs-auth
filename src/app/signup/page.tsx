"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import { toast } from 'react-hot-toast';
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
            toast.error("Всички полета са задължителни!");
            return false;
        }

        if (!isValidEmail(user.email)) {
            toast.error("Моля, въведете валиден имейл адрес!");
            return false;
        }

        if (!isValidPassword(user.password)) {
            toast.error("Паролата трябва да е поне 6 символа!");
            return false;
        }

        return true;
    }

    const onSignup = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            
            if (response.data.success) {
                toast.success("Регистрацията е успешна!");
                // Изчакваме малко toast-а да се покаже
                await new Promise(resolve => setTimeout(resolve, 1000));
                router.push("/login");
            }
        } catch (error: any) {
            console.log("Signup error:", error);
            toast.error(error.response?.data?.error || "Възникна грешка при регистрацията!");
        } finally {
            setLoading(false);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    }

    useEffect(() => {
        const isFormFilled = user.email && user.password && user.username;
        setButtonDisabled(!isFormFilled);
    }, [user]);

    return (
        <div className="center">
            <div className="form-container">
                <h1 className="title">{loading ? "Създаване на акаунт..." : "Регистрация"}</h1>
                
                <label className="label" htmlFor="username">Потребителско име</label>
                <input 
                    className="input-field"
                    id="username"
                    name="username"
                    type="text"
                    value={user.username}
                    onChange={handleInputChange}
                    placeholder="Въведете потребителско име"
                />

                <label className="label" htmlFor="email">Имейл</label>
                <input 
                    className="input-field"
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleInputChange}
                    placeholder="Въведете имейл адрес"
                />

                <label className="label" htmlFor="password">Парола</label>
                <div className="password-container">
                    <input 
                        className="input-field"
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={user.password}
                        onChange={handleInputChange}
                        placeholder="Въведете парола (мин. 6 символа)"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="show-password-button"
                    >
                        {showPassword ? "Скрий" : "Покажи"}
                    </button>
                </div>

                <button
                    onClick={onSignup}
                    disabled={buttonDisabled || loading}
                    className="button"
                >
                    {loading ? "Създаване на акаунт..." : "Създай акаунт"}
                </button>

                <Link href="/login" className="link">
                    Вече имате акаунт? Влезте
                </Link>
            </div>
        </div>
    )
}