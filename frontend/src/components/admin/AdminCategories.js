"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchCategories, addCategory } from "@/api/products";

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showAdd, setShowAdd] = useState(false);
    const [addForm, setAddForm] = useState({ name: "", title: "", description: "", image: null });
    const [addError, setAddError] = useState("");

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        setLoading(true);
        fetchCategories()
            .then(setCategories)
            .catch(() => setError("Failed to load categories"))
            .finally(() => setLoading(false));
    };

    const handleAddChange = e => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setAddForm({ ...addForm, image: files[0] });
        } else {
            setAddForm({ ...addForm, [name]: value });
        }
    };

    const handleAddSubmit = async e => {
        e.preventDefault();
        setAddError("");
        try {
            await addCategory(addForm);
            setShowAdd(false);
            setAddForm({ name: "", title: "", description: "", image: null });
            loadCategories();
        } catch (err) {
            setAddError(err.message || "Failed to add category");
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Categories</h1>
            <div className="mb-4">
                <button
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                    onClick={() => setShowAdd(!showAdd)}
                >
                    {showAdd ? "Cancel" : "Add Category"}
                </button>
            </div>
            {showAdd && (
                <form onSubmit={handleAddSubmit} className="mb-6 bg-blue-50 p-4 rounded-lg space-y-3">
                    <input
                        type="text"
                        name="name"
                        value={addForm.name}
                        onChange={handleAddChange}
                        placeholder="Category Name"
                        required
                        className="w-full px-3 py-2 border border-blue-200 rounded"
                    />
                    <input
                        type="text"
                        name="title"
                        value={addForm.title}
                        onChange={handleAddChange}
                        placeholder="Title"
                        required
                        className="w-full px-3 py-2 border border-blue-200 rounded"
                    />
                    <input
                        type="text"
                        name="description"
                        value={addForm.description}
                        onChange={handleAddChange}
                        placeholder="Description"
                        className="w-full px-3 py-2 border border-blue-200 rounded"
                    />
                    <label className="block">
                        <span className="font-semibold">Add Picture:</span>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleAddChange}
                            className="block mt-1"
                        />
                    </label>
                    {addError && <div className="text-red-600">{addError}</div>}
                    <button
                        type="submit"
                        className="bg-blue-700 text-white px-4 py-2 rounded font-semibold hover:bg-blue-800"
                    >
                        Add
                    </button>
                </form>
            )}
            <div className="bg-white rounded-xl shadow p-8">
                {loading && <div>Loading...</div>}
                {error && <div className="text-red-600">{error}</div>}
                {!loading && !error && categories.length === 0 && <div>No categories yet.</div>}
                {!loading && !error && categories.length > 0 && (
                    <ul className="space-y-4">
                        {categories.map(cat => (
                            <li key={cat.id} className="flex items-center gap-4">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-16 h-16 object-cover rounded border"
                                />
                                <div>
                                    <div className="font-bold">{cat.name}</div>
                                    <div className="text-gray-500 text-sm">{cat.title}</div>
                                    <div className="text-gray-500 text-sm">{cat.description}</div>
                                    <div className="text-xs text-gray-400">Items: {cat.itemCount}</div>
                                    <Link
                                        href={`/admin/categories/${cat.id}`}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        Details
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AdminCategories;