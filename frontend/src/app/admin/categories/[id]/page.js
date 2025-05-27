"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminCategoryDetailPage from "@/components/admin/AdminCategoryDetailPage";

export default function AdminCategoryDetail() {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-8 bg-gray-50">
                <AdminCategoryDetailPage />
            </main>
        </div>
    );
}