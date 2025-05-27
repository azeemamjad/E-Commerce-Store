"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

const CartDropdown = () => {
    const [open, setOpen] = useState(false);
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
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="relative text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Cart"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                </span>
            </button>
            {open && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-blue-100 z-50">
                    <div className="p-4 border-b">
                        <h4 className="font-bold text-lg text-blue-700">Cart</h4>
                    </div>
                    {cart.length === 0 ? (
                        <div className="p-6 text-center text-gray-400">Your cart is empty.</div>
                    ) : (
                        <div>
                            <ul className="divide-y">
                                {cart.map(item => (
                                    <li key={item.id} className="flex items-center gap-3 p-4">
                                        <Image src={item.image} alt={item.name} width={48} height={48} className="rounded" />
                                        <div className="flex-1">
                                            <div className="font-semibold">{item.name}</div>
                                            <div className="flex items-center gap-2 mt-1">
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
                                            <div className="font-bold text-blue-700">${(item.price * item.quantity).toFixed(2)}</div>
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
                            <div className="p-4 border-t flex justify-between items-center">
                                <span className="font-semibold">Total:</span>
                                <span className="font-bold text-blue-700">${total.toFixed(2)}</span>
                            </div>
                            <div className="p-4">
                                <Link
                                    href="/cart"
                                    className="block w-full text-center bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                                    onClick={() => setOpen(false)}
                                >
                                    View Cart
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CartDropdown;