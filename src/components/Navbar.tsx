"use client";
import Link from 'next/link';
import { AuthProvider, useAuth } from './AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function NavbarContent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center relative">
        {/* Hamburger for mobile */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-label="Open main menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {/* Logo left (desktop), center (mobile) */}
        <div className="flex-1 flex items-center md:justify-start justify-center">
          <Link href="/">
            <span className="text-2xl font-bold text-blue-700 tracking-tight">LMS<span className="text-blue-400">Pro</span></span>
          </Link>
        </div>
        {/* Nav menu center (desktop only, absolutely centered) */}
        <div className="hidden md:flex absolute left-1/2 top-0 h-full -translate-x-1/2 items-center space-x-8">
          <Link href="/courses" className="text-gray-700 hover:text-blue-600 font-medium transition">Courses</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">Contact</Link>
        </div>
        {/* Auth Buttons or User Info right */}
        <div className="flex items-center space-x-4 absolute right-0 top-0 h-full pr-2">
          {/* Desktop buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="hidden sm:inline text-blue-700 font-semibold">{user.name} ({user.role})</span>
                <button
                  onClick={() => { logout(); router.push('/'); }}
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 font-semibold transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 rounded-md text-blue-600 border border-blue-600 hover:bg-blue-50 font-semibold transition">Login</Link>
                <Link href="/register" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-semibold transition">Register</Link>
              </>
            )}
          </div>
          {/* Mobile: single user icon with dropdown */}
          <div className="md:hidden relative">
            <button
              onClick={() => setAuthMenuOpen((v) => !v)}
              className="p-2 rounded-full text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="User menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            {authMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-50">
                {user ? (
                  <>
                    <span className="block px-4 py-2 text-blue-700 font-semibold">{user.name} ({user.role})</span>
                    <button
                      onClick={() => { logout(); setAuthMenuOpen(false); router.push('/'); }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-4 py-2 text-blue-600 hover:bg-blue-50" onClick={() => setAuthMenuOpen(false)}>Login</Link>
                    <Link href="/register" className="block px-4 py-2 text-blue-600 hover:bg-blue-50" onClick={() => setAuthMenuOpen(false)}>Register</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Nav Links: Mobile Drawer */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 md:hidden" onClick={() => setMenuOpen(false)}>
            <div
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg flex flex-col pt-16 px-6 gap-6"
              onClick={e => e.stopPropagation()}
            >
              <Link href="/courses" className="text-gray-700 hover:text-blue-600 font-medium transition" onClick={() => setMenuOpen(false)}>Courses</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition" onClick={() => setMenuOpen(false)}>About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition" onClick={() => setMenuOpen(false)}>Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default function Navbar() {
  return (
    <AuthProvider>
      <NavbarContent />
    </AuthProvider>
  );
} 