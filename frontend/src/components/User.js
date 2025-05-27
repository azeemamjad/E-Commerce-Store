"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMe, changePassword, editUser } from "@/api/auth";

const User = () => {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState(null);
    const [previewPic, setPreviewPic] = useState(null);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        current: "",
        new: "",
        confirm: ""
    });
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");
    const router = useRouter();

    // Fetch user data on mount and after save
    const fetchUser = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            router.replace("/login");
            return;
        }
        try {
            const userData = await getMe(token);
            setUser(userData);
            setForm({
                full_name: userData.full_name || "",
                username: userData.username || "",
                email: userData.email || "",
                profilePic: userData.profile_pic || "/images/profile_default.png"
            });
            setPreviewPic(userData.profile_pic || "/images/profile_default.png");
        } catch {
            setUser(null);
            router.replace("/login");
        }
    };

    useEffect(() => {
        fetchUser();
        // eslint-disable-next-line
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleCancel = () => {
        setEditing(false);
        setForm(user && {
            full_name: user.full_name || "",
            username: user.username || "",
            email: user.email || "",
            profilePic: user.profile_pic || "/images/profile_default.png"
        });
        setPreviewPic(user?.profile_pic || "/images/profile_default.png");
    };

    const handlePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, profilePic: file });
            setPreviewPic(URL.createObjectURL(file));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                full_name: form.full_name,
                username: form.username,
                email: form.email,
                profile_pic: form.profilePic instanceof File ? form.profilePic : undefined
            };
            await editUser(payload);
            setEditing(false);
            await fetchUser(); // Fetch updated user data after save
            window.dispatchEvent(new Event("authChanged"));
        } catch (err) {
            alert(err.message || "Failed to update profile.");
        }
    };

    const handlePasswordChange = (e) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
        setPasswordError("");
        setPasswordSuccess("");
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordError("");
        setPasswordSuccess("");

        if (passwordForm.new !== passwordForm.confirm) {
            setPasswordError("New passwords do not match.");
            return;
        }
        if (passwordForm.new.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            return;
        }

        try {
            await changePassword({
                old_password: passwordForm.current,
                new_password: passwordForm.new
            });
            setPasswordSuccess("Password changed successfully!");
            setPasswordForm({ current: "", new: "", confirm: "" });
            setTimeout(() => setShowPasswordForm(false), 1200);
        } catch (err) {
            setPasswordError(err.message || "Password change failed.");
        }
    };

    if (!form) {
        return (
            <div className="max-w-md mx-auto py-16 px-4 text-center text-gray-500">
                Loading user...
            </div>
        );
    }

    // Format member since date
    const memberSince = user?.member_since
        ? new Date(user.member_since).toLocaleDateString()
        : "";

    return (
        <div className="max-w-md mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold mb-6 text-blue-700">User Profile</h1>
            <div className="bg-white rounded-xl shadow p-8">
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={editing && previewPic ? previewPic : form.profilePic}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow mb-2"
                    />
                    {editing && (
                        <label className="block mt-2">
                            <span className="sr-only">Choose profile photo</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePicChange}
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100
                                "
                            />
                        </label>
                    )}
                </div>
                {editing ? (
                    <form onSubmit={handleSave} className="space-y-4">
                        <div>
                            <label className="block font-semibold mb-1">Full Name:</label>
                            <input
                                type="text"
                                name="full_name"
                                value={form.full_name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                        <div className="flex gap-4 mt-6">
                            <button
                                type="submit"
                                className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="mb-4">
                            <span className="font-semibold">Full Name:</span> {form.full_name}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Username:</span> {form.username}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Email:</span> {form.email}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Member Since:</span> {memberSince}
                        </div>
                        <div className="flex gap-4 mt-6">
                            <button
                                className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                                onClick={handleEdit}
                            >
                                Edit Profile
                            </button>
                            <button
                                className="bg-gray-100 text-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
                                onClick={() => setShowPasswordForm(!showPasswordForm)}
                            >
                                Change Password
                            </button>
                        </div>
                        {showPasswordForm && (
                            <form onSubmit={handlePasswordSubmit} className="mt-8 space-y-4 bg-blue-50 rounded-lg p-4">
                                <div>
                                    <label className="block font-semibold mb-1">Current Password</label>
                                    <input
                                        type="password"
                                        name="current"
                                        value={passwordForm.current}
                                        onChange={handlePasswordChange}
                                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">New Password</label>
                                    <input
                                        type="password"
                                        name="new"
                                        value={passwordForm.new}
                                        onChange={handlePasswordChange}
                                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirm"
                                        value={passwordForm.confirm}
                                        onChange={handlePasswordChange}
                                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none"
                                        required
                                    />
                                </div>
                                {passwordError && (
                                    <div className="text-red-600 text-sm">{passwordError}</div>
                                )}
                                {passwordSuccess && (
                                    <div className="text-green-600 text-sm">{passwordSuccess}</div>
                                )}
                                <div className="flex gap-4 mt-2">
                                    <button
                                        type="submit"
                                        className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                                    >
                                        Save Password
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswordForm(false)}
                                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default User;