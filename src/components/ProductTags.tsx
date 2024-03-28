import { Product } from '../payload-type';

const ProductTags = (props: { Product: Product }) => {
  const { Product } = props;
  const ValidCarInfo = Product?.Car_Info?.map(({ value }) => {
    return value;
  });

  return (
    <div className="w-full flex gap-2 flex-wrap">
      {ValidCarInfo?.map((Info, index) => {
        const label = typeof Info === 'string' ? Info : Info.label;
        return (
          <div
            className="p-2 bg-gray-900/70 text-white text-[12px] rounded"
            key={index}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default ProductTags;
