"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminOrders from "@/components/admin/AdminOrders";

export default function AdminOrdersPage() {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-8 bg-gray-50">
                <AdminOrders />
            </main>
        </div>
    );
}