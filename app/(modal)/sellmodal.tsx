import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import { ImageType, sellItemFormType } from "@/types";
import { sellFormSchema } from "@/schema";
import { CustomButton, FormField } from "@/components";
import {
  BrandBottomSheet,
  CategoryBottomSheet,
  ColorBottomSheet,
  ConditionBottomSheet,
  PriceBottomSheet,
  SizeBottomSheet,
} from "@/components/ui/BottomSheetComponent";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

const SellModalScreen = () => {
  const [remainingWords, setRemainingWords] = useState(1000);
  const [successUploadingModal, setSuccessUploadingModal] = useState(false);
  const categortBottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
  const brandBottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
  const conditionBottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
  const colorBottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
  const sizeBottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
  const priceBottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
  const flatListRef = useRef<FlatList>(null);

  const initialValues: sellItemFormType = {
    images: [],
    item_name: "",
    item_description: "",
    category: "",
    brand: "",
    condition: "",
    size: "",
    color: [],
    price: "",
  };

  const onSubmit = (payload: sellItemFormType) => {
    console.log(payload);
    setSuccessUploadingModal(true);
  };

  const {
    values,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    handleChange,
    handleBlur,
    touched,
    errors,
  } = useFormik({
    initialValues,
    validationSchema: sellFormSchema,
    onSubmit,
  });

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 20,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset, index) => ({
        uri: asset.uri,
        name: asset.fileName || `image_${index}`,
        type: asset.type || "image/jpeg",
      }));

      const uniqueImages = selectedImages.filter(
        (asset) => !values.images.some((image) => image.name === asset.name)
      );

      if (uniqueImages.length === 0) {
        Alert.alert("Duplicate Image", "This image is already selected.");
      } else {
        setFieldValue("images", [...values.images, ...uniqueImages]);
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    }
  };

  const removeImage = (index: number) => {
    const filterImage = values.images.filter((_, i) => i !== index);
    setFieldValue("images", filterImage);
  };

  const handleDescriptionChange = (text: string) => {
    const words = text.length;
    if (words <= 1000) {
      setFieldValue("item_description", text);
      setRemainingWords(1000 - words);
    }
  };

  const renderImage = ({ item, index }: { item: ImageType; index: number }) => (
    <View
      key={index}
      className="w-[90px] h-[90px] border border-[#E6B8B8] rounded flex-row items-center justify-center space-y-2 relative px-4 mr-5 mt-2"
    >
      <View className="w-full h-full p-4 flex-row items-center justify-center">
        <Image
          source={{ uri: item.uri }}
          style={{ width: 80, height: 80 }}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        onPress={() => removeImage(index)}
        className="absolute -top-5 -right-3"
      >
        <Ionicons name="close-circle" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView className="flex-1 w-full bg-white">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center justify-between space-x-2 border-b-2 border-[#F0F2F5] w-full py-3 px-5"
          >
            <Ionicons name="close" size={28} />
            <Text className="text-2xl font-medium text-black w-[70%]">
              Sell an item
            </Text>
          </TouchableOpacity>
          <ScrollView
            contentContainerStyle={{
              paddingVertical: 20,
              flexGrow: 1,
            }}
          >
            <View className="flex-col items-start justify-start space-y-6 w-full">
              <View className="w-full flex-col items-start justify-start space-y-4 px-5">
                <View className="w-full flex-col items-center justify-center pb-5 space-y-6">
                  <Text className="text-xs font-normal text-[#98A2B3]">
                    You can add up to 20 item images
                  </Text>

                  {values.images.length === 0 && (
                    <CustomButton
                      handlePress={pickImages}
                      title={
                        <View className="flex-row items-end justify-center space-x-2">
                          <Feather name="plus" size={20} color="black" />
                          <Text className="text-sm text-black font-semibold">
                            Upload images
                          </Text>
                        </View>
                      }
                      containerStyles={`bg-white border px-3 mt-6 ${
                        touched.images && errors.images
                          ? "border-red-400"
                          : "border-primary"
                      }`}
                    />
                  )}
                  {touched.images && errors.images ? (
                    <View>
                      <View className="flex-row items-center space-x-2 mt-2">
                        <MaterialIcons
                          name="error-outline"
                          size={16}
                          color="red"
                        />
                        <Text style={{ color: "red" }}>
                          {Array.isArray(errors.images)
                            ? errors.images.join(", ")
                            : errors.images}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                  {values.images.length > 0 && (
                    <View className="w-full">
                      <FlatList
                        ref={flatListRef}
                        data={[
                          ...values.images,
                          {
                            uri: "add-more",
                            name: "add-more",
                            type: "add-more",
                          },
                        ]}
                        renderItem={({ item, index }) =>
                          item.uri === "add-more" ? (
                            <TouchableOpacity
                              onPress={pickImages}
                              className="w-[90px] h-[90px] border border-primary rounded flex-row items-center justify-center space-y-2 relative px-4 mr-5 mt-2"
                            >
                              <Feather name="plus" size={24} color="black" />
                            </TouchableOpacity>
                          ) : (
                            renderImage({ item, index })
                          )
                        }
                        keyExtractor={(item) => item.uri}
                        horizontal
                      />
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => router.push("/(modal)/photoguildmodal")}
                  className="w-full flex-row items-center justify-center"
                >
                  <Text className="text-base font-semibold text-primary underline">
                    Read our photo tips
                  </Text>
                </TouchableOpacity>
                <View className="w-full flex-col items-start">
                  <Text className="text-sm font-medium text-black">
                    Enter Item description to upload
                  </Text>
                  <View className="relative w-full">
                    <FormField
                      title={
                        <Text className="text-sm font-medium text-black">
                          Product name
                        </Text>
                      }
                      titleShow={true}
                      value={values.item_name}
                      handleChangeText={handleChange("item_name")}
                      onBlur={handleBlur("item_name")}
                      otherStyles="mt-4"
                      placeholder="Enter item name"
                      errorClass={`${
                        touched.item_name && errors.item_name
                          ? "!border-red-500"
                          : ""
                      } px-4`}
                    />
                    {touched.item_name && errors.item_name ? (
                      <View className="flex-row items-center space-x-2 mt-2">
                        <MaterialIcons
                          name="error-outline"
                          size={16}
                          color="red"
                        />
                        <Text style={{ color: "red" }}>{errors.item_name}</Text>
                      </View>
                    ) : null}
                  </View>
                  <View className="relative w-full">
                    <FormField
                      title={
                        <Text className="text-sm font-medium text-black">
                          Product description
                        </Text>
                      }
                      titleShow={true}
                      value={values.item_description}
                      handleChangeText={handleDescriptionChange}
                      onBlur={handleBlur("item_description")}
                      otherStyles="mt-2"
                      placeholder="Enter item description here.."
                      errorClass={`!h-[110px] ${
                        touched.item_description && errors.item_description
                          ? "!border-red-500"
                          : ""
                      } px-4 pt-4`}
                      multiline={true}
                      numberOfLines={4}
                      style={{ textAlignVertical: "top" }}
                    />

                    {touched.item_description && errors.item_description ? (
                      <View className="flex-row items-center space-x-2 mt-2">
                        <MaterialIcons
                          name="error-outline"
                          size={16}
                          color="red"
                        />
                        <Text style={{ color: "red" }}>
                          {errors.item_description}
                        </Text>
                      </View>
                    ) : null}
                    <View className="w-full flex-row items-end justify-end">
                      <Text className="text-sm text-gray-500 mt-2">
                        {remainingWords}
                      </Text>
                    </View>
                  </View>

                  <View className="w-full flex-col items-start justify-start space-y-3 border-t-[4px] py-4 mt-4 border-black/20">
                    <Text className="text-lg font-semibold text-black">
                      Info
                    </Text>
                    <View className="w-full">
                      <View
                        className={`w-full flex-row items-center justify-between border-b pb-3 ${
                          touched.category && errors.category
                            ? "!border-red-500"
                            : "border-black/20"
                        }`}
                      >
                        <Text className="text-base font-medium text-black">
                          Category
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            categortBottomSheetModalRef.current?.present()
                          }
                          className="flex-row items-center justify-end space-x-2"
                        >
                          <Text className="text-sm font-medium text-gray-600">
                            {values.category === ""
                              ? "Select"
                              : values.category}
                          </Text>
                          <Feather
                            name="chevron-right"
                            size={24}
                            color="#4b5563"
                          />
                        </TouchableOpacity>
                      </View>

                      {touched.category && errors.category ? (
                        <View className="flex-row items-center space-x-2 mt-2">
                          <MaterialIcons
                            name="error-outline"
                            size={16}
                            color="red"
                          />
                          <Text style={{ color: "red" }}>
                            {errors.category}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                    <View className="w-full">
                      <View
                        className={`w-full flex-row items-center justify-between border-b pb-3 ${
                          touched.brand && errors.brand
                            ? "!border-red-500"
                            : "border-black/20"
                        }`}
                      >
                        <Text className="text-base font-medium text-black">
                          Brand
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            brandBottomSheetModalRef.current?.present()
                          }
                          className="flex-row items-center justify-end space-x-2"
                        >
                          <Text className="text-sm font-medium text-gray-600">
                            {values.brand === "" ? "Select" : values.brand}
                          </Text>
                          <Feather
                            name="chevron-right"
                            size={24}
                            color="#4b5563"
                          />
                        </TouchableOpacity>
                      </View>
                      {touched.brand && errors.brand ? (
                        <View className="flex-row items-center space-x-2 mt-2">
                          <MaterialIcons
                            name="error-outline"
                            size={16}
                            color="red"
                          />
                          <Text style={{ color: "red" }}>{errors.brand}</Text>
                        </View>
                      ) : null}
                    </View>
                    <View className="w-full">
                      <View
                        className={`w-full flex-row items-center justify-between border-b pb-3 ${
                          touched.condition && errors.condition
                            ? "!border-red-500"
                            : "border-black/20"
                        }`}
                      >
                        <Text className="text-base font-medium text-black">
                          Condition
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            conditionBottomSheetModalRef.current?.present()
                          }
                          className="flex-row items-center justify-end space-x-2"
                        >
                          <Text className="text-sm font-medium text-gray-600">
                            {values.condition === ""
                              ? "Select"
                              : values.condition}
                          </Text>
                          <Feather
                            name="chevron-right"
                            size={24}
                            color="#4b5563"
                          />
                        </TouchableOpacity>
                      </View>
                      {touched.condition && errors.condition ? (
                        <View className="flex-row items-center space-x-2 mt-2">
                          <MaterialIcons
                            name="error-outline"
                            size={16}
                            color="red"
                          />
                          <Text style={{ color: "red" }}>
                            {errors.condition}
                          </Text>
                        </View>
                      ) : null}
                    </View>

                    <View className="w-full flex-row items-center justify-between border-b border-black/20 pb-3">
                      <Text className="text-base font-medium text-black">
                        Color
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          colorBottomSheetModalRef.current?.present()
                        }
                        className="flex-row items-center justify-end space-x-2"
                      >
                        <Text className="text-sm font-medium text-gray-600">
                          {values.color.length === 0
                            ? "Select"
                            : values.color.join(", ")}
                        </Text>
                        <Feather
                          name="chevron-right"
                          size={24}
                          color="#4b5563"
                        />
                      </TouchableOpacity>
                    </View>
                    <View className="w-full flex-row items-center justify-between border-b border-black/20 pb-3">
                      <Text className="text-base font-medium text-black">
                        Size
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          sizeBottomSheetModalRef.current?.present()
                        }
                        className="flex-row items-center justify-end space-x-2"
                      >
                        <Text className="text-sm font-medium text-gray-600">
                          {values.size === "" ? "Select" : values.size}
                        </Text>
                        <Feather
                          name="chevron-right"
                          size={24}
                          color="#4b5563"
                        />
                      </TouchableOpacity>
                    </View>

                    <View className="w-full">
                      <View
                        className={`w-full flex-row items-center justify-between border-b pb-3 ${
                          touched.condition && errors.condition
                            ? "!border-red-500"
                            : "border-black/20"
                        }`}
                      >
                        <Text className="text-base font-medium text-black">
                          Price
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            priceBottomSheetModalRef.current?.present()
                          }
                          className="flex-row items-center justify-end space-x-2"
                        >
                          <Text className="text-sm font-medium text-gray-600">
                            {values.price === ""
                              ? "Select"
                              : `£ ${values.price}.00`}
                          </Text>
                          <Feather
                            name="chevron-right"
                            size={24}
                            color="#4b5563"
                          />
                        </TouchableOpacity>
                      </View>
                      {touched.price && errors.price ? (
                        <View className="flex-row items-center space-x-2 mt-2">
                          <MaterialIcons
                            name="error-outline"
                            size={16}
                            color="red"
                          />
                          <Text style={{ color: "red" }}>{errors.price}</Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View className="w-full flex-row items-center space-x-3 px-5 py-4 bg-white">
            <View className="w-2/4">
              <CustomButton
                handlePress={() => handleSubmit()}
                title="Save to drafts"
                containerStyles="bg-white border border-dark !min-h-[48px]"
                titleStyle="text-dark font-medium text-base"
                disabled={isSubmitting}
              />
            </View>
            <View className="w-2/4">
              <CustomButton
                handlePress={() => handleSubmit()}
                title="Upload"
                containerStyles="bg-primary !min-h-[48px]"
                titleStyle="text-white font-medium text-base"
                disabled={isSubmitting}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <CategoryBottomSheet
        bottomSheetModalRef={categortBottomSheetModalRef}
        setFieldValue={setFieldValue}
        value={values.category}
      />
      <BrandBottomSheet
        bottomSheetModalRef={brandBottomSheetModalRef}
        setFieldValue={setFieldValue}
      />
      <ConditionBottomSheet
        bottomSheetModalRef={conditionBottomSheetModalRef}
        setFieldValue={setFieldValue}
        value={values.condition}
      />
      <ColorBottomSheet
        bottomSheetModalRef={colorBottomSheetModalRef}
        setFieldValue={setFieldValue}
        value={values.color}
      />
      <SizeBottomSheet
        bottomSheetModalRef={sizeBottomSheetModalRef}
        setFieldValue={setFieldValue}
        value={values.size}
      />
      <PriceBottomSheet
        bottomSheetModalRef={priceBottomSheetModalRef}
        setFieldValue={setFieldValue}
        value={values.price}
      />
      {successUploadingModal && (
        <View
          style={{
            position: "absolute",
            top: 40,
            right: 0,
            left: 0,
            bottom: 0,
            backgroundColor: "#fff",
            elevation: 3,
            zIndex: 9999,
            width: "100%",
            maxHeight: screenHeight,
            flexGrow: 1,
          }}
          className="flex-col items-center justify-center space-y-5"
        >
          <Text className="text-sm text-center font-medium text-[#6B5656]">
            Item Listed Successfully
          </Text>
          <CustomButton
            title="View item"
            containerStyles="bg-primary my-8 w-fit px-6 py-3"
            titleStyle="text-sm font-medium text-black"
            handlePress={() => {
              router.replace("/home");
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SellModalScreen;
