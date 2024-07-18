import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";

const NavHeader = () => {
  return (
    <View className="w-full px-5 flex-row items-center justify-between">
      <View className="relative flex-row space-x-3 items-center justify-start">
        <View className="relative w-14 h-14 flex-row items-center justify-center bg-primary rounded-full">
          <Image source={icons.avatarIcon} alt="profile avatar" />
          <View className="w-4 h-4 bg-[#04802E] rounded-full border border-white absolute right-1 bottom-[1px]" />
        </View>
        <View className="flex-col items-start justify-start">
          <Text className="text-lg font-normal text-black">Aisha Uthman</Text>
          <Text className="text-xs font-medium text-black">Aisha Ventures</Text>
        </View>
      </View>
      <View className="flex-row items-center justify-end space-x-6">
        <TouchableOpacity>
          <FontAwesome5 name="heart" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/notification/notify")}>
          <Fontisto name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavHeader;