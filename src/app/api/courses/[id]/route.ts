import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) return NextResponse.json({ error: 'Course ID required' }, { status: 400 });
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection('courses').deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 1) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) return NextResponse.json({ error: 'Course ID required' }, { status: 400 });
  const body = await req.json();
  const { title, description, image } = body;
  if (!title || !description) {
    return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection('courses').updateOne(
    { _id: new ObjectId(id) },
    { $set: { title, description, image: image || '' } }
  );
  if (result.matchedCount === 1) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }
}

// (Optional) Add PUT for updating course if needed later 