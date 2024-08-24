import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { sizeDataOption } from "@/constants/data";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

interface SizeBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  setFieldValue: (field: string, value: any) => void;
  value: string;
}

interface SizeType {
  id: string;
  text: string;
}

const SizeBottomSheet: React.FC<SizeBottomSheetProps> = ({
  bottomSheetModalRef,
  setFieldValue,
  value,
}) => {
  const handleCloseBottomSheet = useCallback(
    (size: string) => {
      setFieldValue("size", size);
      bottomSheetModalRef.current?.close();
    },
    [setFieldValue, bottomSheetModalRef]
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

  const renderSizeItem = ({ item }: { item: SizeType }) => (
    <TouchableOpacity
      onPress={() => handleCloseBottomSheet(item.text)}
      className="p-4 border-b border-[#ddd] flex-row items-center justify-between"
    >
      <Text className="text-base text-black">{item.text}</Text>
      {value === item.text && <Feather name="check" size={24} color="#4b5563" />}
    </TouchableOpacity>
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["90%"]}
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
            <Text className="text-lg font-semibold text-black">Size</Text>
          </View>

          <View className="w-full flex-1 flex-row relative">
            <BottomSheetFlatList
              data={sizeDataOption}
              keyExtractor={(item) => item.id}
              renderItem={renderSizeItem}
            />
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default SizeBottomSheet;
