"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchCategories } from '@/api/products';

const Categories = ({ featured = false }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCategories()
            .then(data => {
                let cats = data;
                if (featured === true) {
                    cats = cats.slice(0, 4);
                }
                setCategories(cats);
            })
            .catch(() => setError("Failed to load categories"))
            .finally(() => setLoading(false));
    }, [featured]);

    if (loading) {
        return (
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center text-gray-500">Loading categories...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center text-red-600">{error}</div>
            </section>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Shop by Category</h2>
                <Link 
                    href="/categories" 
                    className="text-gray-600 hover:text-black transition-colors"
                >
                    View All →
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map((category) => (
                    <Link href={`/categories/${encodeURIComponent(category.name)}`} key={category.id}>
                        <div className="relative h-72 group cursor-pointer overflow-hidden rounded-lg">
                            {category.image && (
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors" />
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <h3 className="text-white text-xl font-bold mb-1 transform group-hover:translate-x-2 transition-transform duration-300">
                                    {category.title || category.name}
                                </h3>
                                <p className="text-gray-200 text-sm mb-2 transform group-hover:translate-x-2 transition-transform duration-300 delay-75">
                                    {category.description}
                                </p>
                                <span className="text-gray-300 text-sm transform group-hover:translate-x-2 transition-transform duration-300 delay-100">
                                    {category.itemCount} items
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Categories;