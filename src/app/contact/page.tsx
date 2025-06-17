'use client';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Yahan backend integration ya email service connect kar sakte hain
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-8">Agar aapko koi sawal hai ya feedback dena hai, neeche form fill karein. Hum jald reply karenge!</p>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition">Send Message</button>
        {submitted && <p className="text-green-600 mt-4">Shukriya! Aapka message mil gaya hai.</p>}
      </form>
    </div>
  );
} 