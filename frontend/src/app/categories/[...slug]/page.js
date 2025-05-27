import React from 'react';
import Products from '@/components/Products';

export default function CategoryPage({ params }) {
    // params.slug is an array of category levels
    const { slug } = params || [];
    const slugArray = Array.isArray(slug) ? slug : [slug];
    const categoryName = slugArray[slugArray.length - 1];
    const categoryPath = slugArray.join(' / ');

    return (
        <div className="min-h-screen">
            <div className="bg-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <a href="/" className="hover:text-black">Home</a>
                        <span>/</span>
                        <a href="/categories" className="hover:text-black">Categories</a>
                        {slugArray.map((part, idx) => (
                            <React.Fragment key={idx}>
                                <span>/</span>
                                <span className="text-black capitalize">{part}</span>
                            </React.Fragment>
                        ))}
                    </div>
                    <h1 className="text-4xl font-bold capitalize mb-2">
                        {categoryName || 'Categories'}
                    </h1>
                    <p className="text-gray-600">
                        Discover our collection for: <span className="font-semibold">{categoryPath}</span>
                    </p>
                </div>
            </div>
            {/* Pass the category name to Products */}
            <Products category={categoryName} />
        </div>
    );
}