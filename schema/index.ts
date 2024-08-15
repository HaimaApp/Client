import * as yup from "yup";

export const authFormSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/\d/, "Password must contain at least one number")
    .required("Required"),
});

export const otpVerifySchema = yup.object().shape({
  otp_code: yup.string().required("Required"),
});

export const forgetSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Required"),
});

export const personalFormSchema = yup.object().shape({
  first_name: yup.string().required("Required"),
  last_name: yup.string().required("Required"),
  username: yup.string().required("Required"),
  mobile_no: yup.string().required("Required"),
  email: yup.string().email("Invalid email address").required("Required"),
  location: yup.string().required("Required"),
});

export const resetFormSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/\d/, "Password must contain at least one number")
    .required("Required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Password does not match")
    .required("Required"),
});

export const creditFormSchema = yup.object().shape({
  card_number: yup.string().required("Required"),
  cardholder_name: yup.string().required("Required"),
  expiry_date: yup.string().required("Required"),
  cvv: yup.string().required("Required"),
});

export const sellFormSchema = yup
  .object()
  .shape({
    item_name: yup.string().required("item name is required"),
    item_description: yup.string().required("item description is required"),
    brand: yup.string().required("Brand is required"),
    condition: yup.string().required("Condition is required"),
    price: yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
  });
