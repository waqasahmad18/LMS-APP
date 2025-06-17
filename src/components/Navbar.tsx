import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-blue-700 tracking-tight">LMS<span className="text-blue-400">Pro</span></span>
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/courses" className="text-gray-700 hover:text-blue-600 font-medium transition">Courses</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">Contact</Link>
          </div>
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="px-4 py-2 rounded-md text-blue-600 border border-blue-600 hover:bg-blue-50 font-semibold transition">Login</Link>
            <Link href="/register" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-semibold transition">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 