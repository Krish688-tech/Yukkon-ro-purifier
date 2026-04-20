import { createContext, useState, useEffect } from "react";
import { API_URL } from "../../data/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ Load user from localStorage (with fix)
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (storedUser && token) {
        setUser({
          ...storedUser,
          _id: storedUser._id || storedUser.id, // 🔥 normalize
        });
      }
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser(token);
    }
  }, []);

  // ✅ LOGIN
const loginUser = async (email, password, navigate) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    console.log("LOGIN RESPONSE:", data);

    if (!res.ok) {
      return { success: false, msg: data.msg };
    }

    // ✅ Normalize user
    const normalizedUser = {
      ...data,
      email: data.email.toLowerCase().trim(),
      name: data.name.trim(),
      _id: data.id,
    };

    // ✅ Save FIRST
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(normalizedUser));

    setUser(normalizedUser);


    // ✅ THEN navigate
    if (data.role === "admin") {
      navigate("/admin/enquiries");
    } else {
      navigate("/");
    }

    return { success: true };

  } catch (err) {
    console.error(err);
    return { success: false, msg: "Something went wrong" };
  }
};

  // ✅ REGISTER
  const registerUser = async (name, email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, msg: data.msg };
      }

      // ✅ Auto login after register
      return await loginUser(email, password);
    } catch {
      return { success: false, msg: "Something went wrong" };
    }
  };

  // ✅ GOOGLE LOGIN
  const getUser = async (token) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user)); 
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // ✅ Helper: get token anytime
  const getToken = () => {
    return localStorage.getItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loginUser,
        registerUser,
        logout,
        getToken,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
