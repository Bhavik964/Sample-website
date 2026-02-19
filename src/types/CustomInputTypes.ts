import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { VisitorData } from './VisitorsTypes';

export interface Option {
    value: string;
    label: string;
}
export interface SelectInputProps {
    id: string;
    label: string;
    register: UseFormRegister<any>;
    errors: FieldErrors<FieldValues>;
    setValue: UseFormSetValue<any>;
    required?: boolean;
    options: Option[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    validate?: (value: string) => true | string;
    value?: string;
    mode?: 'create' | 'edit';
}

export interface RadioGroupProps {
    id: string;
    label: string;
    options: Option[];
    register: UseFormRegister<any>;
    errors: FieldErrors<FieldValues>;
    required?: boolean;
}
export interface TextInputProps {
    id: string;
    label: string;
    register: UseFormRegister<any>;
    errors: FieldErrors<FieldValues>;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    mode?: "create" | "edit";
    readOnly?: boolean;
    required?: boolean;
    maxLength?: number;
    validationRules?: RegisterOptions;
    setValue?: UseFormSetValue<VisitorData>
}


export interface Country {
    code: string;
    name: string;
    callingCode: string;
    flag: string;
    //  flag2x: string;
}

export interface CountryDropdownProps {
    value: string;
    onChange: (value: string) => void;
    countries: Country[];
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClick?: () => void;
  className?: string;
  inputClassName?: string;
}