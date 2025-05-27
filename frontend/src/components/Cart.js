"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Dummy cart items for demo
const initialCart = [
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
];

const Cart = () => {
    const [cart, setCart] = useState(initialCart);

    const handleIncrease = (id) => {
        setCart(cart =>
            cart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecrease = (id) => {
        setCart(cart =>
            cart
                .map(item =>
                    item.id === id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const handleRemove = (id) => {
        setCart(cart => cart.filter(item => item.id !== id));
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8 text-blue-700">Your Cart</h1>
            {cart.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400 text-lg">
                    Your cart is empty.
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <ul className="divide-y">
                        {cart.map(item => (
                            <li key={item.id} className="flex items-center gap-6 py-6">
                                <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-lg" />
                                <div className="flex-1">
                                    <div className="font-semibold text-lg">{item.name}</div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => handleDecrease(item.id)}
                                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
                                            aria-label="Decrease quantity"
                                        >-</button>
                                        <span className="px-2">{item.quantity}</span>
                                        <button
                                            onClick={() => handleIncrease(item.id)}
                                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
                                            aria-label="Increase quantity"
                                        >+</button>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="font-bold text-blue-700 text-lg">${(item.price * item.quantity).toFixed(2)}</div>
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="text-xs text-red-500 hover:underline mt-2"
                                        aria-label="Remove from cart"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between items-center mt-8 border-t pt-6">
                        <span className="font-semibold text-xl">Total:</span>
                        <span className="font-bold text-2xl text-blue-700">${total.toFixed(2)}</span>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <Link href="/orders/checkout">
                        <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors shadow cursor-pointer">
                            Proceed to Checkout
                        </button>
                        </Link>
                    </div>
                </div>
            )}
            <div className="mt-8">
                <Link href="/" className="text-blue-700 hover:underline">
                    &larr; Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default Cart;