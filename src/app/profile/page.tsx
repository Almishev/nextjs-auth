"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UserCircle, Calendar, Users, LogOut, UserCog, ChevronRight } from 'lucide-react';
import Image from "next/image";


interface UserData {
    id: string;
    isAdmin: boolean;
    username?: string;
    email?: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData>({
        id: "",
        isAdmin: false,
        username: "",
        email: ""
    });
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const res = await axios.get('/api/users/me');
                const user = res.data.data;
                console.log("Loaded user data:", user); 
                
                setUserData({
                    id: user._id,
                    isAdmin: user.isAdmin,
                    username: user.username,
                    email: user.email
                });
            } catch (error: any) {
                console.error("Error loading user data:", error);
                toast.error("Грешка при зареждане на потребителските данни");
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden animate-fadeIn">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-8 px-6 md:px-10">
                            <div className="flex flex-col md:flex-row items-center md:items-start">
                                <div className="w-24 h-24 rounded-full bg-white/30 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                                    <UserCircle className="w-16 h-16 text-white" />
                                </div>
                                <div className="text-center md:text-left">
                                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                                        {userData.username || "Потребител"}
                                    </h1>
                                    <p className="text-indigo-100 mb-2">{userData.email}</p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                        {userData.isAdmin && (
                                            <span className="bg-white/20 text-white text-xs font-medium py-1 px-3 rounded-full backdrop-blur-sm">
                                                Администратор
                                            </span>
                                        )}
                                        <span className="bg-white/20 text-white text-xs font-medium py-1 px-3 rounded-full backdrop-blur-sm">
                                            Активен акаунт
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-6 md:p-10">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Управление на акаунта</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div 
                                    onClick={() => router.push('/profile/details')}
                                    className="cursor-pointer bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 flex items-center"
                                >
                                    <div className="rounded-full bg-indigo-100 p-3 mr-4">
                                        <UserCog className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-medium text-gray-800">Моят профил</h3>
                                        <p className="text-sm text-gray-500">Управление на лична информация</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                                
                                <div 
                                    onClick={() => router.push('/profile/bookings')}
                                    className="cursor-pointer bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 flex items-center"
                                >
                                    <div className="rounded-full bg-indigo-100 p-3 mr-4">
                                        <Calendar className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-medium text-gray-800">Моите резервации</h3>
                                        <p className="text-sm text-gray-500">История на резервациите</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>

                                {userData.isAdmin && (
                                    <div 
                                        onClick={() => router.push('/users')}
                                        className="cursor-pointer bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 flex items-center"
                                    >
                                        <div className="rounded-full bg-indigo-100 p-3 mr-4">
                                            <Users className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-medium text-gray-800">Всички потребители</h3>
                                            <p className="text-sm text-gray-500">Админ панел за управление</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            
                            <div className="mt-8 flex justify-center">
                                <button 
                                    onClick={() => {
                                        axios.get('/api/users/logout')
                                            .then(() => {
                                                toast.success('Успешен изход');
                                                router.push('/login');
                                            })
                                            .catch(() => toast.error('Грешка при изход'));
                                    }}
                                    className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
                                >
                                    <LogOut className="w-5 h-5 mr-2" />
                                    Изход от системата
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}