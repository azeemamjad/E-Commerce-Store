"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminMessages from "@/components/admin/AdminMessages";

export default function AdminMessagesPage() {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-8 bg-gray-50">
                <AdminMessages />
            </main>
        </div>
    );
}