import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Section */}
      <section className="w-full max-w-5xl text-center py-20">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-900 mb-6 leading-tight">
          Unlock Your Potential with <span className="text-blue-600">LMSPro</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">
          Modern Learning Management System for Students & Teachers. <br />
          Manage courses, track progress, and achieve your goals with ease.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/register" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg shadow hover:bg-blue-700 transition">Get Started</Link>
          <Link href="/courses" className="px-8 py-3 bg-white border border-blue-600 text-blue-700 rounded-lg font-semibold text-lg shadow hover:bg-blue-50 transition">Browse Courses</Link>
        </div>
        <img src="/public/hero-illustration.svg" alt="LMS Hero" className="mx-auto w-full max-w-md rounded-xl shadow-lg" />
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20l9-5-9-5-9 5 9 5z" /><path d="M12 12V4l9 5-9 5-9-5 9-5z" /></svg>
          </div>
          <h3 className="font-bold text-lg mb-2">Easy Course Management</h3>
          <p className="text-gray-600 text-center">Create, edit, and manage courses with a user-friendly interface for teachers and admins.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" /></svg>
          </div>
          <h3 className="font-bold text-lg mb-2">Progress Tracking</h3>
          <p className="text-gray-600 text-center">Students can track their learning journey and achievements in real-time.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2h5" /><circle cx="12" cy="7" r="4" /></svg>
          </div>
          <h3 className="font-bold text-lg mb-2">Community & Support</h3>
          <p className="text-gray-600 text-center">Engage with peers and instructors, get help, and grow together in a supportive environment.</p>
        </div>
      </section>
    </div>
  );
}
