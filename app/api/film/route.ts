import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
  const films = await prisma.film.findMany();

  return NextResponse.json(films);
}
