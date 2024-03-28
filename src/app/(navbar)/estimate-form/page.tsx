import FormArea from '@/src/components/EstimateFormPage/FormArea';
import PageBar from '@/src/components/PageBar';
import { TFormCredentialsValidator } from '@/src/lib/validator/account-credential-vaidator';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { useState } from 'react';

interface objectType {
  name: string;
  phone: string;
  lineID: string;
  mail: string;
  brand: string;
  type: string;
  year: string;
  mileage: string;
  remark: string;
  [key: string]: any;
}

const object: objectType = {
  name: '姓名',
  phone: '電話',
  lineID: 'Line-id',
  mail: 'E-mail',
  brand: '品牌',
  type: '車型',
  year: '年份',
  mileage: '里程',
  remark: '備註',
};

export default function Page() {
  async function upload(data: FormData, formInfo: TFormCredentialsValidator) {
    'use server';
    const formeData = new FormData();
    const name = formInfo.name;
    const string =
      '\n\n' +
      Object.entries(formInfo)
        .map(([key, value]) => {
          return [object[key], value].join(' : ');
        })
        .join('\n\n');

    formeData.append('message', string);
    try {
      const res = await fetch(`${process.env.LINE_NOTIFY_URL}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.LINE_NOTIFY_TOKEN}`,
        },
        body: formeData,
      });
      const { status } = await res.json();
      if (status !== 200) {
        throw new Error('傳送失敗');
      }
    } catch (err) {
      console.log(err);
    }
    //取得圖片
    const array = data.getAll('imageFile');
    if (array.length === 0) return { success: true };
    for (let i = 0; i < array.length; i++) {
      const imageData = new FormData();
      imageData.set('imageFile', array[i]);
      imageData.append('message', '→');
      try {
        const res = await fetch(`${process.env.LINE_NOTIFY_URL}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.LINE_NOTIFY_TOKEN}`,
          },
          body: imageData,
        });
        const { status } = await res.json();
        if (status !== 200) {
          throw new Error('傳送失敗');
        }
      } catch (err) {
        return { success: false };
        console.log(err);
      }
    }
    return { success: true };
  }

  return (
    <main>
      <PageBar pageName="線上估價" />
      <FormArea upload={upload} />
    </main>
  );
}

// const file: File | null = data.get('imageFile') as unknown as File;

// if (!file) {
//   throw new Error('No file');
// }

// const res = await fetch(`${process.env.LINE_NOTIFY_URL}`, {
//   method: 'POST',
//   headers: {
//     Authorization: `Bearer ${process.env.LINE_NOTIFY_TOKEN}`,
//   },
//   body: data,
// });

// const bytes = await file.arrayBuffer();
// const buffer = Buffer.from(bytes);
// console.log(buffer);
// const path = join('/', 'tmp', file.name);
// await writeFile(path, buffer);
// image = path;
// console.log(`open ${path} to see the upload file`);
