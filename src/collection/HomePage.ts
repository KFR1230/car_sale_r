import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../app/access/isAdmin';

export const HomePage: CollectionConfig = {
  slug: 'HomePage',
  labels: {
    plural: '首頁',
  },
  access: {
    create: isAdmin,
    read: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'bannerArray',
      label: '首頁大圖',
      type: 'array',
      fields: [
        {
          name: 'banner',
          label: 'banner',
          type: 'upload',
          relationTo: 'banner-media',
          required: true,
        },
      ],
    },
  ],
};
