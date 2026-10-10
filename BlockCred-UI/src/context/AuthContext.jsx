import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from storage on app load
  useEffect(() => {
    try {
      const storedToken =
        localStorage.getItem("token") || sessionStorage.getItem("token") ||
        localStorage.getItem("studentToken") || sessionStorage.getItem("studentToken");

      const storedUser =
        localStorage.getItem("user") || sessionStorage.getItem("user") ||
        localStorage.getItem("student") || sessionStorage.getItem("student");

      const storedRole =
        localStorage.getItem("role") || sessionStorage.getItem("role");

      if (storedToken && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        setRole(storedRole || parsedUser.role || "student");
      }
    } catch (error) {
      console.error("Failed to restore authentication session:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login handler
  const login = (authToken, authUser, rememberMe = true) => {
    const userRole = authUser.role || "student";
    setToken(authToken);
    setUser(authUser);
    setRole(userRole);

    const storage = rememberMe ? localStorage : sessionStorage;
    const secondaryStorage = rememberMe ? sessionStorage : localStorage;

    // Clear conflicting keys from secondary storage
    secondaryStorage.removeItem("token");
    secondaryStorage.removeItem("user");
    secondaryStorage.removeItem("role");
    secondaryStorage.removeItem("studentToken");
    secondaryStorage.removeItem("student");

    // Set into target storage
    storage.setItem("token", authToken);
    storage.setItem("user", JSON.stringify(authUser));
    storage.setItem("role", userRole);

    // Keep backwards compatibility with existing keys
    if (userRole === "student") {
      storage.setItem("studentToken", authToken);
      storage.setItem("student", JSON.stringify(authUser));
    }
  };

  // Logout handler
  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("studentToken");
    localStorage.removeItem("student");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("studentToken");
    sessionStorage.removeItem("student");
  };

  // Update user in state & storage
  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const merged = { ...prev, ...updatedFields };
      if (localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(merged));
      }
      if (sessionStorage.getItem("user")) {
        sessionStorage.setItem("user", JSON.stringify(merged));
      }
      if (localStorage.getItem("student")) {
        localStorage.setItem("student", JSON.stringify(merged));
      }
      if (sessionStorage.getItem("student")) {
        sessionStorage.setItem("student", JSON.stringify(merged));
      }
      return merged;
    });
  };

  const value = {
    user,
    token,
    role,
    loading,
    isAuthenticated: !!token && !!user,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
