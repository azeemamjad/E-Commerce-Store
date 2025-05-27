'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ProductDetails from '@/components/ProductDetails';

export default function ProductPage() {
    const params = useParams();
    const { id } = params;

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
            <ProductDetails id={id} />
        </div>
    );
}