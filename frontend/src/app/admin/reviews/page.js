"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminReviews from "@/components/admin/AdminReviews";

export default function AdminReviewsPage() {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-8 bg-gray-50">
                <AdminReviews />
            </main>
        </div>
    );
}