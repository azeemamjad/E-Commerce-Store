"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchCategoryDetail, updateCategory, deleteCategory } from "@/api/products";

const AdminCategoryDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const { id } = params;
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editing, setEditing] = useState(false);
    const [editForm, setEditForm] = useState({ name: "", title: "", description: "", image: undefined });
    const [editError, setEditError] = useState("");
    const [saving, setSaving] = useState(false);

    // Fetch category details
    const loadCategory = async () => {
        setLoading(true);
        setError("");
        try {
            const cat = await fetchCategoryDetail(id);
            setCategory(cat);
            setEditForm({ name: cat.name, title: cat.title, description: cat.description, image: undefined });
        } catch {
            setError("Failed to load category details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) loadCategory();
        // eslint-disable-next-line
    }, [id]);

    const handleEditChange = e => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setEditForm({ ...editForm, image: files[0] });
        } else {
            setEditForm({ ...editForm, [name]: value });
        }
    };

    const handleEditSubmit = async e => {
        e.preventDefault();
        setEditError("");
        setSaving(true);
        try {
            // Only send image if a new one is selected
            const payload = { ...editForm };
            if (!editForm.image) delete payload.image;
            await updateCategory(id, payload);
            setEditing(false);
            await loadCategory(); // Fetch updated data
        } catch (err) {
            setEditError(err.message || "Failed to update category");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        try {
            await deleteCategory(id);
            router.push("/admin/categories");
        } catch (err) {
            setEditError(err.message || "Failed to delete category");
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
    if (!category) return <div className="p-8 text-center text-gray-500">Category not found.</div>;

    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">
            <h1 className="text-3xl font-bold mb-4 text-blue-700">{category.name}</h1>
            <div className="mb-2 text-lg"><strong>Title:</strong> {category.title}</div>
            <img src={category.image} alt={category.name} className="w-40 h-40 object-cover rounded-lg border mb-4" />
            <div className="mb-2"><strong>Description:</strong> {category.description}</div>
            <div className="mb-2"><strong>Items:</strong> {category.itemCount}</div>
            <div className="flex gap-4 mt-6">
                <button
                    className={`px-5 py-2 rounded-lg font-semibold transition-colors ${editing ? "bg-gray-300 text-gray-700 hover:bg-gray-400" : "bg-blue-700 text-white hover:bg-blue-800"}`}
                    onClick={() => setEditing(!editing)}
                >
                    {editing ? "Cancel" : "Edit"}
                </button>
                <button
                    className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
            {editing && (
                <form onSubmit={handleEditSubmit} className="mt-8 bg-blue-50 p-6 rounded-lg space-y-4 shadow-inner">
                    <div>
                        <label className="block font-semibold mb-1">Category Name</label>
                        <input
                            type="text"
                            name="name"
                            value={editForm.name}
                            onChange={handleEditChange}
                            placeholder="Category Name"
                            required
                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={editForm.title}
                            onChange={handleEditChange}
                            placeholder="Title"
                            required
                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={editForm.description}
                            onChange={handleEditChange}
                            placeholder="Description"
                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Change Picture</label>
                        <label className="flex items-center gap-3 cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-semibold transition-colors w-fit">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                            </svg>
                            {editForm.image ? editForm.image.name : "Choose Image"}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleEditChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                    {editError && <div className="text-red-600">{editError}</div>}
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default AdminCategoryDetailPage;