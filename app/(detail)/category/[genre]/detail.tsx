import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import { brandData, shopData } from "@/constants/data";
import { Product } from "@/types";
import useFavouriteStore from "@/store/favorite";
import Toast from "react-native-toast-message";
import { formatGBPCurrency } from "@/helpers";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  FontAwesome6,
} from "@expo/vector-icons";
import { CustomButton, RangeSlider } from "@/components";

const GenreDetail = () => {
  const { genre } = useLocalSearchParams<{ genre?: string }>();
  const data = shopData.filter((item) => item.category === genre);
  const [searchQuery, setSearchQuery] = useState<string | any>(genre);
  const MIN_DEFAULT = 500;
  const MAX_DEFAULT = 8000;
  const [minPrice, setMinPrice] = useState(MIN_DEFAULT);
  const [maxPrice, setMaxPrice] = useState(MAX_DEFAULT);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const filteredData = data
    ? data.filter((item) => {
        const isWithinPriceRange =
          item.price >= minPrice && item.price <= maxPrice;

        const isBrandSelected =
          selectedBrands.length === 0 || selectedBrands.includes(item.brand);

        const matchesSearchQuery =
          !searchQuery ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase());

        return isWithinPriceRange && isBrandSelected && matchesSearchQuery;
      })
    : data;

  const handleBrandToggle = (brandId: string) => {
    setSelectedBrands((prevSelected) =>
      prevSelected.includes(brandId)
        ? prevSelected.filter((id) => id !== brandId)
        : [...prevSelected, brandId]
    );
  };

  const screenHeight = Dimensions.get("window").height;

  const resetFilter = () => {
    setMinPrice(MIN_DEFAULT);
    setMaxPrice(MAX_DEFAULT);
    setShowFilter(false);
  };

  return (
    <SafeAreaView className="flex-1 pt-4 bg-white">
      <View className="flex-col items-start justify-start space-y-6 w-full px-5">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center justify-start space-x-3"
        >
          <Entypo name="chevron-thin-left" size={20} color="#ffcccc" />
          <Text className="text-base font-medium text-primary">Back</Text>
        </TouchableOpacity>
        <Text className="text-3xl font-normal text-[#6B5656]">Search</Text>
        <View className="w-full relative">
          <TextInput
            className="w-full bg-white border border-gray-300 focus:border-primary rounded-lg px-12 py-3 text-sm font-normal text-[#98A2B3]"
            placeholder="Search items or members"
            placeholderTextColor="#98A2B3"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={false}
          />
          <Image
            source={icons.searchIcon}
            className="absolute top-[32%] left-[5%]"
            resizeMode="contain"
            tintColor="#667185"
          />
          <TouchableOpacity
            onPress={() => {
              setShowFilter(true);
              Keyboard.dismiss();
            }}
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
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductItemComponet data={item} />}
            numColumns={2}
            columnWrapperStyle={{}}
            ListEmptyComponent={() => (
              <View className="w-full flex-col items-center justify-center h-[80vh]">
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
                  containerStyles="bg-transparent !w-fit py-3 !px-8 rounded-full"
                  titleStyle="text-base font-medium text-black"
                  handlePress={() => router.back()}
                />
              </View>
            )}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={refreshing}
            //     onRefresh={onRefresh}
            //     tintColor="#5E30F8"
            //     colors={["#5E30F8"]}
            //   />
            // }
          />
        </View>
      </View>
      {showFilter && (
        <View
          style={{
            position: "absolute",
            top: 40,
            right: 0,
            left: 0,
            bottom: 0,
            backgroundColor: "#fff",
            zIndex: 9999999,
            width: "100%",
            height: screenHeight,
            flexGrow: 1,
            paddingHorizontal: 15,
            paddingVertical: 25,
          }}
          className="flex-col justify-start"
        >
          <View className="w-full flex-col items-stacrt justify-center space-y-5">
            <View className="w-full flex-row items-center justify-between space-x-10">
              <TouchableOpacity onPress={() => setShowFilter(false)}>
                <Entypo name="chevron-thin-left" size={20} color="black" />
              </TouchableOpacity>
              <Text className="text-base font-normal text-[#6B5656] w-[55%]">
                Filter
              </Text>
            </View>
            <View className="w-full flex-col items-start justify-start space-y-4 pt-4">
              <View className="w-full flex-row items-center justify-between">
                <Text className="text-sm font-normal text-black">
                  Price range
                </Text>
                <Text className="text-sm font-normal text-black">
                  $ {minPrice} - $ {maxPrice}
                </Text>
              </View>
              <View className="w-full">
                <RangeSlider
                  sliderWidth={300}
                  min={minPrice}
                  max={maxPrice}
                  step={500}
                  onValueChange={(range: any) => {
                    setMinPrice(range.min);
                    setMaxPrice(range.max);
                  }}
                />
              </View>
            </View>
            <View className="w-full flex-col items-start justify-start space-y-4 pt-4">
              <Text className="text-sm font-normal text-black">Brand</Text>
              <View className="w-full flex-row flex-wrap space-y-3 items-start justify-start">
                {brandData.map((brand) => (
                  <TouchableOpacity
                    key={brand.id}
                    onPress={() => handleBrandToggle(brand.id)}
                    className={`w-fit px-3 py-2 border rounded-full mr-3 ${
                      selectedBrands.includes(brand.id)
                        ? "bg-primary border-primary text-[#4E4E4E]"
                        : "bg-white border-black text-black"
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        selectedBrands.includes(brand.id)
                          ? "text-[#4E4E4E]"
                          : "text-black"
                      }`}
                    >
                      {brand.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View className="w-full">
              <View className="w-full mt-3">
                <CustomButton
                  title="Apply"
                  containerStyles="bg-primary my-4 w-full py-3"
                  titleStyle="text-sm font-medium text-black"
                  handlePress={() => {
                    setShowFilter(false);
                  }}
                />
              </View>
              <View className="w-full">
                <CustomButton
                  title={minPrice === 500 ? "Cancel" : "Reset"}
                  containerStyles="bg-white border border-primary w-full py-3"
                  titleStyle="text-sm font-medium text-black"
                  handlePress={() => {
                    resetFilter();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const ProductItemComponet: React.FC<{
  data: Product;
}> = ({ data }) => {
  const navigateToDetailPage = (slug: string) => {
    router.push(`/product/${slug}`);
  };
  const { toggleFavourite, favouriteItems } = useFavouriteStore();

  const handleToggleFavourite = (product: Product) => {
    const productWithQuantity = { ...product, quantity: 1 };
    const isFavourite = favouriteItems.some((item) => item.id === data.id);

    toggleFavourite(productWithQuantity);
    Toast.show({
      type: "success",
      text1: isFavourite ? "Removed from Favourite" : "Added to Favourite",
      visibilityTime: 1000,
    });
  };

  const isFavourite = favouriteItems.some((item) => item.id === data.id);

  return (
    <View className="pb-3 mr-5">
      <View className="space-y-3 flex-col items-start justify-start">
        <TouchableOpacity
          onPress={() => navigateToDetailPage(data.id)}
          className="w-[147px] aspect-square rounded-lg"
        >
          <Image
            source={data.product_image}
            className="w-full h-full rounded-lg"
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View className="w-full space-y-2">
          <Text className="text-sm font-medium text-[#212121]">
            {data.title.substring(0, 18)}
          </Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-medium text-[#212121]">
              {formatGBPCurrency(data.price)}
            </Text>
            <TouchableOpacity onPress={() => handleToggleFavourite(data)}>
              {isFavourite ? (
                <AntDesign name="heart" size={20} color="#FFCCCC" />
              ) : (
                <FontAwesome5 name="heart" size={14} color="#FFCCCC" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GenreDetail;
