"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const CLOUDINARY_UPLOAD_PRESET = "unsigned_lms_upload"; // Make sure this is unsigned in Cloudinary
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

interface Course {
  _id: string;
  title: string;
  description: string;
  image?: string;
}
interface Lesson {
  _id: string;
  title: string;
  content: string;
  courseId: string;
  pdfUrl?: string;
  createdAt?: string;
}

export default function CourseDetail() {
  const params = useParams();
  const courseId = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", content: "", pdfUrl: "" });
  const [lessonLoading, setLessonLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch("/api/courses");
      const allCourses = await res.json();
      const found = allCourses.find((c: Course) => c._id === courseId);
      setCourse(found || null);
      const lessonsRes = await fetch(`/api/lessons?courseId=${courseId}`);
      setLessons(await lessonsRes.json());
      setLoading(false);
    }
    fetchData();
  }, [courseId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePdfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    // For PDF, use resource_type: 'raw'
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setForm((prev) => ({ ...prev, pdfUrl: data.secure_url }));
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLessonLoading(true);
    setError("");
    const res = await fetch("/api/lessons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, courseId }),
    });
    if (res.ok) {
      setForm({ title: "", content: "", pdfUrl: "" });
      // Refresh lessons
      const lessonsRes = await fetch(`/api/lessons?courseId=${courseId}`);
      setLessons(await lessonsRes.json());
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
    }
    setLessonLoading(false);
  };

  if (loading) return <div className="text-center py-12 text-blue-600">Loading...</div>;
  if (!course) return <div className="text-center py-12 text-red-600">Course not found.</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-xl shadow p-8 mb-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">{course.title}</h1>
        <p className="text-gray-700 mb-4">{course.description}</p>
        {course.image && (
          <img src={course.image} alt={course.title} className="w-full max-w-md rounded-lg shadow mb-4" />
        )}
      </div>
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Lessons</h2>
        {lessons.length === 0 ? (
          <div className="text-gray-500">No lessons yet.</div>
        ) : (
          <ul className="space-y-4">
            {lessons.map((lesson) => (
              <li key={lesson._id} className="bg-blue-50 rounded p-4 shadow">
                <h3 className="font-bold text-blue-800">{lesson.title}</h3>
                <p className="text-gray-700">{lesson.content}</p>
                {lesson.pdfUrl && (
                  <a
                    href={lesson.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    View PDF
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="bg-white rounded-xl shadow p-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Add Lesson</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-gray-700 mb-2">Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Attach PDF (optional)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {uploading && <div className="text-blue-600 mt-2">Uploading PDF...</div>}
            {form.pdfUrl && (
              <a
                href={form.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
              >
                Preview Uploaded PDF
              </a>
            )}
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <button
            type="submit"
            disabled={lessonLoading || uploading}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            {lessonLoading ? "Adding..." : "Add Lesson"}
          </button>
        </form>
      </div>
    </div>
  );
} 