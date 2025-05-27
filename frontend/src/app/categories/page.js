import React from 'react';
import Categories from '@/components/Categories';

export default function CategoriesPage() {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="bg-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">All Categories</h1>
                    <p className="text-gray-600">Explore our wide range of products across various categories</p>
                </div>
            </div>

            {/* Categories Section */}
            <Categories />
        </div>
    );
}