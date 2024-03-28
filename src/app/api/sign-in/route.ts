import { getUserPayload } from '@/src/getUserPayload';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const { email, password } = await req.json();
  try {
    const payload = getUserPayload();
    const res = (await payload).login({
      collection: 'users',
      data: {
        email: email,
        password: password,
      },
    });
    if (!res) throw new Error();
    const data = (await res).token;
    const response = NextResponse.json({
      status: 'success',
    });
    response.cookies.set({
      name: 'payload-token',
      value: `${data}`,
      maxAge: 60 * 60,
      httpOnly: true,
    });
    return response;
  } catch (err) {
    return NextResponse.json({ status: 'failed' });
  }
};
