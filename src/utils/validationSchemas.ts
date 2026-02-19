import * as Yup from "yup";

// Visitor schema
export const visitorSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required"),
  lastName: Yup.string()
    .required("Last Name is required"),
  phoneNumber: Yup.string().required("Mobile Number is required")
    .matches(/^\d{10}$/, "Mobile Number must be 10 digits"),
  email: Yup.string().email('Please enter a valid email address').notRequired().nullable(),
  category: Yup.string().required("Category of Visitor is required"),
  otherCategory: Yup.string().nullable().when('category', {
    is: (val: string) => val === 'Other',
    then: (schema) => schema.required('Other Category is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  referredBy: Yup.string().nullable().notRequired(),
  countryCode: Yup.string().required('Country Code is required'),
 // country: Yup.string().required('Country is required'),
});