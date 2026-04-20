import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { user, setUser, getToken } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
    avatar: user?.avatar || "",
  });

  const [preview, setPreview] = useState(user?.avatar || "");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🖼️ Image upload
  const handleImage = (e) => {
    const file = e.target.files[0];

    setPreview(URL.createObjectURL(file));

    setForm({
      ...form,
      avatarFile: file, // 🔥 store file (important)
    });
  };

  const handleSave = async () => {
    try {
      const token = getToken();
      const formData = new FormData();
      console.log("TOKEN:", token);

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("address", form.address);
      formData.append("city", form.city);
      formData.append("state", form.state);
      formData.append("pincode", form.pincode);

      if (form.avatarFile) {
        formData.append("avatar", form.avatarFile);
      }

      const res = await fetch(
        "http://localhost:5000/api/users/update-profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // 🔐 secure
          },
          body: formData,
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Update failed");
      }

      const data = await res.json();
      setUser(data);
      await Swal.fire({
        icon: "success",
        title: "Profile Updated 🎉",
        text: "Your profile has been updated successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 to-white flex items-center justify-center p-6">
      <div className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Update Profile</h1>

        {/* Avatar */}
        {/*<div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={preview || "https://via.placeholder.com/100"}
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-purple-400 shadow-md"
            />
          </div>

          <label className="mt-3 cursor-pointer text-sm text-purple-600 font-medium">
            Change Photo
            <input type="file" onChange={handleImage} className="hidden" />
          </label>
        </div>/*}

        {/* Name */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="input mb-3"
        />

        {/* Email */}
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="input mb-3"
        />

        {/* Phone */}
        <div className="flex items-center mb-3 border rounded-xl overflow-hidden">
          <span className="px-4 bg-gray-100 text-gray-700">+91</span>
          <input
            name="phone"
            value={form.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setForm({ ...form, phone: value });
            }}
            className="w-full px-4 py-3 outline-none"
            placeholder="Phone number"
          />
        </div>

        {/* Address */}
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Shipping Address"
          className="input mb-3"
        />

        {/* City + State */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="input"
          />

          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            className="input"
          />
        </div>

        {/* Pincode */}
        <input
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          placeholder="Pincode"
          className="input mb-4"
        />

        <button
          onClick={handleSave}
          className="w-full bg-linear-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-xl shadow-md hover:opacity-90"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
