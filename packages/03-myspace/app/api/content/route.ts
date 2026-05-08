import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { posts } from '@/lib/data';

export async function GET() {
  const session = await getServerSession();

  console.log('Session:', session);

  return NextResponse.json(posts);
}