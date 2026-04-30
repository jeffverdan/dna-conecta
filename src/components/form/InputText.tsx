import { IconButton, TextField } from '@mui/material';
import { useState, forwardRef, useEffect } from 'react';
import { TextFieldProps } from "@mui/material/TextField";
import { Visibility, VisibilityOff, Check } from "@mui/icons-material";
import InputAdornment from '@mui/material/InputAdornment';
import { FieldError } from "react-hook-form";
import { HiExclamation } from 'react-icons/hi';

type MyTextFieldProps = TextFieldProps & {
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    fieldError: FieldError | undefined;
    success?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    saveOnBlur?: (e?: React.ChangeEvent<HTMLInputElement>) => void
    onBlurFunction?: () => void
    iconBefore?: React.ReactNode
    className?: string
};

const InputText = forwardRef<HTMLInputElement, MyTextFieldProps>(
    function InputText(data: MyTextFieldProps, ref) {
        const { label, placeholder, success, required, fieldError, value, onBlurFunction, iconBefore, type, saveOnBlur, className, ...rest } = data;
        const [isFocused, setIsFocused] = useState(false);
        const [isValue, setIsValue] = useState(!!value);
        const [showPassword, setShowPassword] = useState<boolean>(false);

        const handleInputFocus = () => {
            setIsFocused(true);
        };

        const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);

            if (saveOnBlur) saveOnBlur(e);
            if (e.target.value) {
                setIsValue(true);
            } else {
                setIsValue(false);
            }
            if (onBlurFunction) onBlurFunction();
        };

        const handleClickShowPassword = () => {
            setShowPassword(!showPassword);
        };

        const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
        };

        useEffect(() => {
            const input = document.getElementById(`${rest.name}-label`);
            if (value && input) {
                setIsValue(!!value)
                // input.classList.remove('css-1m64zye-MuiFormLabel-root-MuiInputLabel-root');
                input.classList.add('css-xiblmv-MuiFormLabel-root-MuiInputLabel-root')
            }
        }, [value]);

        return (
            <div className={"inputContainer " +
                (className || '') +
                (isValue || success ? " success " : "") +
                (isFocused ? " active " : "") +
                (!!fieldError ? " error " : "") +
                (rest.disabled ? " disable" : "")
            }>
                <TextField
                    label={label}
                    className="input-default"
                    variant="standard"
                    id={rest.name}
                    required={required}
                    {...rest}
                    value={value}
                    // focused={true}
                    placeholder={placeholder}
                    aria-placeholder='asas'
                    inputMode='text'
                    
                    // InputLabelProps={{
                    //     shrink: true,
                    // }}
                    slotProps={{
                        inputLabel: {
                            classes: ".css-xiblmv-MuiFormLabel-root-MuiInputLabel-root",
                            shrink: true,
                        },
                        input: {
                            endAdornment: (
                                <InputAdornment position="end" className='icons-container'>
                                    {!!iconBefore
                                        ? iconBefore
                                        : rest.name.includes("password")
                                            ? <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>

                                            :
                                            (isValue && !fieldError) && !rest.name.includes("email")
                                                ? <Check width={14} height={12} />
                                                : ''
                                    }
                                    {!!fieldError && <HiExclamation />}
                                </InputAdornment>
                            )
                        }
                    }}
                    error={!!fieldError}
                    inputRef={ref}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    type={rest.name.includes("password") ? (showPassword ? "text" : "password") : type ? type : "text"}
                />
                {fieldError && <p className='errorMsg'>*{fieldError.message}</p>}
            </div>
        )
    })

InputText.displayName = 'InputText';
export default InputText;
