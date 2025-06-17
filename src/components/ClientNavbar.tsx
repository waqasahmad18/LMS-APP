"use client";
import Navbar from "./Navbar";
import { useAuth } from "./AuthContext";

export default function ClientNavbar() {
  const { user } = useAuth();
  return <div key={user ? user._id : "guest"}><Navbar /></div>;
} 