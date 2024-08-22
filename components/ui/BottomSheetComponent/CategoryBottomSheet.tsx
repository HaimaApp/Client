import React, { useCallback, useRef, useState } from "react";
import { categoriesOptionsData } from "@/constants/data";
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Feather, MaterialIcons } from "@expo/vector-icons";

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
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateSlideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const animateSlideOut = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handleCategoryPress = useCallback((category: string) => {
    setSelectedCategory(category);
    setViewSubCategories(true);
    animateSlideIn();
    bottomSheetModalRef.current?.expand();
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
    animateSlideOut();
    setTimeout(() => {
      setSelectedCategory(null);
      setViewSubCategories(false);
      bottomSheetModalRef.current?.collapse();
    }, 300);
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
      <Feather name="chevron-right" size={24} color="#4b5563" />
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
        <Feather name="chevron-right" size={24} color="#4b5563" />
      </TouchableOpacity>

      {selectedSubCategory === item.name &&
        item.items.map((subItem) => (
          <TouchableOpacity
            key={subItem}
            onPress={() => handleSubCategoryPress(subItem)}
            className="p-4 border-b border-[#ddd] flex-row items-center justify-between space-x-2"
          >
            <Text className="text-base">{subItem}</Text>
            {value === subItem && (
              <Feather name="check" size={24} color="#4b5563" />
            )}
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
        snapPoints={["90%", "90%"]}
        index={0}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={false}
      >
        <View style={{ flex: 1 }}>
          <View className="bg-white px-3 flex-1">
            {viewSubCategories ? (
              <Animated.View
                style={{
                  transform: [
                    {
                      translateX: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1000, 0],
                      }),
                    },
                  ],
                  flex: 1,
                }}
              >
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
                  <BottomSheetFlatList
                    data={selectedCategoryData.subCategories}
                    keyExtractor={(item) => item.name}
                    renderItem={renderSubCategoryItem}
                    contentContainerStyle={{ flexGrow: 1 }}
                  />
                )}
              </Animated.View>
            ) : (
              <Animated.View
                style={{
                  transform: [
                    {
                      translateX: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -1000],
                      }),
                    },
                  ],
                  opacity: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  }),
                  flex: 1,
                }}
              >
                <View className="w-full flex-1">
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
                  <BottomSheetFlatList
                    data={categoriesOptionsData}
                    keyExtractor={(item) => item.category}
                    renderItem={renderCategoryItem}
                  />
                </View>
              </Animated.View>
            )}
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default CategoryBottomSheet;
