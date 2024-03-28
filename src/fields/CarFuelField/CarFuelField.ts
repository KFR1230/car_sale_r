import { Field } from 'payload/types';
import { CarFuelComponent } from './CarFuelComponent';

export const CarFuelField: Field = {
  name: 'Engin_fuel',
  label: '引擎燃料',
  type: 'text',
  required: true,
  admin: {
    components: {
      Field: CarFuelComponent,
    },
  },
};
