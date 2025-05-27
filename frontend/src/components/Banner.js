"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const banners = [
        {
            id: 1,
            title: "Summer Collection 2024",
            description: "Up to 40% off on all summer essentials",
            image: "/images/summer_dress.avif",
            buttonText: "Shop Now"
        },
        {
            id: 2,
            title: "New Arrivals",
            description: "Check out our latest collection",
            image: "/images/leather_watch.avif",
            buttonText: "Explore More"
        },
        {
            id: 3,
            title: "New Arrivals",
            description: "Check out our latest collection",
            image: "/images/denim_jacket.avif",
            buttonText: "Explore More"
        }
    ];

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, [banners.length]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    };

    useEffect(() => {
        let intervalId;
        if (!isHovering) {
            intervalId = setInterval(() => {
                nextSlide();
            }, 3500);
        }
        return () => clearInterval(intervalId);
    }, [isHovering, nextSlide]);

    return (
        <div 
            className="relative w-full h-[600px] overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Slides */}
            <div className="relative w-full h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {banners.map((banner, index) => (
                    <div 
                        key={banner.id} 
                        className="absolute top-0 left-0 w-full h-full"
                        style={{ transform: `translateX(${index * 100}%)` }}
                    >
                        <Image
                            src={banner.image}
                            alt={banner.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                            <h1 className="text-5xl font-bold mb-4">{banner.title}</h1>
                            <p className="text-xl mb-8">{banner.description}</p>
                            <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
                                {banner.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
                aria-label="Previous slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
                aria-label="Next slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            currentSlide === index ? 'bg-white scale-110' : 'bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;