"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import ProductReviews from './ProductReviews';
import RelatedProducts from './RelatedProducts';

// Dummy data for demonstration
const products = [
    {
        id: 1,
        name: "Classic White Sneakers",
        price: 89.99,
        images: [
            "/images/white_sneakers.webp",
            "/images/white_sneakers_2.webp",
            "/images/white_sneakers_3.webp"
        ],
        category: "Shoes",
        description: "Step out in style with these classic white sneakers. Comfortable, durable, and perfect for any outfit.",
        rating: 4.5,
        likes: 12,
        related: [2]
    },
    {
        id: 2,
        name: "Denim Jacket",
        price: 129.99,
        images: [
            "/images/denim_jacket.avif",
            "/images/denim_jacket_2.avif"
        ],
        category: "Outerwear",
        description: "A timeless denim jacket for all seasons. Layer it up or wear it solo for a cool, casual look.",
        rating: 4.0,
        likes: 8,
        related: [1]
    },
    // Add more products as needed
];

const ProductDetails = ({ id }) => {
    const product = products.find(p => String(p.id) === String(id));
    const [selectedImg, setSelectedImg] = useState(0);
    const [liked, setLiked] = useState(false);

    if (!product) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-gray-500 text-xl">Product not found.</p>
            </div>
        );
    }

    // Related products
    const relatedProducts = products.filter(p => product.related.includes(p.id));

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-white rounded-2xl shadow-2xl p-10 mb-16">
                {/* Image Gallery */}
                <div>
                    <div className="relative w-full h-[420px] mb-6 rounded-xl overflow-hidden shadow-lg bg-gray-50 flex items-center justify-center">
                        <Image
                            src={product.images[selectedImg]}
                            alt={product.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                    <div className="flex gap-3 mt-2">
                        {product.images.map((img, idx) => (
                            <button
                                key={img}
                                onClick={() => setSelectedImg(idx)}
                                className={`border-2 rounded-lg p-1 transition-all duration-200 ${selectedImg === idx ? 'border-blue-700 scale-105' : 'border-gray-200'}`}
                                aria-label={`Show image ${idx + 1}`}
                            >
                                <Image
                                    src={img}
                                    alt={`Thumbnail ${idx + 1}`}
                                    width={72}
                                    height={72}
                                    className="object-cover rounded"
                                />
                            </button>
                        ))}
                    </div>
                </div>
                {/* Product Info */}
                <div className="flex flex-col justify-center pl-0 lg:pl-8">
                    <h1 className="text-4xl font-bold text-blue-700 mb-4">{product.name}</h1>
                    <p className="text-gray-500 mb-4 capitalize text-lg">{product.category}</p>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-yellow-500 text-2xl">
                            {'★'.repeat(Math.floor(product.rating))}
                            {product.rating % 1 ? '½' : ''}
                            {'☆'.repeat(5 - Math.ceil(product.rating))}
                        </span>
                        <span className="text-gray-600 text-base">{product.rating} / 5.0</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-800 mb-6">${product.price}</p>
                    <p className="text-gray-700 mb-8 text-lg">{product.description}</p>
                    <div className="flex items-center gap-6 mb-8">
                        <button
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border text-lg transition-colors ${
                                liked ? 'bg-pink-100 text-pink-600 border-pink-300' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-pink-50 hover:text-pink-600'
                            }`}
                            onClick={() => setLiked(l => !l)}
                            type="button"
                        >
                            <svg className="h-6 w-6" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                            </svg>
                            {liked ? "Liked" : "Like"}
                             <span className="ml-2 text-base font-normal">
                                {product.likes + (liked ? 1 : 0)}
                            </span>
                        </button>
                        <button className="bg-blue-700 text-white px-10 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors text-lg shadow">
                            Add to Cart
                        </button>
                    </div>
                    <div className="text-base text-gray-400">Free shipping on orders over $50</div>
                </div>
            </div>
            {/* Related Products */}
            <div className="mt-16">
                <RelatedProducts products={relatedProducts} />
            </div>
            {/* Reviews at the end */}
            <ProductReviews />
        </div>
    );
};

export default ProductDetails;