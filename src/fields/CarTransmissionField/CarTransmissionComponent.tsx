import * as React from 'react';
import { SelectInput, useField } from 'payload/components/forms';
import { Car_Transmission } from '../../config';

type CarType =
  | {
      label: string;
      value: string;
    }[]
  | [];

export const CarTransmissionComponent: React.FC<{ path: string }> = ({
  path,
}) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = React.useState<CarType>([]);

  React.useEffect(() => {
    const allCarType = Car_Transmission?.map((type) => {
      return {
        label: type.value,
        value: type.name,
      };
    });
    setOptions(allCarType);
  }, []);

  return (
    <div>
      <label className="field-label">變速系統 (Car Transmission)</label>
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
