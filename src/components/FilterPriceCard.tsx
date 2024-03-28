'use client';
import { useEffect, useState } from 'react';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface filterProps {
  filterName: string;
  filterTitle: string;
  defaultValue:
    | {
        [key: string]: any;
      }
    | undefined;
  filterMinMaxOptions:
    | {
        [key: string]: number | string | null | undefined;
        value: string;
      }[];
  removeFilter: (filterType: object[], filterName: string) => void;
  addNewFilter: (filterType: object[], filterName: string) => void;
  addFilterTags: (value: string, filterName: string) => void;
  removeFilterTag: (filterName: string) => void;
}

const SelectTriggerStyle = 'min-w-[160px] w-auto';
const filterType = ['greater_than_equal', 'less_than_equal'];

const FilterPriceCard = (props: filterProps) => {
  const {
    filterName,
    filterTitle,
    defaultValue,
    filterMinMaxOptions,
    removeFilter,
    addNewFilter,
    addFilterTags,
    removeFilterTag,
  } = props;
  const [value, setValue] = useState<string>('none');

  //轉換成payload cms 可讀取得格式
  const formatToFilterType = (
    id: string,
    value: string | number | boolean,
    filterType: string[]
  ): object[] => {
    //取得對應的index位置
    const newValue: { [key: string]: any } | undefined =
      filterMinMaxOptions.find((option) => option?.value === value);
    //根據點選的條件取出所有的淚篩選類型，不包括value
    const conditions = newValue
      ? Object.keys(newValue).filter((v) => v !== 'value')
      : [];
    const array = conditions.map((type) => {
      return {
        or: [
          {
            [id]: {
              [type]: newValue?.[type],
            },
          },
          {
            and: [
              {
                is_onSale: {
                  equals: true,
                },
              },
              {
                onSale: {
                  [type]: newValue?.[type],
                },
              },
            ],
          },
        ],
      };
    });

    return array;
  };
  //先取出特定的name 有哪些篩選條件
  //在對找到的篩選條件，對index找尋value
  const defaultConditions: { [key: string]: any }[] = defaultValue
    ?.map((item: { [key: string]: any }) => {
      return item?.or?.[0]?.[filterName];
    })
    .filter((item: object | undefined) => item !== undefined);
  const defaultV =
    defaultConditions.length !== 0
      ? filterMinMaxOptions?.find((option) => {
          return defaultConditions.every((type) => {
            const key = type ? Object.keys(type)?.[0] : '';
            const value = type ? Object.values(type)?.[0] : '';
            const optionKeys = Object.keys(option);
            if (!optionKeys.includes(key)) return;
            return option?.[key] === value;
          });
        })?.value
      : 'none';

  useEffect(() => {
    if (defaultValue?.length === 0) return setValue('none');
    if (defaultValue?.length !== 0 && defaultV) return setValue(defaultV);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  return (
    <>
      <Label htmlFor={filterName} className="flex flex-col gap-1">
        <span className="text-[14px] px-2 -tracking-tighter font-normal">
          {filterTitle}
        </span>
        <Select
          name={filterName}
          defaultValue={defaultV}
          value={value}
          onValueChange={(e) => {
            if (e === 'none') {
              removeFilter(formatToFilterType(filterName, e, filterType), 'or');
              removeFilterTag(filterName);
            } else {
              addNewFilter(formatToFilterType(filterName, e, filterType), 'or');
              addFilterTags(e, filterName);
            }
          }}
        >
          <SelectTrigger id="Car_Color" className={SelectTriggerStyle}>
            <SelectValue placeholder="沒有限制" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none" key="none">
              沒有限制
            </SelectItem>
            {filterMinMaxOptions?.map((option, i) => {
              return (
                <SelectItem value={option.value} key={i}>
                  {/* 中文 是 value，因為payload 的 name 是英文 */}
                  {option.value}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </Label>
    </>
  );
};

export default FilterPriceCard;
