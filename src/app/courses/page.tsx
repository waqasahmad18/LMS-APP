"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Course {
  _id: string;
  title: string;
  description: string;
  image?: string;
  createdBy?: string;
  createdAt?: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      });
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pb-16">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-700 to-blue-500 py-16 mb-12 shadow">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Explore Our Courses</h1>
          <p className="text-lg text-blue-100 mb-8">Browse, search, and enroll in high-quality courses designed by expert instructors.</p>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md px-6 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-blue-900">All Courses</h2>
          <Link
            href="/courses/new"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            + Add Course
          </Link>
        </div>
        {loading ? (
          <div className="text-center text-blue-600 text-lg">Loading...</div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center text-gray-500">No courses found.</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-transform group border border-blue-100"
              >
                <div className="relative">
                  {course.image && course.image.trim() !== "" ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <img
                      src="/4 (2).jpg"
                      alt="Default Course"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">New</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-blue-800 mb-1 truncate">{course.title}</h3>
                  <p className="text-gray-600 flex-1 mb-3 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">By Instructor</span>
                    <span className="text-xs text-gray-400">{course.createdAt ? new Date(course.createdAt).toLocaleDateString() : ""}</span>
                  </div>
                  <Link
                    href={`/courses/${course._id}`}
                    className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 