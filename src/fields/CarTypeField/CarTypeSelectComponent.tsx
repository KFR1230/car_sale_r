import * as React from 'react';
import { SelectInput, useField } from 'payload/components/forms';
import { Car_Type } from '../../config';

type CarType =
  | {
      label: string;
      value: string;
    }[]
  | [];

export const CarTypeSelectComponent: React.FC<{ path: string }> = ({
  path,
}) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = React.useState<CarType>(Car_Type);

  return (
    <div>
      <label className="field-label">車種 (Car Brand)</label>
      <SelectInput
        path={path}
        name={path}
        options={options}
        value={value}
        onChange={(e) => setValue(e?.value)}
        style={{ marginBottom: '12px' }}
      />
    </div>
  );
};
