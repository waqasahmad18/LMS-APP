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

interface LessonForm {
  title: string;
  content: string;
  pdfUrl: string;
  [key: string]: string; // Allow dynamic property assignment
}

export default function CourseDetail() {
  const params = useParams();
  const courseId = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [formList, setFormList] = useState<LessonForm[]>([
    { title: "", content: "", pdfUrl: "" },
  ]);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showAddLesson, setShowAddLesson] = useState(false);

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

  const handleFormChange = (idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newFormList = [...formList];
    newFormList[idx][e.target.name] = e.target.value;
    setFormList(newFormList);
  };

  const handlePdfChange = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    const newFormList = [...formList];
    newFormList[idx].pdfUrl = data.secure_url;
    setFormList(newFormList);
    setUploading(false);
  };

  const handleAddLessonField = () => {
    setFormList([...formList, { title: "", content: "", pdfUrl: "" }]);
  };

  const handleRemoveLessonField = (idx: number) => {
    if (formList.length === 1) return;
    setFormList(formList.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLessonLoading(true);
    setError("");
    for (const form of formList) {
      if (!form.title || !form.content) continue;
      await fetch("/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, courseId }),
      });
    }
    setFormList([{ title: "", content: "", pdfUrl: "" }]);
    // Refresh lessons
    const lessonsRes = await fetch(`/api/lessons?courseId=${courseId}`);
    setLessons(await lessonsRes.json());
    setLessonLoading(false);
    setShowAddLesson(false);
  };

  if (loading) return <div className="text-center py-12 text-blue-600">Loading...</div>;
  if (!course) return <div className="text-center py-12 text-red-600">Course not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar Lessons List */}
        <aside className="md:w-1/3 w-full bg-white rounded-2xl shadow p-6 mb-8 md:mb-0">
          <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center justify-between">
            Lessons <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">{lessons.length}</span>
          </h2>
          {lessons.length === 0 ? (
            <div className="text-gray-500">No lessons yet.</div>
          ) : (
            <ul className="space-y-4">
              {lessons.map((lesson, idx) => (
                <li key={lesson._id} className="bg-blue-50 rounded-lg p-4 shadow flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-blue-900">{lesson.title}</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-1 line-clamp-2">{lesson.content}</p>
                  {lesson.pdfUrl && (
                    <a
                      href={lesson.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs transition"
                    >
                      View PDF
                    </a>
                  )}
                  <span className="text-xs text-gray-400 mt-1">{lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : ""}</span>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Main Course Content */}
        <main className="md:w-2/3 w-full">
          <div className="bg-white rounded-2xl shadow p-8 mb-8">
            {course.image && (
              <img src={course.image} alt={course.title} className="w-full max-h-64 object-cover rounded-xl mb-6" />
            )}
            <h1 className="text-3xl font-extrabold text-blue-900 mb-2">{course.title}</h1>
            <p className="text-gray-700 mb-4 text-lg">{course.description}</p>
            <button
              onClick={() => setShowAddLesson((v) => !v)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition mt-4"
            >
              {showAddLesson ? "Close Lesson Form" : "+ Add Lessons"}
            </button>
          </div>

          {/* Add Multiple Lessons Form */}
          {showAddLesson && (
            <div className="bg-white rounded-2xl shadow p-8 mb-8">
              <h2 className="text-xl font-semibold text-blue-700 mb-4">Add Lessons</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {formList.map((form, idx) => (
                  <div key={idx} className="border-b border-blue-100 pb-6 mb-6 last:border-b-0 last:mb-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-blue-700">Lesson {idx + 1}</span>
                      {formList.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveLessonField(idx)}
                          className="text-red-500 text-xs hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="block text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={(e) => handleFormChange(idx, e)}
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-gray-700 mb-1">Content</label>
                      <textarea
                        name="content"
                        value={form.content}
                        onChange={(e) => handleFormChange(idx, e)}
                        required
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Attach PDF (optional)</label>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handlePdfChange(idx, e)}
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
                  </div>
                ))}
                {error && <div className="text-red-600">{error}</div>}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleAddLessonField}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 font-semibold"
                  >
                    + Add Another Lesson
                  </button>
                  <button
                    type="submit"
                    disabled={lessonLoading || uploading}
                    className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
                  >
                    {lessonLoading ? "Adding..." : "Save Lessons"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 