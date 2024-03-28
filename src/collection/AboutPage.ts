import { CollectionConfig } from 'payload/types';

export const AboutPage: CollectionConfig = {
  slug: 'about-us',
  labels: {
    plural: '關於我們',
  },
  fields: [
    {
      name: 'title',
      label: '標題',
      type: 'text',
    },
    {
      name: 'content',
      label: '內容',
      type: 'text',
    },
  ],
};
