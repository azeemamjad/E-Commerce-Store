"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/api/auth";

const Register = () => {
    const [form, setForm] = useState({
        username: "",
        full_name: "",
        email: "",
        password: "",
        profile_pic: null
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = e => {
        const { name, value, files } = e.target;
        if (name === "profile_pic") {
            setForm({ ...form, profile_pic: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        setLoading(true);
        if (!form.username || !form.full_name || !form.email || !form.password) {
            setError("Please fill all required fields.");
            setLoading(false);
            return;
        }
        try {
            await register(form);
            router.push("/login");
        } catch (err) {
            setError(err.message || "Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold mb-6 text-blue-700">Register</h1>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-6">
                <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="text"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
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
                <div>
                    <label className="block font-semibold mb-1">Profile Picture (optional):</label>
                    <label className="flex items-center gap-3 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold transition-colors w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                        </svg>
                        {form.profile_pic ? form.profile_pic.name : "Choose File"}
                        <input
                            type="file"
                            name="profile_pic"
                            accept="image/*"
                            onChange={handleChange}
                            className="hidden"
                        />
                    </label>
                </div>
                {error && <div className="text-red-600 text-sm">{error}</div>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors"
                >
                    {loading ? "Registering..." : "Register"}
                </button>
                <div className="text-center text-gray-500">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-700 hover:underline">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;