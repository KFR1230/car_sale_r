import { Field } from 'payload/types';

export const EquipmentField: Field = {
  label: '項目',
  type: 'collapsible',
  fields: [
    {
      name: 'itemArray_01',
      label: '車內外配備',
      type: 'group',
      fields: [
        {
          name: 'star_navigate',
          label: '衛星導航',
          type: 'checkbox',
          defaultValue: () => true,
        },
        {
          name: 'air_condition',
          label: '恆溫空調',
          type: 'checkbox',
          defaultValue: () => true,
        },
        {
          name: 'video_system',
          label: '影音系統',
          type: 'checkbox',
          defaultValue: () => true,
        },
        {
          name: 'Electric_Window',
          label: '電動天窗',
          type: 'checkbox',
          defaultValue: () => true,
        },
        {
          name: 'electric_door',
          label: '電動尾門',
          type: 'checkbox',
          defaultValue: () => true,
        },
        {
          name: 'steering_wheel',
          label: '方向盤控制',
          type: 'checkbox',
          defaultValue: () => true,
        },
        {
          name: 'ikey_open_system',
          label: 'I-KEY免鑰匙啟閉系統',
          type: 'checkbox',
          defaultValue: () => true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'electric_seat',
          label: '電動座椅',
          type: 'number',
          admin: {
            width: '25%',
          },
        },
        {
          name: 'head_light',
          label: '頭燈形式',
          type: 'text',
          admin: {
            width: '25%',
          },
        },
        {
          name: 'aluminum_rim',
          label: '鋁圈幾吋',
          type: 'number',
          admin: {
            width: '25%',
          },
        },
        {
          name: 'Drive_mode',
          label: '驅動模式',
          type: 'select',
          options: [
            {
              label: '前輪驅動',
              value: 'front_wheel',
            },
            {
              label: '後輪驅動',
              value: 'Rear_wheel',
            },
          ],
          admin: {
            width: '25%',
          },
        },
      ],
    },
  ],
};

export const EquipmentSafeField: Field = {
  label: '項目',
  type: 'collapsible',
  fields: [
    {
      name: 'itemArray_02',
      label: '安全配備',
      type: 'group',
      fields: [
        {
          name: 'airbag',
          label: '安全氣囊',
          type: 'checkbox',
          defaultValue: () => true,
        },
        {
          name: 'reverse_image',
          label: '倒車影像',
          type: 'checkbox',
          defaultValue: () => true,
        },
        {
          name: 'cruise_control',
          label: '定速巡航',
          type: 'checkbox',
          defaultValue: () => true,
        },
        {
          name: 'tire_pressure',
          label: '胎壓偵測',
          type: 'checkbox',
          defaultValue: () => true,
        },
        {
          name: 'view_360_degree',
          label: '360度環景',
          type: 'checkbox',
          defaultValue: () => true,
        },
        {
          name: 'ABS',
          label: 'ABS',
          type: 'checkbox',
          defaultValue: () => true,
        },
        {
          name: 'Side_blind_spot_detection',
          label: '車側盲點偵測',
          type: 'checkbox',
          defaultValue: () => true,
        },
        {
          name: 'lane_departure_warning',
          label: '車道偏移警示',
          type: 'checkbox',
          defaultValue: () => true,
        },
        {
          name: 'ACC',
          label: 'ACC主動定速',
          type: 'checkbox',
          defaultValue: () => true,
        },
        {
          name: 'child_seat',
          label: 'ISOFIX-兒童座椅',
          type: 'checkbox',
          defaultValue: () => true,
        },
      ],
    },
  ],
};
