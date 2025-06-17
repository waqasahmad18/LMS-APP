import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  const courseId = req.nextUrl.searchParams.get('courseId');
  const client = await clientPromise;
  const db = client.db();
  let filter = {};
  if (courseId) filter = { courseId };
  const lessons = await db.collection('lessons').find(filter).toArray();
  return NextResponse.json(lessons);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, content, courseId } = body;
  if (!title || !content || !courseId) {
    return NextResponse.json({ error: 'Title, content, and courseId are required.' }, { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection('lessons').insertOne({
    title,
    content,
    courseId,
    createdAt: new Date(),
  });
  return NextResponse.json({ insertedId: result.insertedId });
} 