"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Dummy order data for demo
const orders = [
    {
        id: "ORD-1001",
        date: "2024-05-05",
        status: "Delivered",
        total: 309.97,
        items: [
            {
                id: 1,
                name: "Classic White Sneakers",
                price: 89.99,
                quantity: 1,
                image: "/images/white_sneakers.webp"
            },
            {
                id: 2,
                name: "Denim Jacket",
                price: 129.99,
                quantity: 2,
                image: "/images/denim_jacket.avif"
            }
        ]
    },
    {
        id: "ORD-1002",
        date: "2024-04-28",
        status: "Shipped",
        total: 89.99,
        items: [
            {
                id: 3,
                name: "Blue Cap",
                price: 89.99,
                quantity: 1,
                image: "/images/blue_cap.webp"
            }
        ]
    }
];

const statusColors = {
    Delivered: "text-green-600 bg-green-50",
    Shipped: "text-blue-600 bg-blue-50",
    Pending: "text-yellow-600 bg-yellow-50",
    Cancelled: "text-red-600 bg-red-50"
};

const Order = () => (
    <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8 text-blue-700">Your Orders</h1>
        {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400 text-lg">
                You have no orders yet.
            </div>
        ) : (
            <div className="space-y-10">
                {orders.map(order => (
                    <div key={order.id} className="bg-white rounded-xl shadow-lg p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div>
                                <div className="font-semibold text-lg">Order #{order.id}</div>
                                <div className="text-gray-500 text-sm">Placed on {order.date}</div>
                            </div>
                            <div className={`mt-2 md:mt-0 px-4 py-1 rounded-full font-semibold text-sm ${statusColors[order.status] || "bg-gray-100 text-gray-600"}`}>
                                {order.status}
                            </div>
                        </div>
                        <ul className="divide-y">
                            {order.items.map(item => (
                                <li key={item.id} className="flex items-center gap-6 py-4">
                                    <Image src={item.image} alt={item.name} width={60} height={60} className="rounded-lg" />
                                    <div className="flex-1">
                                        <div className="font-semibold">{item.name}</div>
                                        <div className="text-gray-500 text-sm">Qty: {item.quantity}</div>
                                    </div>
                                    <div className="font-bold text-blue-700">${(item.price * item.quantity).toFixed(2)}</div>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between items-center mt-6 border-t pt-4">
                            <span className="font-semibold text-lg">Total:</span>
                            <span className="font-bold text-xl text-blue-700">${order.total.toFixed(2)}</span>
                        </div>
                    </div>
                ))}
            </div>
        )}
        <div className="mt-8">
            <Link href="/" className="text-blue-700 hover:underline">
                &larr; Back to Home
            </Link>
        </div>
    </div>
);

export default Order;