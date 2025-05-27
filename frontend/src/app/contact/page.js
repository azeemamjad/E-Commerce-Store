'use client';

import React from 'react';
import ContactForm from '@/components/ContactForm';

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-10">
                <h1 className="text-4xl font-bold text-blue-700 mb-4">Contact Us</h1>
                <p className="text-gray-700 text-lg mb-6">
                    We'd love to hear from you! Please fill out the form below or reach out directly.
                </p>
                <div className="mb-8">
                    <div className="flex items-center mb-2">
                        <span className="inline-block bg-blue-100 text-blue-700 rounded-full p-2 mr-3">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span className="text-gray-800 font-medium">Azeem Amjad</span>
                    </div>
                    <div className="flex items-center">
                        <span className="inline-block bg-blue-100 text-blue-700 rounded-full p-2 mr-3">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm-8 0v1a4 4 0 004 4h0a4 4 0 004-4v-1" />
                            </svg>
                        </span>
                        <a href="mailto:azeemamjjad225@gmail.com" className="text-blue-700 hover:underline font-medium">
                            azeemamjjad225@gmail.com
                        </a>
                    </div>
                </div>
                <ContactForm />
                {/* Social Links */}
                <div className="mt-8 flex justify-center gap-5">
                    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                        className="text-gray-400 hover:text-pink-500 transition-colors">
                        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                    <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                        className="text-gray-400 hover:text-blue-600 transition-colors">
                        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                        </svg>
                    </a>
                    <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                        className="text-gray-400 hover:text-red-600 transition-colors">
                        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a2.993 2.993 0 0 0-2.107-2.117C19.479 3.5 12 3.5 12 3.5s-7.479 0-9.391.569A2.993 2.993 0 0 0 .502 6.186C0 8.099 0 12 0 12s0 3.901.502 5.814a2.993 2.993 0 0 0 2.107 2.117C4.521 20.5 12 20.5 12 20.5s7.479 0 9.391-.569a2.993 2.993 0 0 0 2.107-2.117C24 15.901 24 12 24 12s0-3.901-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                    </a>
                    <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                        className="text-gray-400 hover:text-blue-800 transition-colors">
                        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595zm-7.5-10h-3v-10h3v10z"/>
                        </svg>
                    </a>
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                        className="text-gray-400 hover:text-black transition-colors">
                        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;