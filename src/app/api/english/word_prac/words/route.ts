import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const words = prisma.englishWordPracWord.findMany({});
    return NextResponse.json({ words });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
};
