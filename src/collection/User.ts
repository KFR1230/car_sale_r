import { CollectionConfig } from 'payload/types';

export const User: CollectionConfig = {
  slug: 'user',
  labels: { plural: '使用者' },
  access: {
    read: () => false,
    create: () => false,
    update: ({ req }) => req.user.role === 'admin',
  },
  fields: [
    {
      name: 'role',
      required: true,
      admin: {
        condition: () => true,
      },
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    },
  ],
};

//要有什麼欄位
/*
 * slug : 名稱
 * filed : table
 * admin : admin特權
 * hooks : 進入點，執行一些特殊的動作
 * access : 定義誰有權限
 **/
