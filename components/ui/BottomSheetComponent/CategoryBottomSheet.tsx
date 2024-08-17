import React, { useCallback, useState } from "react";
import { categoriesOptionsData } from "@/constants/data";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Feather, MaterialIcons } from "@expo/vector-icons";

interface CategoryType {
  category: string;
  subCategories: {
    name: string;
    items: string[];
  }[];
}

interface CategoryBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  setFieldValue: (field: string, value: any) => void;
  value: string;
}

const CategoryBottomSheet: React.FC<CategoryBottomSheetProps> = ({
  bottomSheetModalRef,
  setFieldValue,
  value,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [viewSubCategories, setViewSubCategories] = useState(false);

  const handleCategoryPress = useCallback((category: string) => {
    setSelectedCategory(category);
    setViewSubCategories(true);
  }, []);

  const handleSubCategoryPress = useCallback(
    (subCategory: string) => {
      setFieldValue("category", subCategory);
      setSelectedSubCategory(subCategory);
      bottomSheetModalRef.current?.close();
    },
    [setFieldValue, bottomSheetModalRef]
  );

  const toggleSubCategoryVisibility = (name: string) => {
    if (selectedSubCategory === name) {
      setSelectedSubCategory(null);
    } else {
      setSelectedSubCategory(name);
    }
  };

  const handleBackPress = useCallback(() => {
    setSelectedCategory(null);
    setViewSubCategories(false);
  }, []);

  const renderCategoryItem = ({
    item,
  }: {
    item: (typeof categoriesOptionsData)[0];
  }) => (
    <TouchableOpacity
      onPress={() => handleCategoryPress(item.category)}
      className="p-4 border-b border-[#ddd] flex-row items-center justify-between space-x-2"
    >
      <Text className="text-base">{item.category}</Text>
      <Feather
        name={value === item.category ? "check" : "chevron-right"}
        size={24}
        color="#4b5563"
      />
    </TouchableOpacity>
  );

  const renderSubCategoryItem = ({
    item,
  }: {
    item: { name: string; items: string[] };
  }) => (
    <View>
      <TouchableOpacity
        onPress={() => toggleSubCategoryVisibility(item.name)}
        className="p-4 border-b border-[#ddd] flex-row items-center justify-between space-x-2"
      >
        <Text className="text-lg font-bold">{item.name}</Text>
        <Feather
          name={value === item.name ? "check" : "chevron-right"}
          size={24}
          color="#4b5563"
        />
      </TouchableOpacity>

      {selectedSubCategory === item.name &&
        item.items.map((subItem) => (
          <TouchableOpacity
            key={subItem}
            onPress={() => handleSubCategoryPress(subItem)}
            className="p-4 border-b border-[#ddd]"
          >
            <Text className="text-base">{subItem}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );

  const selectedCategoryData = categoriesOptionsData.find(
    (data) => data.category === selectedCategory
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["90%"]}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={false}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <View className="bg-white px-3 pb-32">
            {viewSubCategories ? (
              <View>
                <View className="w-full flex-row items-center justify-center mb-5 relative">
                  <TouchableOpacity
                    onPress={handleBackPress}
                    className="flex-row items-center justify-start space-x-3 absolute top-1 left-0"
                  >
                    <Feather name="arrow-left" size={24} color="#4b5563" />
                  </TouchableOpacity>
                  <Text className="text-lg font-semibold text-black">
                    {selectedCategory}
                  </Text>
                </View>
                {selectedCategoryData && (
                  <FlatList
                    data={selectedCategoryData.subCategories}
                    keyExtractor={(item) => item.name}
                    renderItem={renderSubCategoryItem}
                    contentContainerStyle={{ flexGrow: 1 }}
                  />
                )}
              </View>
            ) : (
              <View className="w-full">
                <View className="w-full flex-row items-center justify-center mb-5 relative">
                  <TouchableOpacity
                    onPress={() => bottomSheetModalRef.current?.close()}
                    className="flex-row items-center justify-start space-x-3 absolute top-1 left-0"
                  >
                    <MaterialIcons name="close" size={24} color="#4b5563" />
                  </TouchableOpacity>
                  <Text className="text-lg font-semibold text-black">
                    Category
                  </Text>
                </View>
                <FlatList
                  data={categoriesOptionsData}
                  keyExtractor={(item) => item.category}
                  renderItem={renderCategoryItem}
                />
              </View>
            )}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default CategoryBottomSheet;
