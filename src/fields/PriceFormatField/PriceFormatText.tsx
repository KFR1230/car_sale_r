import { useFormFields } from 'payload/components/forms';
import * as React from 'react';

export const PriceFormatText: React.FC = () => {
  const price = useFormFields<number>(
    ([fields, dispatch]) => fields.price.value as number
  );

  const textPrice = formatPrice(price);

  function formatPrice(price: number | string) {
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

  return (
    <div className="price-text">
      {/* <label className="field-label">轉厚厚的值</label> */}
      <span>( {textPrice} )</span>
    </div>
  );
};

export const OnSaleFormatText: React.FC = () => {
  const price = useFormFields<number>(
    ([fields, dispatch]) => fields.onSale.value as number
  );

  const textPrice = formatPrice(price);

  function formatPrice(price: number | string) {
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

  return (
    <div className="price-text">
      {/* <label className="field-label">轉厚厚的值</label> */}
      <span>( {textPrice} )</span>
    </div>
  );
};
