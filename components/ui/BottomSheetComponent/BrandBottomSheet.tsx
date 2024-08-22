import React, { useCallback, useState, useMemo, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SectionList,
} from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetSectionList,
} from "@gorhom/bottom-sheet";
import { MaterialIcons } from "@expo/vector-icons";
import { brandDataOption } from "@/constants/data";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { icons } from "@/constants";

interface BrandBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  setFieldValue: (field: string, value: any) => void;
}

interface BrandType {
  id: string;
  text: string;
}

const BrandBottomSheet: React.FC<BrandBottomSheetProps> = ({
  bottomSheetModalRef,
  setFieldValue,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const sectionListRef = useRef<SectionList>(null);

  const handleCloseBottomSheet = useCallback(
    (brand: string) => {
      setFieldValue("brand", brand);
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

  const groupedBrands = useMemo(() => {
    const filteredBrands = brandDataOption
      .filter((brand) =>
        brand.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => a.text.localeCompare(b.text));

    const grouped = filteredBrands.reduce(
      (acc: { title: string; data: BrandType[] }[], brand) => {
        const firstLetter = brand.text[0].toUpperCase();
        const section = acc.find((group) => group.title === firstLetter);

        if (section) {
          section.data.push(brand);
        } else {
          acc.push({ title: firstLetter, data: [brand] });
        }

        return acc;
      },
      []
    );

    return grouped;
  }, [searchQuery]);

  const renderBrandItem = ({ item }: { item: BrandType }) => (
    <TouchableOpacity
      onPress={() => handleCloseBottomSheet(item.text)}
      className="p-4 border-b border-[#ddd] flex-row items-center justify-start space-x-2"
    >
      <View className="flex-col items-start justify-start space-y-1">
        <Text className="text-base text-black">{item.text}</Text>
      </View>
    </TouchableOpacity>
  );

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleLetterPress = (letter: string) => {
    const sectionIndex = groupedBrands.findIndex(
      (section) => section.title === letter
    );
    if (sectionIndex !== -1) {
      sectionListRef.current?.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        animated: true,
      });
    }
  };

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
            <Text className="text-lg font-semibold text-black">Brands</Text>
          </View>

          <View className="w-full relative px-4 mb-4">
            <TextInput
              className="w-full bg-white border border-gray-300 focus:border-primary rounded-lg px-12 py-3 text-sm font-normal text-[#98A2B3]"
              placeholderTextColor="#98A2B3"
              placeholder="Search brands..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Image
              source={icons.searchIcon}
              className="absolute top-[32%] left-[30px]"
              resizeMode="contain"
              tintColor="#667185"
            />
          </View>
          <View className="w-full flex-1 flex-row relative">
            <BottomSheetSectionList
              ref={sectionListRef}
              sections={groupedBrands}
              keyExtractor={(item) => item.id}
              renderItem={renderBrandItem}
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            />
            <View className="absolute top-0 bottom-0 right-0 justify-center pr-2">
              <ScrollView contentContainerStyle={{ justifyContent: "center" }}>
                {alphabet.map((letter) => (
                  <TouchableOpacity
                    key={letter}
                    onPress={() => handleLetterPress(letter)}
                    className="py-0.5"
                  >
                    <Text className="text-xs text-gray-800">{letter}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default BrandBottomSheet;
