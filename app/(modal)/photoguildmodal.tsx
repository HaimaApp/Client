import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { images } from "@/constants";

const imagesExample = [images.item1, images.item2];

const PhotoGuildModal = () => {
  const [optionImage] = useState(imagesExample);

  const renderOptionItem = ({ item }: { item: any }) => {
    return (
      <View className="mr-5 w-[147px] aspect-square rounded-lg">
        <Image
          source={item}
          className="w-full h-full rounded-lg"
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 w-full bg-white">
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center justify-between space-x-2 border-b-2 border-[#F0F2F5] w-full py-3 px-5"
        >
          <Ionicons name="close" size={28} />
        </TouchableOpacity>

        <View className="flex-col items-start justify-start space-y-6 w-full p-5">
          <Text className="text-xl font-semibold text-[#202020]">
            Eye-catching photos help you sell
          </Text>
          <View className="w-full">
            <FlatList
              data={optionImage}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderOptionItem}
              numColumns={2}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PhotoGuildModal;
