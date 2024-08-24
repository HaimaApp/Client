import React from "react";
import { View, Text, Image, Alert } from "react-native";
import CustomButton from "../ui/CustomizeButton";
import { icons } from "@/constants";
import { router } from "expo-router";
import useFirstStore from "@/store";

// interface SocialLoginButtonProps {
//   title: string;
// }

const SocialLoginButton: React.FC = () => {
  const { setIsAppFirstLaunched } = useFirstStore();

  return (
    <View className="w-full">
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
        handlePress={() => {
          Alert.alert("Google Oauth", "Login");
          router.replace(`/home`);
          setIsAppFirstLaunched(true);
        }}
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
        handlePress={() => {
          Alert.alert("Apple Oauth", "Login");
          router.replace(`/home`);
          setIsAppFirstLaunched(true);
        }}
      />
    </View>
  );
};

export default SocialLoginButton;
