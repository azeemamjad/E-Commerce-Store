"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/admin/messages", label: "Messages" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/reviews", label: "Reviews" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/categories", label: "Categories" }
];

const AdminSidebar = () => {
    const pathname = usePathname();
    return (
        <aside className="w-56 bg-blue-50 min-h-screen p-6">
            <h2 className="text-xl font-bold mb-8 text-blue-700">Admin Panel</h2>
            <nav className="flex flex-col gap-4">
                {links.map(link => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            pathname === link.href
                                ? "bg-blue-700 text-white"
                                : "text-blue-700 hover:bg-blue-100"
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default AdminSidebar;