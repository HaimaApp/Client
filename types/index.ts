import { ImageSourcePropType } from "react-native";

export interface onBoardType {
  id: string;
  image: ImageSourcePropType | undefined;
  title: string;
  subtitle: string;
}

export interface authFormValueType {
  email: string;
  password: string;
}

export interface otpFormValueType {
  otp: string;
}

export interface personalFormValueType {
  first_name: string;
  last_name: string;
  username: string;
  mobile_no: string;
  email: string;
  location: string;
}

export interface forgetFormValueType {
  email: string;
}

export interface resetFormValueType {
  password?: string;
  confirm_password?: string;
  email?: string;
}

export interface creditCardFormValueType {
  card_number: string;
  cardholder_name: string;
  expiry_date: string;
  cvv: string;
}

export interface Product {
  id: string;
  product_image: ImageSourcePropType | undefined;
  title: string;
  category?: string;
  price: number;
  quantity: number;
  brand?: string;
}

export interface categoryItemType {
  id: string;
  icon: ImageSourcePropType | undefined;
  title: string;
  category: string;
  price: number;
}

export interface ImageType {
  uri: string;
  name: string;
  type: string;
}

export interface sellItemFormType {
  images: ImageType[];
  item_name: string;
  item_description: string;
  brand: string;
  condition: string;
  price: string;
}

export interface messageType {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  is_read: boolean;
  offerStatus?: "pending" | "approved" | "rejected";
}
