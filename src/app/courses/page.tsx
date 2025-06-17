'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data for courses
const mockCourses = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the basics of web development including HTML, CSS, and JavaScript.',
    imageUrl: 'https://via.placeholder.com/300x200',
    teacher: 'John Doe',
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    description: 'Deep dive into modern JavaScript concepts and frameworks.',
    imageUrl: 'https://via.placeholder.com/300x200',
    teacher: 'Jane Smith',
  },
  {
    id: '3',
    title: 'React Fundamentals',
    description: 'Master React.js and build modern web applications.',
    imageUrl: 'https://via.placeholder.com/300x200',
    teacher: 'Mike Johnson',
  },
];

export default function Courses() {
  const [courses] = useState(mockCourses);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Available Courses
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Browse through our collection of courses and start learning today
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="relative h-48">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {course.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {course.description}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Instructor: {course.teacher}
                </p>
                <div className="mt-4">
                  <Link
                    href={`/courses/${course.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 