import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, FormField, Topheader } from "@/components";
import { icons } from "@/constants";
import { authFormSchema } from "@/schema";
import { useFormik } from "formik";
import { router } from "expo-router";
import { authFormValueType } from "@/types";
import Toast from "react-native-toast-message";
import { MaterialIcons } from "@expo/vector-icons";
import useFirstStore from "@/store";
import { loginUser } from "@/lib/apis/auth";
import { getErrorMessage } from "@/hooks";

const LoginScreen = () => {
  const { setIsAppFirstLaunched } = useFirstStore();
  const [sending, setSending] = useState(false);

  const initialValues: authFormValueType = {
    email: "",
    password: "",
  };

  const onSubmit = async (payload: authFormValueType, action: any) => {
    try {
      setSending(true);
      const response = await loginUser(payload);
      Toast.show({
        type: "success",
        text1: "Logged in Successfully",
        position: "top",
      });
      router.replace(`/home`);
      setIsAppFirstLaunched(true);
      action.resetForm();
      setSending(false);
      console.log(response);
      return response;
    } catch (error: any) {
      console.log(error);
      const errorMessage = getErrorMessage(error, "Log in Error");
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
          <Topheader subtitle="Already have an account?" title="Log in " />
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
            <CustomButton
              title="Login"
              containerStyles="bg-primary mt-3 w-full py-3"
              titleStyle="text-base font-medium text-black"
              isLoading={sending}
              handlePress={handleSubmit}
            />
            <View className="py-3 w-full flex-row items-center justify-center">
              <Text className="text-sm font-normal text-black">or</Text>
            </View>
            <CustomButton
              title={
                <View className="flex-row items-center justify-center space-x-4 w-full h-full">
                  <Image
                    source={icons.googleIcon}
                    alt="Google icons"
                    resizeMode="contain"
                  />
                  <Text className="text-base font-medium text-black">
                    Sign in with Google
                  </Text>
                </View>
              }
              containerStyles="w-full py-3 mt-3 border border-primary"
              titleStyle="text-base font-medium text-black"
            />
            <CustomButton
              title={
                <View className="flex-row items-center justify-center space-x-4 w-full h-full">
                  <Image
                    source={icons.appleIcon}
                    alt="Apple icons"
                    resizeMode="contain"
                  />
                  <Text className="text-base font-medium text-white">
                    Sign in with Apple
                  </Text>
                </View>
              }
              containerStyles="w-full py-3 mt-3 bg-black border border-black"
              titleStyle="text-base font-medium text-black"
            />
            <View className="flex-row items-center justify-center space-x-1 py-4 w-full">
              <Text className="text-sm font-normal text-black">New here?</Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text className="text-sm font-normal text-[#997A7A] underline">
                  Create account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
