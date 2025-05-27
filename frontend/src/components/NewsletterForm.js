"use client";

import React from 'react';

const NewsletterForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add newsletter subscription logic here
    };

    return (
        <form className="space-y-3" onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button 
                type="submit"
                className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
                Subscribe
            </button>
        </form>
    );
};

export default NewsletterForm;