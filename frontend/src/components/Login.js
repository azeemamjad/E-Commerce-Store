"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/api/auth";

const Login = () => {
    const [form, setForm] = useState({ identifier: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        if (!form.identifier || !form.password) {
            setError("Please enter email/username and password.");
            return;
        }
        try {
            await login(form); // Calls your API and stores tokens
            router.push("/"); // Redirect to home or user page
        } catch (err) {
            setError("Invalid credentials or server error.");
        }
    };

    return (
        <div className="max-w-md mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold mb-6 text-blue-700">Login</h1>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-6">
                <input
                    type="text"
                    name="identifier"
                    value={form.identifier}
                    onChange={handleChange}
                    placeholder="Email or Username"
                    required
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {error && <div className="text-red-600 text-sm">{error}</div>}
                <button
                    type="submit"
                    className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors"
                >
                    Login
                </button>
                <div className="text-center text-gray-500">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-700 hover:underline">
                        Register
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;