"use client";
import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/api/products";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  const [addForm, setAddForm] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    item_count: "",
    productcount: "",
    categories: [],
    related_products: [],
    images: [],
  });

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, setForm) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setForm((prev) => ({ ...prev, images: files }));
    } else if (name === "categories" || name === "related_products") {
      setForm((prev) => ({
        ...prev,
        [name]: value.split(",").map((v) => v.trim()),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(addForm);
      setAddForm({
        title: "",
        description: "",
        price: "",
        rating: "",
        item_count: "",
        productcount: "",
        categories: [],
        related_products: [],
        images: [],
      });
      loadProducts();
    } catch (err) {
      setActionError(err.message || "Failed to add product");
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setEditForm({
      title: product.title,
      description: product.description,
      price: product.price,
      rating: product.rating,
      item_count: product.item_count,
      productcount: product.productcount,
      categories: product.categories || [],
      related_products: product.related_products || [],
      images: [],
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(editId, editForm);
      setEditId(null);
      setEditForm({});
      loadProducts();
    } catch (err) {
      setActionError(err.message || "Failed to update product");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      setActionError("Failed to delete product");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <form
        onSubmit={handleAddSubmit}
        className="mb-6 bg-green-50 p-4 rounded-lg space-y-3"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          value={addForm.title}
          onChange={(e) => handleChange(e, setAddForm)}
          className="w-full px-3 py-2 border border-green-200 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={addForm.description}
          onChange={(e) => handleChange(e, setAddForm)}
          className="w-full px-3 py-2 border border-green-200 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          required
          value={addForm.price}
          onChange={(e) => handleChange(e, setAddForm)}
          className="w-full px-3 py-2 border border-green-200 rounded"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={addForm.rating}
          onChange={(e) => handleChange(e, setAddForm)}
          className="w-full px-3 py-2 border border-green-200 rounded"
        />
        <input
          type="number"
          name="item_count"
          placeholder="Item Count"
          value={addForm.item_count}
          onChange={(e) => handleChange(e, setAddForm)}
          className="w-full px-3 py-2 border border-green-200 rounded"
        />
        <input
          type="number"
          name="productcount"
          placeholder="Product Count"
          value={addForm.productcount}
          onChange={(e) => handleChange(e, setAddForm)}
          className="w-full px-3 py-2 border border-green-200 rounded"
        />
        <input
          type="text"
          name="categories"
          placeholder="Categories (comma-separated IDs)"
          value={addForm.categories}
          onChange={(e) => handleChange(e, setAddForm)}
          className="w-full px-3 py-2 border border-green-200 rounded"
        />
        <input
          type="text"
          name="related_products"
          placeholder="Related Products (comma-separated IDs)"
          value={addForm.related_products}
          onChange={(e) => handleChange(e, setAddForm)}
          className="w-full px-3 py-2 border border-green-200 rounded"
        />
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={(e) => handleChange(e, setAddForm)}
          className="block"
        />
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded font-semibold hover:bg-green-800"
        >
          Add Product
        </button>
      </form>

      {actionError && <div className="text-red-600 mb-2">{actionError}</div>}

      <div className="bg-white rounded-xl shadow p-8">
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && !error && products.length === 0 && <div>No products yet.</div>}
        {!loading && !error && products.length > 0 && (
          <ul className="space-y-6">
            {products.map((product) => (
              <li key={product.id} className="flex gap-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded border"
                />
                <div className="flex-1">
                  {editId === product.id ? (
                    <form onSubmit={handleEditSubmit} className="space-y-2">
                      <input
                        type="text"
                        name="title"
                        value={editForm.title}
                        onChange={(e) => handleChange(e, setEditForm)}
                        className="w-full px-3 py-1 border rounded"
                      />
                      <textarea
                        name="description"
                        value={editForm.description}
                        onChange={(e) => handleChange(e, setEditForm)}
                        className="w-full px-3 py-1 border rounded"
                      />
                      <input
                        type="number"
                        name="price"
                        value={editForm.price}
                        onChange={(e) => handleChange(e, setEditForm)}
                        className="w-full px-3 py-1 border rounded"
                      />
                      <input
                        type="number"
                        name="rating"
                        value={editForm.rating}
                        onChange={(e) => handleChange(e, setEditForm)}
                        className="w-full px-3 py-1 border rounded"
                      />
                      <input
                        type="number"
                        name="item_count"
                        value={editForm.item_count}
                        onChange={(e) => handleChange(e, setEditForm)}
                        className="w-full px-3 py-1 border rounded"
                      />
                      <input
                        type="number"
                        name="productcount"
                        value={editForm.productcount}
                        onChange={(e) => handleChange(e, setEditForm)}
                        className="w-full px-3 py-1 border rounded"
                      />
                      <input
                        type="text"
                        name="categories"
                        value={editForm.categories}
                        onChange={(e) => handleChange(e, setEditForm)}
                        className="w-full px-3 py-1 border rounded"
                      />
                      <input
                        type="text"
                        name="related_products"
                        value={editForm.related_products}
                        onChange={(e) => handleChange(e, setEditForm)}
                        className="w-full px-3 py-1 border rounded"
                      />
                      <input
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleChange(e, setEditForm)}
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditId(null)}
                          className="bg-gray-300 px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="font-bold">{product.title}</div>
                      <div className
::contentReference[oaicite:0]{index=0}
 
<div className="text-sm text-gray-600">
{product.description}
</div>
<div className="text-sm text-gray-800 mt-1">
Price: ${product.price} | Rating: {product.rating}
</div>
<div className="text-sm text-gray-600">
Stock: {product.item_count} | Sold: {product.productcount}
</div>
<div className="flex gap-2 mt-2">
<button
  onClick={() => handleEdit(product)}
  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
>
  Edit
</button>
<button
  onClick={() => handleDelete(product.id)}
  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
>
  Delete
</button>
</div>
</>
)}
</div>
</li>
))}
</ul>
)}
</div>
</div>
);
};

export default AdminProducts;
