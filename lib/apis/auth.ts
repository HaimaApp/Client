import {
  authFormValueType,
  forgetFormValueType,
  otpFormValueType,
  personalFormValueType,
  resetFormValueType,
} from "@/types";
import { Axios } from "../config";
import request from "../request";

// Function to register a user
export const registerUser = async (payload: authFormValueType) => {
  try {
    const response = await Axios.post(request.auth.register, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get otp verify
export const emailOtpVerify = async (query: otpFormValueType | undefined) => {
  try {
    const response = await Axios.get(request.auth.verifyemailotp, {
      params: {
        query,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get otp verify
export const resendEmailOtpVerify = async (
  query: forgetFormValueType | undefined
) => {
  try {
    const response = await Axios.get(request.auth.resendemailotp, {
      params: {
        query,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to login a user
export const loginUser = async (payload: authFormValueType) => {
  try {
    const response = await Axios.post(request.auth.login, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to create a user profile
export const createUserProfile = async (payload: personalFormValueType) => {
  try {
    const response = await Axios.post(
      request.auth.create_user_profile,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to forget password
export const forgetPassword = async (payload: forgetFormValueType) => {
  try {
    const response = await Axios.post(request.auth.forgetpassword, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to forget password
export const resetPassword = async (payload: resetFormValueType) => {
  try {
    const response = await Axios.patch(request.auth.resetpassword, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to reset otp verify
export const resetOtpVerify = async (query: otpFormValueType) => {
  try {
    const response = await Axios.get(request.auth.resetotp, {
      params: {
        query,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
