"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminCategories from "@/components/admin/AdminCategories";

export default function AdminCategoriesPage() {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-8 bg-gray-50">
                <AdminCategories />
            </main>
        </div>
    );
}