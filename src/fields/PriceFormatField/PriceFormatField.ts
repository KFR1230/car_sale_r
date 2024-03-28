import { Field } from 'payload/types';
import { OnSaleFormatText, PriceFormatText } from './PriceFormatText';

export const PriceFormatField: Field = {
  name: 'PriceFormatText',
  type: 'text',
  admin: {
    readOnly: true,
    components: {
      Field: PriceFormatText,
    },
  },
};

export const OnSaleFormatField: Field = {
  name: 'OnSaleFormatText',
  type: 'text',
  admin: {
    condition: (data, siblingData, { user }) => {
      if (data.is_onSale) {
        return true;
      } else {
        return false;
      }
    },
    readOnly: true,
    components: {
      Field: OnSaleFormatText,
    },
  },
};
