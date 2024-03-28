import { getUserPayload } from '@/src/getUserPayload';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const { searchPayload, cursor, limit, sortOption } = await req.json();
  const payload = getUserPayload();
  const page = cursor || 1;
  const { where } = searchPayload;
  // console.log(where, 'cursor', cursor, sortOption);
  const {
    docs: products,
    nextPage,
    hasNextPage,
  } = await (
    await payload
  ).find({
    collection: 'Products',
    depth: 1,
    page: page,
    limit: limit,
    where,
    sort: sortOption ? sortOption : '-createdAt',
  });
  // console.log(nextPage, hasNextPage);
  return NextResponse.json({ products, nextPage, hasNextPage, sortOption });
};
