import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const tagsArray: object[] = await req.json();
  const response = NextResponse.json({ status: 'success' });
  response.cookies.set({
    name: 'filter-tag',
    value: JSON.stringify(tagsArray),
    maxAge: 60 * 60,
  });
  return response;
};
