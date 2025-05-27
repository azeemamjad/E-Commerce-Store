'use client';

import React from 'react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-10">
                <h1 className="text-4xl font-bold text-blue-700 mb-4">About Us</h1>
                <p className="text-gray-700 text-lg mb-6">
                    Welcome to <span className="font-semibold text-blue-600">E-Commerce Store</span>! We are dedicated to providing you with the best products and services.
                </p>
                <p className="text-gray-600 mb-4">
                    Our mission is to deliver quality and satisfaction to our customers. We carefully curate our collection to ensure you always find something you love, whether it's the latest trends or timeless classics.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 mt-8">
                    <div className="flex-1 bg-blue-50 rounded-lg p-6 text-center">
                        <h2 className="text-2xl font-semibold text-blue-700 mb-2">Our Vision</h2>
                        <p className="text-gray-600">To be your favorite destination for online shopping, offering an exceptional experience every time.</p>
                    </div>
                    <div className="flex-1 bg-blue-50 rounded-lg p-6 text-center">
                        <h2 className="text-2xl font-semibold text-blue-700 mb-2">Our Promise</h2>
                        <p className="text-gray-600">Quality products, fast shipping, and outstanding customer support—guaranteed.</p>
                    </div>
                </div>
                <div className="mt-10 text-center">
                    <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
                        Thank you for choosing us!
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;