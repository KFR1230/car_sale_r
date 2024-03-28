import { SelectInput, useField, useFormFields } from 'payload/components/forms';
import * as React from 'react';

type CarType =
  | {
      label: string;
      value: string;
    }[]
  | [];
//使用 useFormFields 取得動態的field 資料。
export const CarModelSelectComponent: React.FC<{ path: string }> = ({
  path,
}) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = React.useState<CarType>([]);
  const [isLoading, setIsLoading] = React.useState<Boolean>(false);
  const brand = useFormFields(([fields, dispatch]) => {
    return fields.Car_Brand.value;
  });

  //向第三方找尋api，找尋相關資料
  React.useEffect(() => {
    if (!brand) {
      setOptions([]);
      setValue(undefined);
      return;
    }
    //遞迴尋找brand-type
    const allModelArr: CarType = [];
    let offsetNum = 0;
    let isEnding = false;
    const getCarModel = async () => {
      if (isEnding) return;
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://public.opendatasoft.com//api/explore/v2.1/catalog/datasets/all-vehicles-model/records?group_by=model&order_by=model ASC&limit=50&offset=${offsetNum}&refine=make:"${brand}"`
        );
        const { results } = await res.json();
        const arr: [] = results.map((i: { model: string }) => {
          return {
            label: i.model,
            value: i.model,
          };
        });
        allModelArr.push(...arr);
        //一次取50筆資料，最多50筆，滿足50筆執行下一次，無跳出迴圈
        if (results.length === 50) {
          offsetNum += 50;
        } else {
          isEnding = true;
          setOptions(allModelArr);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
      getCarModel();
    };
    getCarModel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  return (
    <div>
      <label className="field-label">
        車型 (Car Type)
        {isLoading && (
          <span style={{ marginLeft: '4px', fontSize: '12px', color: 'gray' }}>
            Loading...
          </span>
        )}
      </label>
      <SelectInput
        path={path}
        name={path}
        value={value}
        options={options}
        onChange={(e) => {
          setValue(e?.value);
        }}
        style={{ marginBottom: '12px' }}
      />
    </div>
  );
};
