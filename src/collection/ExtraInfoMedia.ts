import { Access, CollectionConfig } from 'payload/types';
import { User } from '../payload-type';

const isAdminOrHasAccessToImages =
  (): Access =>
  async ({ req }) => {
    const user = req.user as User | undefined; //no login

    if (!user) return false;
    if (user.role === 'admin') return true;

    //query constraint
    //在資料中確認，user屬性是否符合條件
    //作為驗證，確認圖片id是否相同，相同才會是true
    return {
      user: {
        equals: req.user.id,
      },
    };
  };

const ExtraInfoMedia: CollectionConfig = {
  slug: 'extra-car-media',
  labels: {
    plural: '其他內容照片區',
  },
  access: {
    read: async ({ req }) => {
      const referer = req.headers.referer;
      if (!req.user || referer?.includes('sell')) {
        return true;
      }
      return await isAdminOrHasAccessToImages()({ req });
    },
    create: isAdminOrHasAccessToImages(),
    delete: isAdminOrHasAccessToImages(),
    update: isAdminOrHasAccessToImages(),
  },
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
  },
  upload: {
    staticURL: '/extra-car-media',
    staticDir: 'extra-car-media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'note',
      label: '備註',
      type: 'text',
    },
  ],
};

export default ExtraInfoMedia;
