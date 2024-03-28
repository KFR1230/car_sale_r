import { User } from '@/src/payload-type';
import { Access } from 'payload/config';

export const isAdmin: Access<any, User> = ({ req: { user } }) => {
  return Boolean(user?.role?.includes('admin'));
};
