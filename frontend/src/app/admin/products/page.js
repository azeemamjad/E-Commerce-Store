"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminProducts from "@/components/admin/AdminProducts";

export default function AdminProductsPage() {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-8 bg-gray-50">
                <AdminProducts />
            </main>
        </div>
    );
}