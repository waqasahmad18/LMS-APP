import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const courses = await db.collection('courses').find({}).toArray();
  return NextResponse.json(courses);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, description, image, createdBy } = body;
  if (!title || !description) {
    return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection('courses').insertOne({
    title,
    description,
    image: image || '',
    createdBy: createdBy || null,
    createdAt: new Date(),
  });
  return NextResponse.json({ insertedId: result.insertedId });
} 