"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Products = ({ category = null }) => {
    const products = [
        {
            id: 1,
            name: "Classic White Sneakers",
            price: 89.99,
            image: "/images/white_sneakers.webp",
            category: "Shoes"
        },
        {
            id: 2,
            name: "Denim Jacket",
            price: 129.99,
            image: "/images/denim_jacket.avif",
            category: "Outerwear"
        },
        {
            id: 3,
            name: "Leather Watch",
            price: 199.99,
            image: "/images/leather_watch.avif",
            category: "Accessories"
        },
        {
            id: 4,
            name: "Summer Dress",
            price: 79.99,
            image: "/images/summer_dress.avif",
            category: "Dresses"
        },
        {
            id: 5,
            name: "Classic White Sneakers",
            price: 89.99,
            image: "/images/white_sneakers.webp",
            category: "Shoes"
        },
        {
            id: 6,
            name: "Denim Jacket",
            price: 129.99,
            image: "/images/denim_jacket.avif",
            category: "clothing"
        }
    ];

    // Filter products only if category is provided
    const filteredProducts = category 
        ? products.filter(product => 
            product.category.toLowerCase() === category.toLowerCase()
          )
        : products;

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold mb-8">
                {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Collection` : 'Featured Products'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                    <Link href={`/product/${product.id}`} key={product.id}>
                    <div key={product.id} className="group">
                        <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-2">{product.category}</p>
                        <p className="text-xl font-bold">${product.price}</p>
                        <button className="w-full mt-4 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
                            Add to Cart
                        </button>
                    </div>
                    </Link>
                ))}
            </div>
            
            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-600">No products found in this category.</p>
                </div>
            )}
        </div>
    );
};

export default Products;