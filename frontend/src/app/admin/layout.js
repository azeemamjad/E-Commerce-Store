"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/api/auth";

export default function AdminLayout({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            router.replace("/login");
            return;
        }
        getMe(token)
            .then(u => {
                setUser(u);
                setLoading(false);
            })
            .catch(() => {
                router.replace("/login");
            });
    }, [router]);

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    if (!user?.is_staff) {
        return (
            <div className="flex min-h-screen items-center justify-center text-xl font-bold text-blue-700">
                Have a Good Day, You are Not the admin
            </div>
        );
    }

    return <>{children}</>;
}