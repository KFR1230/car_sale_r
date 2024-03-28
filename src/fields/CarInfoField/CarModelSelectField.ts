import { Field } from 'payload/types';
import { CarModelSelectComponent } from './CarModelSelectComponent';

export const CarModelSelectField: Field = {
  name: 'Car_Type',
  type: 'text',
  label: '車型(Car_Type)',
  required: true,
  admin: {
    components: {
      Field: CarModelSelectComponent,
    },
  },
};
