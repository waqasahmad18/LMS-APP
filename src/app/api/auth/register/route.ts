import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'thisIsASecretKey123';

export async function POST(req: NextRequest) {
  const { name, email, password, role } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db();
  const existing = await db.collection('users').findOne({ email });
  if (existing) {
    return NextResponse.json({ error: 'Email already registered.' }, { status: 400 });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = {
    name,
    email,
    password: hashed,
    role: role || 'student',
    createdAt: new Date(),
  };
  const result = await db.collection('users').insertOne(user);
  const token = jwt.sign({ userId: result.insertedId, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  return NextResponse.json({ token, user: { ...user, _id: result.insertedId, password: undefined } });
} 