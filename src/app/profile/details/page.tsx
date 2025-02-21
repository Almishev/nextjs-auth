"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UserType {
    username: string;
    email: string;
    _id: string;
    isAdmin: boolean;
}

export default function ProfileDetails() {
    const router = useRouter();
    const [user, setUser] = useState<UserType>({
        username: "",
        email: "",
        _id: "",
        isAdmin: false
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const response = await axios.get(`/api/users/me`);
                setUser(response.data.data);
                toast.success("Profile loaded successfully");
            } catch (error: any) {
                toast.error("Error fetching user details");
                router.push('/profile');
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, [router]);

    return (
        <div className="center">
            <div className="form-container">
                <h1 className="title">User Profile Details</h1>
                
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="profile-info">
                        <div className="info-item">
                            <label className="label">USER ID</label>
                            <p className="text">{user._id}</p>
                        </div>
                        
                        <div className="info-item">
                            <label className="label">USERNAME</label>
                            <p className="text">{user.username}</p>
                        </div>
                        
                        <div className="info-item">
                            <label className="label">EMAIL ADDRESS</label>
                            <p className="text">{user.email}</p>
                        </div>
                        
                        <div className="info-item">
                            <label className="label">IS ADMIN</label>
                            <p className="text">{user.isAdmin ? "Yes" : "No"}</p>
                        </div>

                        <button 
                            onClick={() => router.push('/profile')}
                            className="button"
                        >
                            Back to Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
} 