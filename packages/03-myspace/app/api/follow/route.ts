import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  const { targetUserId } = await req.json();

  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!);

  const record = await prisma.follows.create({
    data: {
      follower_id: currentUserId,
      following_id: targetUserId,
    },
  });

  return NextResponse.json(record);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  const targetUserId = req.nextUrl.searchParams.get('targetUserId');

  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!);

  const record = await prisma.follows.delete({
    where: {
      follower_id_following_id: {
        follower_id: currentUserId,
        following_id: targetUserId!,
      },
    },
  });

  return NextResponse.json(record);
}