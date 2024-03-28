import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../app/access/isAdmin';

export const AnotherInfo: CollectionConfig = {
  slug: 'AnotherInfo',
  labels: { plural: '其他資訊' },
  access: {
    create: isAdmin,
    read: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: '標籤',
      required: true,
    },
  ],
};
