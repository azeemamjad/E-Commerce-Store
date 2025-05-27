// import { headers } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Fetch all categories
export async function fetchCategories() {
    const res = await fetch(`${API_BASE}/categories/`);
    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }
    return await res.json();
}

// Fetch category details by ID
export async function fetchCategoryDetail(id) {
    const res = await fetch(`${API_BASE}/categories/${id}/`);
    if (!res.ok) {
        throw new Error("Failed to fetch category details");
    }
    return await res.json();
}

// Add a new category
export async function addCategory(data) {
    const token = localStorage.getItem("access_token");
    let body, headers = { "Authorization": `Bearer ${token}` };

    if (data.image) {
        body = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") body.append(key, value);
        });
        // Do not set Content-Type for FormData
    } else {
        // Remove image if not present
        const { image, ...rest } = data;
        body = JSON.stringify(rest);
        headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${API_BASE}/categories/add/`, {
        method: "POST",
        headers,
        body
    });
    if (!res.ok) throw new Error("Failed to add category");
    return await res.json();
}

// Update a category
export async function updateCategory(id, data) {
    const token = localStorage.getItem("access_token");
    let body, headers = { "Authorization": `Bearer ${token}` };

    if (data.image) {
        body = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === "image" && !value) return; // Don't append empty image
            if (value !== undefined && value !== null && value !== "") body.append(key, value);
        });
        // Do not set Content-Type for FormData
    } else {
        // Remove image if not present
        const { image, ...rest } = data;
        body = JSON.stringify(rest);
        headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${API_BASE}/categories/${id}/update/`, {
        method: "PUT",
        headers,
        body
    });
    if (!res.ok) throw new Error("Failed to update category");
    return await res.json();
}

// Delete a category
export async function deleteCategory(id) {
    const token = localStorage.getItem("access_token");
    const res = await fetch(`${API_BASE}/categories/${id}/delete/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to delete category");
    return true;
}

// Fetch paginated products list
export async function fetchProducts(page = 1) {
    const res = await fetch(`${API_BASE}/products/?page=${page}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
}

// Fetch product detail by ID
export async function fetchProductDetail(id) {
    const res = await fetch(`${API_BASE}/products/${id}/`);
    if (!res.ok) throw new Error("Failed to fetch product detail");
    return await res.json();
}

// Create product
export async function createProduct(productData) {
    token = localStorage.getItem("access_token");
    const formData = new FormData();

    // Basic fields
    formData.append("title", productData.title);
    formData.append("price", productData.price);
    formData.append("description", productData.description || "");
    formData.append("rating", productData.rating || 0);
    formData.append("item_count", productData.item_count || 0);
    formData.append("productcount", productData.productcount || 0);

    // Many-to-many fields (send multiple values)
    if (Array.isArray(productData.categories)) {
        productData.categories.forEach(catId => formData.append("categories", catId));
    }

    if (Array.isArray(productData.related_products)) {
        productData.related_products.forEach(relId => formData.append("related_products", relId));
    }

    // Images
    if (productData.images && productData.images.length > 0) {
        Array.from(productData.images).forEach(img => {
            formData.append("images", img);
        });
    }

    // Send request
    const res = await fetch("/api/products/add/", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to create product");
    }

    return await res.json();
}



export async function updateProduct(id, data) {
    const token = localStorage.getItem("access_token");
    const headers = {
        Authorization: `Bearer ${token}`
        // NOTE: Do NOT manually set Content-Type if using FormData.
    };

    const body = new FormData();

    // Handle scalar fields
    if (data.title) body.append("title", data.title);
    if (data.price !== undefined) body.append("price", data.price);
    if (data.description) body.append("description", data.description);
    if (data.rating !== undefined) body.append("rating", data.rating);
    if (data.item_count !== undefined) body.append("item_count", data.item_count);
    if (data.productcount !== undefined) body.append("productcount", data.productcount);

    // Handle categories (ManyToMany)
    if (Array.isArray(data.categories)) {
        data.categories.forEach(catId => body.append("categories", catId));
    }

    // Handle related_products (ManyToMany)
    if (Array.isArray(data.related_products)) {
        data.related_products.forEach(prodId => body.append("related_products", prodId));
    }

    // Handle images (can be empty or multiple)
    if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach(img => {
            body.append("images", img);
        });
    }

    const res = await fetch(`/api/products/${id}/update/`, {
        method: "PUT",
        headers,
        body
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to update product");
    }

    return await res.json();
}


// Delete a product
export async function deleteProduct(id) {
    const token = localStorage.getItem("access_token");
    const res = await fetch(`${API_BASE}/products/${id}/delete/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to delete product");
    return true;
}