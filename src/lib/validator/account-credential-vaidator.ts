import { z } from 'zod';

//schema
export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(4, { message: '英文數字需輸入至少8個' }),
});

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const FormCredentialsValidator = z.object({
  name: z.string(),
  phone: z
    .string()
    .regex(phoneRegex, { message: '必須是有效的電話號碼' })
    .min(10, { message: '必須是有效的電話號碼' })
    .max(14, { message: '必須是有效的電話號碼' }),
  mail: z.string().email(),
  lineID: z.string(),
  brand: z.string(),
  type: z.string(),
  year: z.string().min(0, {
    message: '不能少於0',
  }),
  mileage: z.string().min(0, {
    message: '不能少於0',
  }),
  remark: z.string().max(250, { message: '最多只能250字' }),
});

export type TFormCredentialsValidator = z.infer<
  typeof FormCredentialsValidator
>;
