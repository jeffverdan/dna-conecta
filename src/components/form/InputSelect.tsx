import React, { useEffect } from 'react';
import { Select } from '@mui/material';
import { useState, forwardRef } from 'react';
import { SelectProps } from "@mui/material/Select";
import { Check } from "@mui/icons-material";
import InputAdornment from '@mui/material/InputAdornment';
import { FieldError } from "react-hook-form";
import { HiExclamation } from 'react-icons/hi';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

type MySelectProps = SelectProps & {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    fieldError: FieldError | undefined;
    success?: boolean;
    options?: { value: number | string, name: string }[];
    value?: number | string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlurFunction?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
    subHeader?: string;
    divClass?: string
};

const InputSelect = forwardRef<HTMLInputElement, MySelectProps>(
    function InputSelect(data: MySelectProps, ref) {
        const { label, success, required, fieldError, options, value, subHeader, onBlurFunction, divClass, placeholder, ...rest } = data;
        const [isFocused, setIsFocused] = useState(false);
        const [isValue, setIsValue] = useState(!!value);
        const [list, setList] = useState<{ value: number | string, name: string }[]>([]);

        useEffect(() => {
            setIsValue(!!value);
        },[value])

        useEffect(() => {
            const firstOption = options?.[0];
            if(!!firstOption && !!firstOption.value) {
                options.unshift({ value: 0, name: placeholder || `Selecione o ${label.toLowerCase().replace("*", "")}` })
                setList(options)
            }
        }, [options])

        const handleInputFocus = () => {
            setIsFocused(true);
        };

        const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);
            if (e.target.value) {
                setIsValue(true);
            } else {
                setIsValue(false);
            }
            if(onBlurFunction) onBlurFunction(e)
        };        

        return (
            <div className={"inputContainer select " +
                ((isValue || success) ? "success " : "") +
                (isFocused ? "active " : "") +
                (!!fieldError ? "error " : "") +
                (rest.disabled ? "disable" : "") +
                (divClass ? divClass : '')
            }>

                <InputLabel className="select-label" id={rest.name}>{label}</InputLabel>                              
                <Select
                    className="input-default select-default"
                    labelId="select-standard-label"
                    required={required}                    
                    id={rest.name}
                    value={value || 0}
                    label={label}
                    autoWidth={false}                    
                    // displayEmpty
                    {...rest}
                    inputProps={{
                        id: rest.name,
                        endadornment: (
                            <InputAdornment position="end">
                                {!!fieldError
                                    ? <HiExclamation />
                                    : <Check width={14} height={12} />
                                }
                            </InputAdornment>
                        )
                    }}
                    MenuProps={{
                        classes: { paper: 'select-menu' },
                        // anchorOrigin: {
                        //     vertical: 'bottom',
                        //     horizontal: 'center',
                        // },
                    }}
                    error={!!fieldError}
                    inputRef={ref}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                >
                    {list?.map((value) => (
                        <MenuItem key={value.value} value={value.value} disabled={value.value === 0 || !value.value} className={value.value === 0 || !value.value ? 'placeholder' : ''}>                            
                            {value.name}
                        </MenuItem>
                    ))}
                    {!!subHeader && subHeader}
                </Select>
                {fieldError && <p className='errorMsg'>*{fieldError.message}</p>}
            </div>
        )
    })

InputSelect.displayName = 'InputSelect';
export default InputSelect;
