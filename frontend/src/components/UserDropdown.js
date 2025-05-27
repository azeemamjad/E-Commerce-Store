"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getMe, logout } from "@/api/auth";

const UserDropdown = () => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem("access_token");
            if (token) {
                try {
                    const userData = await getMe(token);
                    setUser(userData);
                } catch {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        }
        fetchUser();

        // Listen for login/logout events from other tabs and custom authChanged event
        const syncUser = () => fetchUser();
        window.addEventListener("storage", syncUser);
        window.addEventListener("authChanged", syncUser); // <--- Add this line
        return () => {
            window.removeEventListener("storage", syncUser);
            window.removeEventListener("authChanged", syncUser); // <--- Add this line
        };
    }, []);

    const handleLogout = () => {
        logout();
        setUser(null);
        setOpen(false);
        router.push("/");
    };

    const handleDashboard = () => {
        setOpen(false);
        router.push("/admin");
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors focus:outline-none"
                aria-label="User menu"
            >
                <img
                    src={user?.profile_pic || "/images/profile_default.png"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border border-blue-100"
                />
                {user && (
                    <span className="hidden md:inline font-semibold text-sm">{user.full_name ? user.full_name.split(" ")[0] : user.username}</span>
                )}
            </button>
            {open && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-blue-100 z-50">
                    <div className="p-4 border-b text-center">
                        {user ? (
                            <>
                                <div className="font-bold text-blue-700 text-lg mb-1">
                                    Welcome, {user.full_name ? user.full_name.split(" ")[0] : user.username}!
                                </div>
                                <div className="text-xs text-gray-400">{user.email}</div>
                            </>
                        ) : (
                            <div className="font-bold text-blue-700 text-lg mb-1">Welcome, Guest!</div>
                        )}
                    </div>
                    <div className="flex flex-col p-2">
                        {user ? (
                            <>
                                <Link
                                    href="/user"
                                    className="px-4 py-2 rounded-lg hover:bg-blue-50 text-left transition-colors"
                                    onClick={() => setOpen(false)}
                                >
                                    Profile
                                </Link>
                                <Link
                                    href="/orders"
                                    className="px-4 py-2 rounded-lg hover:bg-blue-50 text-left transition-colors"
                                    onClick={() => setOpen(false)}
                                >
                                    Orders
                                </Link>
                                {user.is_admin && (
                                    <button
                                        onClick={handleDashboard}
                                        className="px-4 py-2 rounded-lg hover:bg-blue-50 text-left transition-colors text-blue-700 font-semibold"
                                    >
                                        Dashboard
                                    </button>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="mt-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors text-left"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 rounded-lg hover:bg-blue-50 text-left transition-colors"
                                    onClick={() => setOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 rounded-lg hover:bg-blue-50 text-left transition-colors"
                                    onClick={() => setOpen(false)}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;