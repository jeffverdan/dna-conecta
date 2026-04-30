import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { UseFormSetValue } from 'react-hook-form';

type Props = {
  label: string;
  name: string;
  options: OptionsRadioType[];
  setOptions: (data: OptionsRadioType[]) => void;
  value?: string;
  setValue: UseFormSetValue<any>
  changeFunction?: (e: string) => void
  disabled?: boolean
};

export type OptionsRadioType = {
  value: string;
  disabled: boolean;
  label: string;
  checked: boolean;
  width?: string;
  percent?: number;
};

export default function InputRadioGroup({ label, value, name, options, setOptions, changeFunction, setValue, disabled }: Props) {
  const handleChange = (value: boolean, index: number) => {
    setValue(name, options[index].value);
    options.map((option) => (
      option.checked = false
    ))
    options[index].checked = value;
    setOptions([...options])
    if(changeFunction) changeFunction(options[index].value);
  };

  const returnStyle = (option: OptionsRadioType) => {
    if (option.checked) {
      return 'check';
    }
    return 'unCheck';
  };

  return (
    <FormControl className='radio-group'>
      <FormLabel className='label-group'>{label}</FormLabel>
      <RadioGroup row >
        {options?.map((option, index) => (
          <div key={index} className={`radio-item ${returnStyle(option)}`} style={{ width: option.width ? option.width : 'auto' }}>
            <FormControlLabel
              disabled={disabled || option.disabled}
              value={option.value}
              checked={value === option.value}
              control={<Radio />}
              label={option.label}
              onChange={(e) => handleChange((e.target as HTMLInputElement).checked, index)}
            />
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  );
}