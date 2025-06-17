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

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
        console.log("Fetched courses:", data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-blue-900">All Courses</h2>
          <Link
            href="/courses/new"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            + Add Course
          </Link>
        </div>
        {loading ? (
          <div className="text-center text-blue-600 text-lg">Loading...</div>
        ) : courses.length === 0 ? (
          <div className="text-center text-gray-500">No courses found.</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform"
              >
                {course.image && course.image.trim() !== "" ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-blue-100 flex items-center justify-center text-blue-400 text-5xl font-bold">
                    <span>{course.title[0]}</span>
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">{course.title}</h3>
                  <p className="text-gray-600 flex-1">{course.description}</p>
                  <Link
                    href={`/courses/${course._id}`}
                    className="mt-4 inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 font-semibold transition"
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