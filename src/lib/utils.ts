import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: string | number | undefined | null) {
  if (!price) return;
  const numberPrice = typeof price === 'string' ? parseInt(price) : price;
  if (isNaN(numberPrice)) {
    return '輸入格式非數字';
  }
  if (numberPrice / 10000 < 1) {
    return '輸入的價格不足一萬';
  }
  const tenThousandNum = numberPrice / 10000;
  return `${tenThousandNum}萬`;
}

export function formatKilo(mileage: string | number | undefined | null) {
  if (!mileage) return;
  const numberMileage =
    typeof mileage === 'string' ? parseInt(mileage) : mileage;
  if (isNaN(numberMileage)) {
    return '輸入格式非數字';
  }
  // if (numberMileage / 10000 < 1) {
  //   return '輸入的里程不足一萬';
  // }
  const tenThousandNum = numberMileage / 10000;
  return `${tenThousandNum}km`;
}
