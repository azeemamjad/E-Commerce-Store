"use client";

import Image from 'next/image';
import Link from 'next/link';

const RelatedProducts = ({ products }) => {
    if (!products?.length) return null;

    return (
        <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-blue-700">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {products.map(rp => (
                    <div
                        key={rp.id}
                        className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 group"
                    >
                        <div className="relative w-36 h-36 mb-4 rounded-xl overflow-hidden shadow">
                            <Image
                                src={rp.images[0]}
                                alt={rp.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="144px"
                            />
                        </div>
                        <h4 className="font-semibold text-lg mb-1 text-center group-hover:text-blue-700 transition-colors">{rp.name}</h4>
                        <p className="text-gray-500 mb-1">{rp.category}</p>
                        <p className="text-blue-700 font-bold mb-2">${rp.price}</p>
                        <Link
                            href={`/product/${rp.id}`}
                            className="text-sm text-white bg-blue-700 px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-800 transition-colors mt-2"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;