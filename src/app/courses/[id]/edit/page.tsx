"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const CLOUDINARY_UPLOAD_PRESET = "unsigned_lms_upload";
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export default function EditCourse() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  const [form, setForm] = useState({ title: "", description: "", image: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchCourse() {
      setLoading(true);
      const res = await fetch("/api/courses");
      const data = await res.json();
      const found = data.find((c: any) => c._id === courseId);
      if (found) {
        setForm({
          title: found.title || "",
          description: found.description || "",
          image: found.image || "",
        });
      }
      setLoading(false);
    }
    if (courseId) fetchCourse();
  }, [courseId]);

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
    setSaving(true);
    setError("");
    setSuccess("");
    const res = await fetch(`/api/courses/${courseId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setSuccess("Course updated successfully!");
      setTimeout(() => router.push(`/courses/${courseId}`), 1200);
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
    }
    setSaving(false);
  };

  if (loading) return <div className="text-center py-12 text-blue-600">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">Edit Course</h1>
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
        {success && <div className="text-green-600">{success}</div>}
        <button
          type="submit"
          disabled={saving || uploading}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          {saving ? "Saving..." : "Update Course"}
        </button>
      </form>
    </div>
  );
} 