import { Field } from 'payload/types';
import { CarTransmissionComponent } from './CarTransmissionComponent';

export const CarTransmissionField: Field = {
  name: 'Car_Transmission',
  type: 'text',
  label: '車型(Car Transmission)',
  required: true,
  admin: {
    components: {
      Field: CarTransmissionComponent,
    },
  },
};
