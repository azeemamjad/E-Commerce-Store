"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const OrderProgress = () => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postal: "",
        country: "",
        notes: ""
    });
    const [confirmed, setConfirmed] = useState(false);
    const router = useRouter();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleNext = e => {
        e.preventDefault();
        setStep(step + 1);
    };

    const handleBack = () => setStep(step - 1);

    const handleConfirm = e => {
        e.preventDefault();
        setConfirmed(true);
        setTimeout(() => {
            router.push("/orders");
        }, 1500);
    };

    return (
        <div className="max-w-xl mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">Order Progress</h1>
            <div className="flex justify-center mb-8 gap-4">
                <div className={`flex items-center ${step >= 1 ? "text-blue-700" : "text-gray-400"}`}>
                    <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-current font-bold">{1}</span>
                    <span className="ml-2 font-semibold hidden sm:inline">Info</span>
                </div>
                <div className={`flex items-center ${step >= 2 ? "text-blue-700" : "text-gray-400"}`}>
                    <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-current font-bold">{2}</span>
                    <span className="ml-2 font-semibold hidden sm:inline">Confirm</span>
                </div>
            </div>
            {confirmed ? (
                <div className="bg-green-50 rounded-xl shadow p-8 text-center">
                    <div className="text-2xl mb-2 text-green-700 font-bold">Order Confirmed!</div>
                    <div className="text-gray-600">Thank you for your purchase.</div>
                </div>
            ) : step === 1 ? (
                <form onSubmit={handleNext} className="bg-white rounded-xl shadow p-8 space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
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
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        required
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Address"
                        required
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="flex gap-4">
                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            placeholder="City"
                            required
                            className="flex-1 px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="text"
                            name="postal"
                            value={form.postal}
                            onChange={handleChange}
                            placeholder="Postal Code"
                            required
                            className="flex-1 px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <input
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        placeholder="Country"
                        required
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Order Notes (optional)"
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows={2}
                    />
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleConfirm} className="bg-white rounded-xl shadow p-8 space-y-4">
                    <div className="text-lg font-semibold mb-4 text-blue-700">Confirm Your Details</div>
                    <div className="space-y-2">
                        <div><span className="font-semibold">Name:</span> {form.name}</div>
                        <div><span className="font-semibold">Email:</span> {form.email}</div>
                        <div><span className="font-semibold">Phone:</span> {form.phone}</div>
                        <div><span className="font-semibold">Address:</span> {form.address}, {form.city}, {form.postal}, {form.country}</div>
                        {form.notes && <div><span className="font-semibold">Notes:</span> {form.notes}</div>}
                    </div>
                    <div className="flex gap-4 mt-6">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors"
                        >
                            Confirm Order
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default OrderProgress;