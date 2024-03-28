import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const filterType: object[] = await req.json();

  const response = NextResponse.json({ status: 'success' });
  response.cookies.set({
    name: 'filter-type',
    value: JSON.stringify(filterType),
    maxAge: 60 * 60,
  });
  return response;
};
