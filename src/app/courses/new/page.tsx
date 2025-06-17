"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// IMPORTANT: Make sure this preset is set to 'unsigned' in your Cloudinary dashboard
const CLOUDINARY_UPLOAD_PRESET = "unsigned_lms_upload"; // Change this to your unsigned preset name
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export default function AddCourse() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setForm((prev) => ({ ...prev, image: data.secure_url }));
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/courses");
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">Add New Course</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Course Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {uploading && <div className="text-blue-600 mt-2">Uploading image...</div>}
          {form.image && (
            <img src={form.image} alt="Course" className="mt-4 w-full max-w-xs rounded shadow" />
          )}
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          disabled={loading || uploading}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Adding..." : "Add Course"}
        </button>
      </form>
    </div>
  );
} 