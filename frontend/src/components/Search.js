"use client";

import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query, category, time, price);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                >
                    Search
                </button>
            </div>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mt-4">
                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Categories</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Clothing">Clothing</option>
                </select>
                <select
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Sort By Time</option>
                    <option value="latest">Latest</option>
                    <option value="popular">Popular</option>
                </select>
                <select
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Sort By Price</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                </select>
            </div>
        </form>
    );
};

export default Search;