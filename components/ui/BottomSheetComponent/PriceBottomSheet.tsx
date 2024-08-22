import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";

interface PriceBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  setFieldValue: (field: string, value: any) => void;
  value: string;
}

const PriceBottomSheet: React.FC<PriceBottomSheetProps> = ({
  bottomSheetModalRef,
  setFieldValue,
  value,
}) => {
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
            <Text className="text-lg font-semibold text-black">Price</Text>
          </View>
          <View className="w-full flex-1 relative px-5">
            <TextInput
              value={value}
              onChangeText={(val) => setFieldValue("price", val)}
              placeholder="0"
              keyboardType="numeric"
              style={styles.input}
            />
            <Text className="absolute top-2 left-9 text-lg font-medium text-black">
              £
            </Text>
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    position: "relative",
  },
  input: {
    width: "100%",
    height: 48,
    paddingLeft: 40,
    paddingRight: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderColor: "#D0D5DD",
    borderBottomWidth: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
});

export default PriceBottomSheet;
