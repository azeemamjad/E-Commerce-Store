'use client';

import React, { useState } from 'react';
import Search from '@/components/Search';
import Products from '@/components/Products';

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFilter, setSearchFilter] = useState('');

    // Filter logic for demo (replace with backend call in real app)
    const getFilteredCategory = () => {
        if (searchFilter) return searchFilter;
        return null;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-blue-700">Search Products</h1>
            <Search
                onSearch={(query, filter) => {
                    setSearchQuery(query);
                    setSearchFilter(filter);
                }}
            />
            {/* You can pass searchQuery to Products for further filtering if needed */}
            <Products category={getFilteredCategory()} />
        </div>
    );
}