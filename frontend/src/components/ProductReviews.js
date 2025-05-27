"use client";

import React, { useState } from 'react';

const initialReviews = [
    {
        id: 1,
        name: "John Doe",
        rating: 5,
        comment: "Amazing product! Highly recommended.",
        date: "2024-05-01",
        images: ["/images/review_sample_1.jpg"]
    },
    {
        id: 2,
        name: "Jane Smith",
        rating: 4,
        comment: "Very comfortable and stylish.",
        date: "2024-04-28",
        images: []
    },
    {
        id: 3,
        name: "Alex Brown",
        rating: 5,
        comment: "Perfect fit and quality!",
        date: "2024-04-20",
        images: []
    },
    {
        id: 4,
        name: "Sara Lee",
        rating: 3,
        comment: "Good, but could be better.",
        date: "2024-04-15",
        images: []
    }
    // Add more reviews as needed
];

const REVIEWS_PER_PAGE = 3;

const ProductReviews = () => {
    const [reviews, setReviews] = useState(initialReviews);
    const [form, setForm] = useState({ name: '', rating: 5, comment: '', images: [], hoverRating: undefined });
    const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setForm({ ...form, images: files });
    };

    const handleStarClick = (star) => {
        setForm({ ...form, rating: star });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setReviews([
            {
                ...form,
                id: reviews.length + 1,
                date: new Date().toISOString().slice(0, 10),
                images: form.images.map(file => URL.createObjectURL(file))
            },
            ...reviews
        ]);
        setForm({ name: '', rating: 5, comment: '', images: [], hoverRating: undefined });
        setVisibleCount(REVIEWS_PER_PAGE); // Reset to first page to show new review
    };

    const handleShowMore = () => {
        setVisibleCount(count => count + REVIEWS_PER_PAGE);
    };

    return (
        <div className="mt-24 max-w-3xl mx-auto">
            <h3 className="text-3xl font-extrabold mb-8 text-blue-700 text-center">Customer Reviews</h3>
            <form onSubmit={handleSubmit} className="mb-12 bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="flex-1 px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-lg"
                    />
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => handleStarClick(star)}
                                className="focus:outline-none"
                                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                                tabIndex={0}
                                style={{ cursor: 'pointer' }}
                                onMouseEnter={() => setForm(f => ({ ...f, hoverRating: star }))}
                                onMouseLeave={() => setForm(f => ({ ...f, hoverRating: undefined }))}
                            >
                                <svg
                                    className={`w-8 h-8 transition-colors duration-150 ${
                                        (form.hoverRating || form.rating) >= star
                                            ? 'text-yellow-400 drop-shadow'
                                            : 'text-gray-300'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>
                <textarea
                    name="comment"
                    value={form.comment}
                    onChange={handleChange}
                    placeholder="Write your review..."
                    required
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-lg mb-3"
                    rows={3}
                />
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-4 block text-blue-700"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors shadow"
                >
                    Submit Review
                </button>
            </form>
            <div className="space-y-10">
                {reviews.length === 0 && (
                    <p className="text-gray-500 text-center">No reviews yet. Be the first to review!</p>
                )}
                {reviews.slice(0, visibleCount).map(r => (
                    <div key={r.id} className="bg-white rounded-2xl p-6 shadow-md border border-blue-50">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-blue-700">{r.name}</span>
                            <span className="flex items-center text-yellow-400 text-lg">
                                {'★'.repeat(r.rating)}
                                {'☆'.repeat(5 - r.rating)}
                            </span>
                            <span className="text-xs text-gray-400 ml-auto">{r.date}</span>
                        </div>
                        <p className="text-gray-700 mb-3 text-base">{r.comment}</p>
                        {r.images && r.images.length > 0 && (
                            <div className="flex gap-3 mt-2 flex-wrap">
                                {r.images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt="Review"
                                        className="w-24 h-24 object-cover rounded-lg border border-blue-100 shadow"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {visibleCount < reviews.length && (
                    <div className="flex justify-center">
                        <button
                            onClick={handleShowMore}
                            className="mt-4 px-6 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors cursor-pointer"
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductReviews;