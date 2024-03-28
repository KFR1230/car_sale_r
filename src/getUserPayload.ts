import type { InitOptions } from 'payload/config';
import dotenv from 'dotenv';
import path from 'path';
import payload, { Payload } from 'payload';
interface Args {
  initialOptions?: Partial<InitOptions>;
}

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

let cached = (global as any).payload;
if (!cached) {
  cached = (global as any).payload = {
    user: null,
    promise: null,
  };
}

export const getUserPayload = async ({
  initialOptions,
}: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is missing!');
  }
  if (cached.user) {
    return cached.user;
  }
  if (!cached.promise) {
    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local: initialOptions?.express ? false : true,
      //local如果沒有express 就允許只在本地跑
      ...(initialOptions || {}),
    });
  }
  try {
    cached.client = cached.promise;
  } catch (err: unknown) {
    throw err;
  }
  return cached.client;
};
