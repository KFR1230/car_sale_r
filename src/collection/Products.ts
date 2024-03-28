import { getSiblingData } from 'payload/components/forms';
import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../app/access/isAdmin';
import { CarFuelField } from '../fields/CarFuelField/CarFuelField';
import { CarModelSelectField } from '../fields/CarInfoField/CarModelSelectField';
import { CarTransmissionField } from '../fields/CarTransmissionField/CarTransmissionField';
import { CarTypeSelectField } from '../fields/CarTypeField/CarTypeSelectfield';

import {
  OnSaleFormatField,
  PriceFormatField,
} from '../fields/PriceFormatField/PriceFormatField';

export const Products: CollectionConfig = {
  slug: 'Products',
  labels: { plural: '所有車輛' },
  admin: {
    useAsTitle: 'Car_Name',
  },
  access: {
    create: isAdmin,
    read: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'isDeposit',
      label: '是否收收訂金',
      type: 'checkbox',
    },
    {
      name: 'Car_Name',
      label: '車名',
      type: 'text',
    },
    CarTypeSelectField,
    {
      name: 'Car_Type',
      label: '車型',
      type: 'text',
    },
    // CarModelSelectField,
    {
      type: 'row',
      fields: [
        {
          name: 'Car_Color',
          label: '顏色',
          type: 'select',
          required: true,
          admin: {
            width: '25%',
          },
          options: [
            {
              label: '紅色',
              value: 'red',
            },
            {
              label: '橙色',
              value: 'orange_color',
            },
            {
              label: '橘色',
              value: 'orange',
            },
            {
              label: '橘色',
              value: 'orange',
            },
            {
              label: '黃色',
              value: 'yellow',
            },
            {
              label: '金色',
              value: 'gold',
            },
            {
              label: '金色',
              value: 'gold',
            },
            {
              label: '棕色',
              value: 'brown',
            },
            {
              label: '綠色',
              value: 'green',
            },
            {
              label: '藍色',
              value: 'blue',
            },
            {
              label: '藍紫色',
              value: 'indigo',
            },
            {
              label: '紫色',
              value: 'violet',
            },
            {
              label: '紫色',
              value: 'violet',
            },
            {
              label: '灰色',
              value: 'gray',
            },
            {
              label: '銀色',
              value: 'sliver',
            },
            {
              label: '黑色',
              value: 'black',
            },
            {
              label: '白色',
              value: 'white',
            },
          ],
        },
        {
          name: 'Car_CC',
          label: '排氣量',
          type: 'number',
          required: true,
          admin: {
            width: '25%',
          },
        },
        {
          name: 'Car_Year',
          label: '年份',
          type: 'number',
          required: true,
          admin: {
            width: '25%',
          },
        },
        {
          name: 'Car_Mileage',
          label: '里程數',
          type: 'number',
          required: true,
          admin: {
            width: '25%',
          },
        },
      ],
    },
    {
      type: 'row', // required
      fields: [CarFuelField, CarTransmissionField],
    },
    {
      name: 'Car_Info',
      label: '相關標籤',
      type: 'relationship',
      hasMany: true,
      relationTo: ['AnotherInfo'],
    },
    // {
    //   name: 'Extra_Equipment01',
    //   label: '車內外配備',
    //   type: 'group',
    //   interfaceName: 'Extra_Equipment',
    //   fields: [
    //     {
    //       name: 'Equipment_Description',
    //       required: true,
    //       label: '描述',
    //       type: 'textarea',
    //     },
    //     EquipmentField,
    //   ],
    // },
    // {
    //   name: 'Extra_Equipment02',
    //   label: '安全配備',
    //   type: 'group',
    //   interfaceName: 'Extra_Equipment',
    //   fields: [
    //     {
    //       name: 'Equipment_Description',
    //       label: '描述',
    //       type: 'textarea',
    //     },
    //     EquipmentSafeField,
    //   ],
    // },
    {
      name: 'Car_OtherInfo',
      label: '其他資訊',
      type: 'array',
      labels: {
        singular: 'Item',
        plural: 'Items',
      },
      fields: [
        { name: 'Car_Title', label: '標題', type: 'text' },
        {
          name: 'Car_Extra_Image',
          label: '大圖',
          type: 'upload',
          relationTo: 'extra-car-media',
        },
        { name: 'Car_Remark', label: '備註', type: 'textarea' },
      ],
    },
    {
      type: 'row',
      admin: {
        className: 'price-row',
      },
      fields: [
        {
          name: 'price',
          label: '價錢',
          type: 'number',
          defaultValue: 10000,
          min: 10000,
        },
        //add translate price text
        PriceFormatField,
      ],
    },
    {
      name: 'is_onSale',
      label: '有特價',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      type: 'row',
      admin: {
        className: 'price-row',
      },
      fields: [
        {
          name: 'onSale',
          label: '特價',
          type: 'number',
          defaultValue: 10000,
          min: 10000,
          admin: {
            condition: (data, siblingData, { user }) => {
              if (data.is_onSale) {
                return true;
              } else {
                return false;
              }
            },
          },
        },
        //add translate price text
        OnSaleFormatField,
      ],
    },
    {
      name: 'car_status',
      label: '車子狀態',
      type: 'select',
      options: [
        {
          label: '新款車輛',
          value: 'new-vehicle',
        },
        {
          label: '推薦車輛',
          value: 'recommend-vehicle',
        },
        {
          label: '特售車輛',
          value: 'onSale-vehicle',
        },
        {
          label: '車輛',
          value: 'vehicle',
        },
      ],
    },
    {
      name: 'status',
      label: '販售狀態',
      type: 'select',
      required: true,
      options: [
        {
          label: '售出 (客戶端會釋出)',
          value: 'sell',
        },
        {
          label: '預示 (客戶端不會釋出，登入狀態才會看到)',
          value: 'preview',
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: '圖片集',
      required: true,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'car_picture',
          label: '照片',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
};
