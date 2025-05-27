"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { fetchCategories } from '@/api/products';

const CategoriesDropdown = () => {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useRef(null);

    // Fetch categories from API
    useEffect(() => {
        fetchCategories()
            .then(data => setCategories(data))
            .catch(() => setCategories([]))
            .finally(() => setLoading(false));
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium flex items-center px-3 py-2 rounded-md cursor-pointer"
                type="button"
                onClick={() => setOpen((prev) => !prev)}
            >
                Categories
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {open && (
                <div className="absolute left-0 mt-2 w-60 bg-white shadow-lg rounded-lg border z-50 py-2">
                    <Link
                        href="/categories"
                        className="block px-4 py-3 text-blue-600 font-semibold hover:bg-blue-50 rounded-t transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        Show All Categories
                    </Link>
                    <div className="border-t my-1" />
                    {loading ? (
                        <div className="px-4 py-2 text-gray-400">Loading...</div>
                    ) : categories.length === 0 ? (
                        <div className="px-4 py-2 text-gray-400">No categories</div>
                    ) : (
                        categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/categories/${encodeURIComponent(cat.name)}`}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                {cat.name || cat.title}
                            </Link>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default CategoriesDropdown;