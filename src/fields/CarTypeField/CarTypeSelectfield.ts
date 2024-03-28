import { Field } from 'payload/types';
import { CarTypeSelectComponent } from './CarTypeSelectComponent';

export const CarTypeSelectField: Field = {
  name: 'Car_Brand',
  label: '車種(Car_Brand)',
  type: 'text',
  required: true,
  admin: {
    components: {
      Field: CarTypeSelectComponent,
    },
  },
};
