import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, Topheader } from "@/components";
import { otpVerifySchema } from "@/schema";
import { useFormik } from "formik";
import { router, useLocalSearchParams } from "expo-router";
import { otpFormValueType } from "@/types";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Toast from "react-native-toast-message";
import { Entypo } from "@expo/vector-icons";
import { resendEmailOtpVerify, resetOtpVerify } from "@/lib/apis/auth";
import { getErrorMessage } from "@/hooks";

const CELL_COUNT = 4;

const ResetOtp = () => {
  const [sending, setSending] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(90);
  const [resendEnabled, setResendEnabled] = useState(false);

  const { code } = useLocalSearchParams<{ code?: string }>();

  const initialValues: otpFormValueType = {
    otp: "",
  };

  const onSubmit = async (payload: otpFormValueType, action: any) => {
    try {
      setSending(true);
      const response = await resetOtpVerify(payload);
      router.push(`/resetpassword/${code}/reset`);
      Toast.show({
        type: "success",
        text1: "Email verification successful!",
        position: "top",
      });
      action.resetForm();
      setSending(false);
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(
        error,
        "Incorrect OTP, Check and retry"
      );
      Toast.show({
        type: "error",
        text1: errorMessage,
        position: "top",
      });
    } finally {
      setSending(false);
    }
  };

  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    validationSchema: otpVerifySchema,
    onSubmit,
  });

  const ref = useBlurOnFulfill({
    value: values.otp,
    cellCount: CELL_COUNT,
  });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: values.otp,
    setValue: (code) => setFieldValue("otp", code),
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    } else {
      setResendEnabled(true);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const handleResendCode = async () => {
    if (!code) return;
    if (resendEnabled) {
      try {
        await resendEmailOtpVerify({ email: code });
        Toast.show({
          type: "success",
          text1: "We’ve sent you 4-digit code to your Mail",
          position: "top",
        });
        setResendCountdown(90);
        setResendEnabled(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Sending");
    }
  };

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
          <View className="w-full flex-col space-y-2 items-start justify-start">
            <Text className="text-sm font-medium text-black">
              Enter the 4-digit code we sent to you to verify
            </Text>
            <View className="w-full">
              <CodeField
                ref={ref}
                {...props}
                value={values.otp}
                onChangeText={(code) => setFieldValue("otp", code)}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFiledRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            </View>
          </View>
          <CustomButton
            title="Verify"
            containerStyles="bg-primary my-8 w-full py-4"
            titleStyle="text-base font-medium text-black"
            isLoading={sending}
            handlePress={handleSubmit}
          />
          <View className="flex-row items-center justify-center space-x-1 py-3">
            <Text className="text-sm font-normal text-black">
              Didn’t receive any code?
            </Text>
            <TouchableOpacity onPress={handleResendCode}>
              <Text className="text-sm font-normal text-[#997A7A] underline">
                {resendEnabled
                  ? "Retry"
                  : ` ${Math.floor(resendCountdown / 60)}:${String(
                      resendCountdown % 60
                    ).padStart(2, "0")}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  codeFiledRoot: { marginTop: 10 },
  cell: {
    width: 64,
    height: 64,
    lineHeight: 59,
    fontSize: 43,
    borderWidth: 1,
    borderColor: "#EAECF0",
    backgroundColor: "#FFF",
    borderRadius: 6,
    textAlign: "center",
    shadowColor: "#1018280D",
  },
  focusCell: {
    borderColor: "#997A7A",
    color: "#997A7A",
  },
});

export default ResetOtp;
