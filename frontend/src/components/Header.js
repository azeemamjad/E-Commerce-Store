"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CategoriesDropdown from './CategoriesDropdown';
import CartDropdown from './CartDropdown';
import UserDropdown from './UserDropdown';
import { getMe } from '@/api/auth';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = () => {
            const token = localStorage.getItem("access_token");
            if (token) {
                getMe(token)
                    .then(user => setIsAdmin(!!user.is_staff))
                    .catch(() => setIsAdmin(false));
            } else {
                setIsAdmin(false);
            }
        };

        checkAdmin();

        window.addEventListener("authChanged", checkAdmin);
        return () => window.removeEventListener("authChanged", checkAdmin);
    }, []);

    return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-gray-800">
                        <Link href="/" className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                            <span className="text-blue-600">E</span>
                            <span>Commerce</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                            Home
                        </Link>
                        <CategoriesDropdown />
                        <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                            About
                        </Link>
                        <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                            Contact
                        </Link>
                        <Link href="/orders" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                            Orders
                        </Link>
                        {isAdmin && (
                            <Link href="/admin" className="text-blue-700 hover:underline font-semibold text-sm">
                                Admin Panel
                            </Link>
                        )}
                    </nav>

                    {/* Icons */}
                    <div className="flex items-center space-x-6">
                        <Link href="/search" className="text-gray-600 hover:text-blue-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </Link>
                        <CartDropdown />
                        <UserDropdown />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <nav className="md:hidden mt-4 py-4 border-t border-gray-100">
                        <div className="flex flex-col space-y-4">
                            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                                Home
                            </Link>
                            <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition-colors">
                                Categories
                            </Link>
                            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                                About
                            </Link>
                            <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                                Contact
                            </Link>
                            <Link href="/orders" className="text-gray-600 hover:text-blue-600 transition-colors">
                                Orders
                            </Link>
                            {isAdmin && (
                                <Link href="/admin" className="text-blue-700 hover:underline font-semibold">
                                    Admin Panel
                                </Link>
                            )}
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;