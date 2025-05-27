const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Register a new user
export async function register({ email, username, password, full_name, profile_pic }) {
    let body;
    let headers = {};

    if (profile_pic) {
        // Use FormData if profile_pic is present
        body = new FormData();
        body.append("email", email);
        body.append("username", username);
        body.append("password", password);
        body.append("full_name", full_name);
        body.append("profile_pic", profile_pic);
        // Do not set Content-Type, browser will set it for FormData
    } else {
        // Use JSON if no profile_pic
        body = JSON.stringify({ email, username, password, full_name });
        headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${API_BASE}/register/`, {
        method: "POST",
        headers,
        body
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Registration failed");
    }
    return await res.json();
}

// Login user (using JWT, for example)
export async function login({ identifier, password }) {
    // identifier can be email or username
    const res = await fetch(`${API_BASE}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password })
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json(); // { access, refresh }
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    window.dispatchEvent(new Event("authChanged")); // <--- Add this line
    return data;
}

// Get current user info (requires JWT token)
export async function getMe(token) {
    const res = await fetch(`${API_BASE}/me/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error("Failed to fetch user");
    return await res.json();
}

// Refresh access token using refresh token
export async function refreshToken(refresh) {
    const res = await fetch(`${API_BASE}/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh })
    });
    if (!res.ok) throw new Error("Refresh failed");
    return await res.json(); // { access }
}

// Get new refresh token (if refresh expired)
export async function getNewRefreshToken({ identifier, password }) {
    // Same as login, backend should return new refresh token
    return await login({ identifier, password });
}

// Get session id from localStorage
export function getSessionId() {
    return localStorage.getItem("session_id");
}

// Helper to get auth headers for API requests
export function getAuthHeaders() {
    const token = localStorage.getItem("access_token");
    const sessionId = localStorage.getItem("session_id");
    const headers = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    if (sessionId) headers["X-Session-Id"] = sessionId;
    return headers;
}

// Logout user (remove tokens)
export function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.dispatchEvent(new Event("authChanged")); // <--- Add this line
}

// Change user password
export async function changePassword({ old_password, new_password }) {
    const token = localStorage.getItem("access_token");
    const res = await fetch(`${API_BASE}/change-password/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ old_password, new_password })
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Password change failed");
    }
    return await res.json();
}

// Edit user profile
export async function editUser({ full_name, username, email, profile_pic }) {
    const token = localStorage.getItem("access_token");
    let body;
    let headers = {
        "Authorization": `Bearer ${token}`
    };

    // If profile_pic is present, use FormData
    if (profile_pic) {
        body = new FormData();
        if (full_name) body.append("full_name", full_name);
        if (username) body.append("username", username);
        if (email) body.append("email", email);
        body.append("profile_pic", profile_pic);
        // Do not set Content-Type, browser will set it for FormData
    } else {
        body = JSON.stringify({ full_name, username, email });
        headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${API_BASE}/edit/`, {
        method: "PUT",
        headers,
        body
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Profile update failed");
    }
    return await res.json();
}