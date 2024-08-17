import React, { useState } from "react";
import { icons, images } from "@/constants";
import { categoryItem } from "@/constants/data";
import { categoryItemType } from "@/types";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import { CustomButton } from "@/components";

const CategoryScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tabData] = useState<categoryItemType[]>(categoryItem);
  const [refreshing, setRefreshing] = useState(false);

  const filteredData = tabData
    ? (tabData as categoryItemType[]).filter((item) =>
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tabData;

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  return (
    <SafeAreaView className="flex-1 pt-4 bg-white">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-col items-start justify-start space-y-6 w-full px-5">
          <Text className="text-3xl font-normal text-[#6B5656]">Search</Text>

          <View className="w-full relative">
            <TextInput
              className="w-full bg-white border border-gray-300 focus:border-primary rounded-lg px-12 py-3 text-sm font-normal text-[#98A2B3]"
              placeholder="Search items or members"
              placeholderTextColor="#98A2B3"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Image
              source={icons.searchIcon}
              className="absolute top-[32%] left-[5%]"
              resizeMode="contain"
              tintColor="#667185"
            />
            <TouchableOpacity
              onPress={() => router.push(`/category/${`Bags`}/detail`)}
              className="absolute top-[32%] right-[5%]"
            >
              <Image
                source={icons.filterIcon}
                resizeMode="contain"
                tintColor="#667185"
              />
            </TouchableOpacity>
          </View>
          <View className="w-full">
            <View className="w-full">
              <FlatList
                data={filteredData}
                renderItem={({ item }) => <ItemsTab item={item} />}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 380 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                  <View className="w-full flex-col items-center justify-center h-[50vh]">
                    <Image source={images.notFoundImage} alt="" />
                    <Text className="text-base text-center font-normal text-black my-6">
                      Search result not found
                    </Text>
                    <CustomButton
                      title={
                        <View className="flex-row items-end justify-center space-x-2">
                          <Text className="text-base text-primary font-medium">
                            Go Back
                          </Text>
                          <FontAwesome6
                            name="arrow-right-long"
                            size={18}
                            color="#ffcccc"
                          />
                        </View>
                      }
                      containerStyles="bg-primary !w-fit py-3 !px-8 rounded-full"
                      titleStyle="text-base font-medium text-black"
                      handlePress={() => setSearchQuery("")}
                    />
                  </View>
                )}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const ItemsTab: React.FC<{ item: categoryItemType }> = ({ item }) => {
  return (
    <View className="w-full flex-col items-start justify-start border bg-[#FFFAFA] p-4 border-primary rounded-md mb-3">
      <TouchableOpacity
        onPress={() => router.push(`/category/${item.category}/detail`)}
        className="w-full flex-row items-center justify-between rounded-lg"
      >
        <View className="flex-row items-center justify-start space-x-3">
          <Image
            source={item.icon}
            alt={`${item.title} icon`}
            resizeMode="contain"
          />
          <Text className="tex-sm font-medium text-grey-700">{item.title}</Text>
        </View>
        <Entypo name="chevron-thin-right" size={20} color="#4E4E4E" />
      </TouchableOpacity>
    </View>
  );
};

export default CategoryScreen;
