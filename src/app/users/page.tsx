"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface User {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
    isAdmin: boolean;
}



export default function AllUsersPage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/users/allusers');
                console.log('Users response:', response.data);
                if (response.data && Array.isArray(response.data.data)) {
                    setUsers(response.data.data);
                    toast.success(`Loaded ${response.data.data.length} users`);
                } else {
                    toast.error('Invalid data format received');
                }
            } catch (error: any) {
                console.error('Error fetching users:', error);
                toast.error(error.message || 'Error loading users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleUserClick = (userId: string) => {
        router.push(`/profile/${userId}`);
    };

    return (
        <div className="center">
            <div className="form-container" style={{ maxWidth: '800px' }}>
                <h1 className="title">All Users ({users.length})</h1>
                
                {loading ? (
                    <div className="profile-info">
                        <div className="info-item">
                            <p className="text">Loading users...</p>
                        </div>
                    </div>
                ) : users.length === 0 ? (
                    <div className="profile-info">
                        <div className="info-item">
                            <p className="text">No users found</p>
                        </div>
                    </div>
                ) : (
                    <div className="profile-info">
                        {users.map((user) => (
                            <div 
                                key={user._id} 
                                className="info-item" 
                                onClick={() => handleUserClick(user._id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="user-header">
                                    <label className="label">USERNAME</label>
                                    <span className={`verification-badge ${user.isVerified ? 'verified' : 'unverified'}`}>
                                        {user.isVerified ? 'Verified' : 'Unverified'}
                                    </span>
                                </div>
                                <p className="text">{user.username}</p>
                                
                                <label className="label">EMAIL</label>
                                <p className="text">{user.email}</p>

                                <label className="label">IS ADMIN</label>
                                <p className="text">{user.isAdmin ? "Yes" : "No"}</p>

                            </div>
                        ))}
                    </div>
                )}

                <div className="button-group">
                    <button 
                        onClick={() => router.push('/profile')}
                        className="button"
                    >
                        Back to Profile
                    </button>
                </div>
            </div>
        </div>
    );
} 