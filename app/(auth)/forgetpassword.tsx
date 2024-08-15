import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, FormField, Topheader } from "@/components";
import { icons } from "@/constants";
import { forgetSchema } from "@/schema";
import { useFormik } from "formik";
import { router } from "expo-router";
import { forgetFormValueType } from "@/types";
import Toast from "react-native-toast-message";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { getErrorMessage } from "@/hooks";
import { forgetPassword } from "@/lib/apis/auth";

const ForgetPasswordScreen = () => {
  const [sending, setSending] = useState(false);

  const initialValues: forgetFormValueType = {
    email: "",
  };

  const onSubmit = async (payload: forgetFormValueType, action: any) => {
    try {
      setSending(true);
      const response = await forgetPassword(payload);
      router.push(`/resetpassword/otpcode/${payload.email}`);
      Toast.show({
        type: "success",
        text1: "We’ve sent you 4-digit code to your Mail",
        position: "bottom",
      });
      action.resetForm();
      setSending(false);
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, "Forget Password Error");
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
      validationSchema: forgetSchema,
      onSubmit,
    });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 50 }}
      >
        <View className="w-full flex-col items-start justify-start space-y-4">
          <TouchableOpacity onPress={() => router.back()} className="mb-10">
            <Entypo name="chevron-thin-left" size={24} color="black" />
          </TouchableOpacity>
          <Topheader
            subtitle="Ready to gain access back?"
            title="Reset password"
          />
          <Text className="text-sm font-normal text-[#997A7A] pt-6">
            Enter your email address below, and we'll send you a link to reset
            your password. Once you've received it, simply follow the
            instructions in the email to set up a new password and regain access
            to your account.
          </Text>
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
              <View className="flex-row items-center justify-start space-x-2 absolute top-[66%] left-[16px]">
                <Image source={icons.mailIcon} resizeMode="contain" />
              </View>
            </View>
            {touched.email && errors.email ? (
              <View className="flex-row items-center space-x-2">
                <MaterialIcons name="error-outline" size={16} color="red" />
                <Text style={{ color: "red" }}>{errors.email}</Text>
              </View>
            ) : null}

            <CustomButton
              title="Reset password"
              containerStyles="bg-primary my-8 w-full py-4"
              titleStyle="text-base font-medium text-black"
              isLoading={sending}
              handlePress={handleSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPasswordScreen;
