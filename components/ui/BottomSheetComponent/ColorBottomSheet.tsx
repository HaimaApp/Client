import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { MaterialIcons } from "@expo/vector-icons";
import { colorsOption } from "@/constants/data";
import { LinearGradient } from "expo-linear-gradient";

interface ColorBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  setFieldValue: (field: string, value: any) => void;
  value: string[];
}

interface ColorType {
  id: string;
  text: string;
  color: string;
}

const ColorBottomSheet: React.FC<ColorBottomSheetProps> = ({
  bottomSheetModalRef,
  setFieldValue,
  value,
}) => {
  const [selectedColors, setSelectedColors] = useState<string[]>(value || []);

  const handleSelectColor = useCallback(
    (color: string) => {
      let newSelectedColors = [...selectedColors];
      if (color === "multicolor") {
        newSelectedColors = ["Multicolor"];
      } else {
        if (newSelectedColors.includes(color)) {
          newSelectedColors = newSelectedColors.filter((c) => c !== color);
        } else if (newSelectedColors.length < 2) {
          newSelectedColors.push(color);
        } else {
          newSelectedColors.shift();
          newSelectedColors.push(color);
        }
      }

      setSelectedColors(newSelectedColors);
      setFieldValue("color", newSelectedColors);
    },
    [selectedColors, setFieldValue]
  );

  const renderColorItem = ({ item }: { item: ColorType }) => {
    const isSelected = selectedColors.includes(item.color);

    return (
      <TouchableOpacity
        onPress={() => handleSelectColor(item.color)}
        className={`p-4 flex-color items-center justify-start space-y-3 ${
          isSelected ? "border-2 border-primary" : ""
        }`}
      >
        <View
          style={{
            backgroundColor:
              item.color === "multicolor" ? undefined : item.color,
          }}
          className={`w-14 h-14 rounded-full ${
            isSelected ? "border-2 border-primary" : "border border-gray-200"
          }`}
        >
          {item.color === "multicolor" && (
            <LinearGradient
              colors={[
                "#FF0000",
                "#00FF00",
                "#0000FF",
                "#FFFF00",
                "#FF00FF",
                "#00FFFF",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 0.1, 0.4, 0.6, 0.8, 1]}
              style={{ flex: 1, borderRadius: 999 }}
            />
          )}
        </View>
        <Text className="text-base text-black">{item.text}</Text>
      </TouchableOpacity>
    );
  };

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
        snapPoints={["98%", "98%"]}
        index={0}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={false}
      >
        <BottomSheetView style={{ flex: 1, paddingBottom: 20 }}>
          <View className="w-full flex-row items-center justify-center mb-5 relative">
            <TouchableOpacity
              onPress={() => bottomSheetModalRef.current?.close()}
              className="flex-row items-center justify-start space-x-3 absolute top-1 left-4"
            >
              <MaterialIcons name="close" size={24} color="#4b5563" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-black">Colors</Text>
          </View>
          <View className="w-full flex-row items-center justify-center mb-3">
            <Text className="text-sm font-medium text-black">
              Select up to 2 colors
            </Text>
          </View>
          <BottomSheetFlatList
            data={colorsOption}
            keyExtractor={(item) => item.id}
            renderItem={renderColorItem}
            contentContainerStyle={{ flexGrow: 1 }}
            numColumns={4}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default ColorBottomSheet;
