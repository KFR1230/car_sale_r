import { TFormCredentialsValidator } from '@/src/lib/validator/account-credential-vaidator';
import { NextRequest, NextResponse } from 'next/server';
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

export const POST = async (req: Request) => {
  const data = await req.json();
  const string =
    '\n\n' +
    Object.entries(data)
      .map(([key, value]) => {
        return [object[key], value].join(' : ');
      })
      .join('\n\n');

  const formData = new FormData();
  formData.append('stickerPackageId', JSON.stringify(11539));
  formData.append('stickerId', JSON.stringify(52114116));
  formData.append('message', string);

  try {
    const res = await fetch(`${process.env.LINE_NOTIFY_URL}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.LINE_NOTIFY_TOKEN}`,
      },
      body: formData,
    });
    const { status, message } = await res.json();
    const response = NextResponse.json({ status, message });
    return response;
  } catch (err) {
    console.log(err);
    const response = NextResponse.json({ status: 'error' });
    return response;
  }
};
