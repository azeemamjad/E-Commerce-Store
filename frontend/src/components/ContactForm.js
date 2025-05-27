"use client";

import React, { useState } from 'react';

const ContactForm = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Connect to backend API here
        alert('Message sent! (Backend integration goes here)');
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label className="block text-gray-700 mb-1 font-medium">Your Name</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-1 font-medium">Your Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-1 font-medium">Message</label>
                <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message..."
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
                Send Message
            </button>
        </form>
    );
};

export default ContactForm;