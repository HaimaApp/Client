import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CustomButton,
  FormField,
  SocialLoginButton,
  Topheader,
} from "@/components";
import { icons } from "@/constants";
import { authFormSchema } from "@/schema";
import { useFormik } from "formik";
import { router } from "expo-router";
import { authFormValueType } from "@/types";
import Toast from "react-native-toast-message";
import { MaterialIcons } from "@expo/vector-icons";
import { registerUser } from "@/lib/apis/auth";
import { getErrorMessage } from "@/hooks";

const passwordRequirement = ["At least 6 characters", "Contain a number"];

const CreateAnAccountScreen = () => {
  const [sending, setSending] = useState(false);

  const initialValues: authFormValueType = {
    email: "",
    password: "",
  };

  const onSubmit = async (payload: authFormValueType, action: any) => {
    try {
      setSending(true);
      const response = await registerUser(payload);
      Toast.show({
        type: "success",
        text1: "We’ve sent you 4-digit code to your Mail",
        position: "top",
      });
      router.push(`/verifyemail/${payload.email}`);
      action.resetForm();
      setSending(false);
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, "Registration Error");
      Toast.show({
        type: "error",
        text1: errorMessage,
        position: "top",
      });
    } finally {
      setSending(false);
    }
  };

  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: authFormSchema,
      onSubmit,
    });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 50 }}
      >
        <View className="w-full flex-col items-start justify-start space-y-4">
          <Topheader subtitle="New here?" title="Create Account" />
          <View className="w-full flex-col space-y-2 items-start justify-start">
            <View className="relative w-full">
              <FormField
                title={
                  <Text className="text-sm font-medium text-black">Email</Text>
                }
                titleShow={true}
                value={values.email}
                handleChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                otherStyles="mt-4"
                placeholder="Input email address"
                keyboardType="email-address"
                errorClass={`${
                  touched.email && errors.email ? "!border-red-500" : ""
                } pl-[45px]`}
              />
              <View className="flex-row items-center justify-start space-x-2 absolute top-[68%] left-[16px]">
                <Image source={icons.mailIcon} resizeMode="contain" />
              </View>
            </View>
            {touched.email && errors.email ? (
              <View className="flex-row items-center space-x-2">
                <MaterialIcons name="error-outline" size={16} color="red" />
                <Text style={{ color: "red" }}>{errors.email}</Text>
              </View>
            ) : null}
            <View className="relative w-full">
              <FormField
                title={
                  <Text className="text-sm font-medium text-black">
                    Password
                  </Text>
                }
                type="Password"
                titleShow={true}
                value={values.password}
                handleChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                otherStyles="mt-4"
                placeholder="Your password"
                errorClass={`${
                  touched.password && errors.password ? "!border-red-500" : ""
                } pl-[45px]`}
              />
              <View className="flex-row items-center justify-start space-x-2 absolute top-[68%] left-[16px]">
                <Image source={icons.lockIcon} resizeMode="contain" />
              </View>
            </View>
            {touched.password && errors.password ? (
              <View className="flex-row items-center space-x-2">
                <MaterialIcons name="error-outline" size={16} color="red" />
                <Text style={{ color: "red" }}>{errors.password}</Text>
              </View>
            ) : null}
            <View className="flex-row items-center justify-start space-x-1 py-3">
              <Text className="text-sm font-normal text-black">
                Forgot password?
              </Text>
              <TouchableOpacity onPress={() => router.push("/forgetpassword")}>
                <Text className="text-sm font-normal text-[#997A7A] underline">
                  Click here
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-full flex-col space-y-2">
              <Text className="text-xs font-normal text-[#667185]">
                Password must contain
              </Text>
              <View className="w-full flex-col items-start justify-start space-y-1">
                {passwordRequirement.map((require, index) => (
                  <View
                    key={index}
                    className="flex-row items-center justify-start space-x-2"
                  >
                    <Image
                      source={icons.checkIcon}
                      alt="check Icon"
                      resizeMode="contain"
                    />
                    <Text className="text-xs font-normal text-[#667185]">
                      {require}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <CustomButton
              title="Create Account"
              containerStyles="bg-primary mt-3 w-full py-3"
              titleStyle="text-base font-medium text-black"
              isLoading={sending}
              handlePress={handleSubmit}
            />
            <View className="py-3 w-full flex-row items-center justify-center">
              <Text className="text-sm font-normal text-black">or</Text>
            </View>
            <SocialLoginButton />
            <View className="flex-row items-center justify-center space-x-1 py-4 w-full">
              <Text className="text-sm font-normal text-black">
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text className="text-sm font-normal text-[#997A7A] underline">
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAnAccountScreen;
