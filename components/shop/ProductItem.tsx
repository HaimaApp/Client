import { formatGBPCurrency } from "@/helpers";
import useFavouriteStore from "@/store/favorite";
import { Product } from "@/types";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Toast from "react-native-toast-message";

type ProductType = {
  data: Product;
};

const ProductItem: React.FC<ProductType> = ({ data }) => {
  const { toggleFavourite, favouriteItems } = useFavouriteStore();
  const navigateToDetailPage = (slug: string) => {
    router.push(`/product/${slug}`);
  };

  const handleToggleFavourite = (product: Product) => {
    const productWithQuantity = { ...product, quantity: 1 };
    toggleFavourite(productWithQuantity);
    Toast.show({
      type: "success",
      text1: isFavourite ? "Removed from Favourite" : "Added to Favourite",
      visibilityTime: 1000,
    });
  };

  const isFavourite = favouriteItems.some((item) => item.id === data.id);

  return (
    <View className="mx-auto pb-3">
      <View className="space-y-3 flex-col">
        <TouchableOpacity
          onPress={() => navigateToDetailPage(data.id)}
          className="w-[124px] aspect-square rounded-lg"
          testID="product-image"
        >
          <Image
            source={data.product_image}
            className="w-full h-full rounded-lg"
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View className="w-full space-y-2">
          <Text
            className="text-sm font-medium text-[#212121]"
            testID="product-title"
          >
            {data.title.substring(0, 18)}
          </Text>
          <View className="flex-row items-center justify-between">
            <Text
              className="text-xs font-medium text-[#212121]"
              testID="product-price"
            >
              {formatGBPCurrency(data.price)}
            </Text>
            <TouchableOpacity
              testID="heart-icon"
              onPress={() => handleToggleFavourite(data)}
            >
              {isFavourite ? (
                <AntDesign name="heart" size={14} color="#FFCCCC" />
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

export default ProductItem;
