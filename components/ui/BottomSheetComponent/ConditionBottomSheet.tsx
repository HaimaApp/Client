import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import { conditionDataOption } from "@/constants/data";

interface ConditionBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  setFieldValue: (field: string, value: any) => void;
  value: string;
}

interface ConditionType {
  id: string;
  text: string;
  desc: string;
}

const ConditionBottomSheet: React.FC<ConditionBottomSheetProps> = ({
  bottomSheetModalRef,
  setFieldValue,
  value,
}) => {
  const handleCloseBottomSheet = useCallback(
    (condition: string) => {
      setFieldValue("condition", condition);
      bottomSheetModalRef.current?.close();
    },
    [setFieldValue, bottomSheetModalRef]
  );

  const renderConditionItem = ({ item }: { item: ConditionType }) => (
    <TouchableOpacity
      onPress={() => handleCloseBottomSheet(item.text)}
      className="p-4 border-y border-[#ddd] flex-row items-center justify-start space-x-2"
    >
      <Fontisto
        name={value === item.text ? "radio-btn-active" : "radio-btn-passive"}
        size={24}
        color={value === item.text ? "#FFCCCC" : "#9ca3af"}
      />
      <View className="flex-col items-start justify-start space-y-1">
        <Text className="text-base text-black">{item.text}</Text>
        <Text className="text-sm font-normal text-gray-400">{item.desc}</Text>
      </View>
    </TouchableOpacity>
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
        snapPoints={["60%"]}
        index={0}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={false}
      >
        <View style={{ flex: 1, paddingBottom: 20 }}>
          <View className="w-full flex-row items-center justify-center mb-5 relative">
            <TouchableOpacity
              onPress={() => bottomSheetModalRef.current?.close()}
              className="flex-row items-center justify-start space-x-3 absolute top-1 left-4"
            >
              <MaterialIcons name="close" size={24} color="#4b5563" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-black">Condition</Text>
          </View>
          <BottomSheetFlatList
            data={conditionDataOption}
            keyExtractor={(item) => item.id}
            renderItem={renderConditionItem}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default ConditionBottomSheet;
