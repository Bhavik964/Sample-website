export type FieldType = 'Text' | 'Number' | 'Radio' | 'Checkbox' | 'Select' | 'Date' | 'Document' | 'Image';

export interface Field {
    label: string;
    type: FieldType;
    options?: string[];
    value?: any;
    name: string;
    isRequired: any;
    newOption: any;
}

export type FieldOption = {
    _id: string;
    value: string;
};

export type FormField = {
    _id: string;
    formId: string;
    formGroupId?: string;
    label: string;
    name: string;
    type: string;
    orderBy: number;
    options: FieldOption[];
};

export type FormGroup = {
    _id: string;
    formId: string;
    title: string;
    description: string;
    slug: string;
    orderBy: number;
    fields: FormField[];
};

export interface Form {
    _id: string;
    title: string;
    description: string;
    slug: string;
    type: string;
    formGroups: FormGroup[];
    formFields: FormField[];
}

export interface FormDetailsResult {
    result: {
        form: Omit<Form, 'formGroups' | 'formFields'>;
        formGroups: FormGroup[];
        formFields: FormField[];
    };
}

export interface FieldRendererProps {
    fields: FormField[];
}