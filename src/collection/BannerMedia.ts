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

export const BannerMedia: CollectionConfig = {
  slug: 'banner-media',
  labels: {
    plural: '首頁大圖區',
  },
  access: {
    read: async ({ req }) => {
      //來自express的req
      //這個referer用來指向的是，發起請求的前一個網頁網址。用來追蹤用戶的導向來源。
      const referer = req.headers.referer;
      //是否已登入或是來源網址裡包含著sell，只能讀取圖片
      if (!req.user || !referer?.includes('sell')) {
        return true;
      }

      return await isAdminOrHasAccessToImages()({ req });
    },
    //安全性，只有自己才能修改
    delete: isAdminOrHasAccessToImages(),
    update: isAdminOrHasAccessToImages(),
    create: isAdminOrHasAccessToImages(),
  },
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
  },
  upload: {
    staticURL: '/banner-media',
    staticDir: 'banner-media',
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
    //image類型，讓上傳的內容只能是圖片（png,jpeg...），不會是載入script。（安全性考量）
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
