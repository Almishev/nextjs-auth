"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ArrowRight, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Image from "next/image";

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
            setError("");
            setLoading(true);
            
            const response = await axios.post("/api/users/login", user);
            
            if (response.data.success) {
                toast.success("Успешен вход");
                await new Promise(resolve => setTimeout(resolve, 1000));
                window.location.href = '/profile';
            }
        } catch (error: any) {
            console.error('Грешка при вход:', error);
            setError(error.response?.data?.error || "Нещо се обърка");
            toast.error(error.response?.data?.error || "Нещо се обърка");
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
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="w-full max-w-5xl transform transition-all duration-300 ease-in-out hover:shadow-xl 
                          bg-white rounded-2xl shadow-lg overflow-hidden
                          animate-fadeIn flex flex-col md:flex-row">
                <div className="hidden md:block md:w-1/2 relative">
                    <Image
                        src="/images/slider7.jpg"
                        alt="Луксозен хотел"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                        <div className="px-8 text-white">
                            <h2 className="text-3xl font-bold mb-4">Добре дошли отново</h2>
                            <p className="text-lg opacity-90">Влезте във вашия акаунт, за да се насладите на ексклузивни оферти и невероятно обслужване.</p>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-4">
                        <h1 className="text-center text-white text-2xl font-bold">
                            {loading ? 
                                <span className="inline-flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Обработка...
                                </span> : 
                                <span className="animate-fadeIn">
                                    Вход в системата
                                </span>
                            }
                        </h1>
                    </div>
                    
                    <div className="p-8">
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 animate-shake">
                                <p className="font-medium">{error}</p>
                            </div>
                        )}
                        
                        <div className="mb-5">
                            <label className="block text-gray-700 font-medium mb-2 transition-colors duration-200" htmlFor="email">
                                Имейл
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                    <Mail size={18} />
                                </span>
                                <input 
                                    className="w-full pl-10 py-3 px-4 border-2 border-gray-200 rounded-lg text-base 
                                             transition duration-300 ease-in-out bg-white focus:outline-none 
                                             focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                                    id="email"
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => setUser({...user, email: e.target.value})}
                                    placeholder="Въведете вашия имейл"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2 transition-colors duration-200" htmlFor="password">
                                Парола
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                    <Lock size={18} />
                                </span>
                                <input 
                                    className="w-full pl-10 py-3 px-4 border-2 border-gray-200 rounded-lg text-base 
                                             transition duration-300 ease-in-out bg-white focus:outline-none 
                                             focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={user.password}
                                    onChange={(e) => setUser({...user, password: e.target.value})}
                                    placeholder="Въведете вашата парола"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500
                                              hover:text-indigo-500 transition-colors duration-200"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={onLogin}
                            disabled={buttonDisabled || loading}
                            className={`group w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 
                                       text-white border-none rounded-lg text-base font-semibold cursor-pointer
                                       transition duration-300 ease-in-out 
                                       hover:shadow-lg hover:shadow-indigo-200/30 transform hover:-translate-y-1
                                       flex items-center justify-center ${buttonDisabled || loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? "Влизане..." : (
                                <>
                                    Вход
                                    <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                                </>
                            )}
                        </button>

                        <div className="mt-6 flex flex-col space-y-2 items-center text-center">
                            <Link href="/signup" className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200">
                                Нямате акаунт? Регистрирайте се
                            </Link>
                            <Link href="/forgotpassword" className="text-gray-600 hover:text-indigo-800 hover:underline transition-colors duration-200">
                                Забравена парола?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
