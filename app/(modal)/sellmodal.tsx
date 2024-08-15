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
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  Feather,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import { ImageType, sellItemFormType } from "@/types";
import { sellFormSchema } from "@/schema";
import { CustomButton, FormField } from "@/components";
import { icons } from "@/constants";

const SellModalScreen = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: number]: number;
  }>({});
  const [uploading, setUploading] = useState<boolean>(false);
  const [errorUploading, setErrorUploading] = useState(false);
  const [successUploadingModal, setSuccessUploadingModal] = useState(false);

  const initialValues: sellItemFormType = {
    images: [],
    item_name: "",
    item_description: "",
    brand: "",
    condition: "",
    price: "",
  };

  const onSubmit = (payload: sellItemFormType, action: any) => {
    console.log(payload);
    setSuccessUploadingModal(true);
    action.resetForm();
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
      setErrorUploading(false);
      const selectedImages = result.assets.map((asset) => ({
        uri: asset.uri,
        name: asset.fileName || "unknown",
        type: asset.type || "image/jpeg",
      }));
      setImages(selectedImages);
      setFieldValue("images", selectedImages);
      await uploadImages(selectedImages);
    }
    if (result.canceled) {
      setErrorUploading(true);
    }
  };

  const uploadImages = async (
    imagesToUpload: { uri: string; name: string; type: string }[]
  ) => {
    setUploading(true);
    const uploadPromises = imagesToUpload.map((_, index) =>
      simulateUpload(_, index)
    );
    await Promise.all(uploadPromises);
    setUploading(false);
  };

  const simulateUpload = (_: any, index: number) => {
    return new Promise<void>((resolve) => {
      const totalTime = 3000; // 10 seconds
      const intervalTime = 100;
      let progress = 0;

      const interval = setInterval(() => {
        progress += (intervalTime / totalTime) * 100;
        setUploadProgress((prev) => ({ ...prev, [index]: progress }));

        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, intervalTime);
    });
  };

  const removeImage = (index: number) => {
    const filterImage = images.filter((_, i) => i !== index);
    setImages(filterImage);
    setFieldValue("images", filterImage);
    const newProgress = { ...uploadProgress };
    delete newProgress[index];
    setUploadProgress(newProgress);
  };

  const clearImage = () => {
    setImages([]);
    setFieldValue("images", []);
  };

  const renderImage = ({
    item,
    index,
  }: {
    item: { uri: string; name: string; type: string };
    index: number;
  }) => (
    <View
      key={index}
      className="w-[90px] h-[90px] border border-[#E6B8B8] rounded flex-row items-center justify-center space-y-2 relative px-4 mr-5"
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
        className="absolute top-0 right-1"
      >
        <Fontisto name="close" size={14} color="black" />
      </TouchableOpacity>
    </View>
  );

  const getOverallProgress = () => {
    const totalProgress = Object.values(uploadProgress).reduce(
      (acc, curr) => acc + curr,
      0
    );
    return images.length > 0 ? totalProgress / images.length : 0;
  };

  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView className="flex-1 w-full bg-white">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 20,
            flexGrow: 1,
          }}
        >
          <View className="flex-col items-start justify-start space-y-6 w-full">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-row items-center justify-start space-x-2 px-5"
            >
              <Ionicons name="close" size={24} color="#ffcccc" />
              <Text className="text-base font-medium text-primary">Close</Text>
            </TouchableOpacity>
            <Text className="text-3xl font-normal text-[#6B5656] border-b-2 border-[#F0F2F5] w-full pb-3  px-5">
              Sell
            </Text>
            <View className="w-full flex-col items-start justify-start space-y-4 px-5">
              <View className="w-full flex-col items-start justify-start space-y-6">
                <View
                  className={`w-full border-[1.5px]  border-dashed ${
                    images.length > 0 && !uploading
                      ? "border-[#5FC381]"
                      : uploading
                      ? "border-primary bg-[#FBFEFC]"
                      : errorUploading
                      ? "border-[#CB1A14] bg-[#FEFBFB]"
                      : "border-[#D0D5DD]"
                  } h-[240px] flex-col items-center justify-center`}
                >
                  {images.length === 0 && !uploading && !errorUploading && (
                    <View className="w-full h-full flex-col items-center justify-center space-y-3">
                      <Image
                        source={icons.uploadClickIcon}
                        alt="upload icon"
                        resizeMode="contain"
                      />
                      <Text className="text-sm font-semibold text-black">
                        Click to upload
                      </Text>
                      <Text className="text-xs font-normal text-[#98A2B3]">
                        You can add up to 20 item images
                      </Text>
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
                        containerStyles="bg-primary px-3 mt-2"
                      />
                    </View>
                  )}
                  {uploading && (
                    <View className="w-full h-full flex-col items-center justify-center space-y-3">
                      <Image
                        source={icons.uploadingImageIcon}
                        alt="upload icon"
                        resizeMode="contain"
                      />
                      <View className="w-[90%] h-2 rounded-full bg-[#fcd2c28a] overflow-hidden">
                        <View
                          style={{
                            width: `${getOverallProgress()}%`,
                          }}
                          className="h-full bg-primary"
                        />
                      </View>
                      <Text className="text-sm font-semibold text-black">
                        Uploading Images
                      </Text>
                      <Text className="text-xs font-normal text-[#98A2B3]">
                        {images.length} of items
                      </Text>
                    </View>
                  )}
                  {images.length > 0 && !uploading && (
                    <View className="w-full h-full flex-col items-center justify-center space-y-3">
                      <Image
                        source={icons.successUploadIcon}
                        alt="success upload icon"
                        resizeMode="contain"
                      />
                      <Text className="text-sm font-semibold text-black">
                        Image upload successful
                      </Text>
                      <Text className="text-xs font-normal text-[#98A2B3]">
                        {images.length} of items
                      </Text>
                      <CustomButton
                        handlePress={() => clearImage()}
                        title={
                          <View className="flex-row items-center justify-center space-x-2">
                            <FontAwesome5
                              name="trash-alt"
                              size={16}
                              color="black"
                            />
                            <Text className="text-sm text-black font-semibold">
                              Clear Upload
                            </Text>
                          </View>
                        }
                        containerStyles="bg-white px-3 mt-2"
                      />
                    </View>
                  )}
                  {errorUploading && (
                    <View className="w-full h-full flex-col items-center justify-center space-y-3">
                      <Image
                        source={icons.errorUploadIcon}
                        alt="error upload icon"
                        resizeMode="contain"
                      />
                      <Text className="text-sm font-semibold text-black">
                        Uploading Images
                      </Text>
                      <Text className="text-xs font-normal text-[#98A2B3]">
                        No Image selected
                      </Text>
                      <CustomButton
                        handlePress={pickImages}
                        title={
                          <View className="flex-row items-center justify-center space-x-2">
                            <Image
                              source={icons.retryIcon}
                              alt="retry icon"
                              resizeMode="contain"
                            />
                            <Text className="text-sm text-black font-semibold">
                              Try Again
                            </Text>
                          </View>
                        }
                        containerStyles="bg-white px-3 mt-2"
                      />
                    </View>
                  )}
                </View>
                {images.length > 0 && !uploading && (
                  <View className="w-full">
                    <FlatList
                      data={images}
                      renderItem={renderImage}
                      keyExtractor={(item) => item.uri}
                      horizontal
                    />
                  </View>
                )}
              </View>
              <View className="w-full flex-col items-start">
                <Text className="text-sm font-medium text-black">
                  Enter Item description to upload
                </Text>
                <View className="relative w-full">
                  <FormField
                    title={
                      <Text className="text-sm font-medium text-black">
                        Item name
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
                        Item description
                      </Text>
                    }
                    titleShow={true}
                    value={values.item_description}
                    handleChangeText={handleChange("item_description")}
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
                </View>
                <View className="relative w-full">
                  <FormField
                    title={
                      <Text className="text-sm font-medium text-black">
                        Brand
                      </Text>
                    }
                    titleShow={true}
                    value={values.brand}
                    handleChangeText={handleChange("brand")}
                    onBlur={handleBlur("brand")}
                    otherStyles="mt-2"
                    placeholder="Enter brand"
                    errorClass={`${
                      touched.brand && errors.brand ? "!border-red-500" : ""
                    } px-4`}
                  />
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
                <View className="relative w-full">
                  <FormField
                    title={
                      <Text className="text-sm font-medium text-black">
                        Condition
                      </Text>
                    }
                    titleShow={true}
                    value={values.condition}
                    handleChangeText={handleChange("condition")}
                    onBlur={handleBlur("condition")}
                    otherStyles="mt-2"
                    placeholder="Enter condition"
                    errorClass={`${
                      touched.condition && errors.condition
                        ? "!border-red-500"
                        : ""
                    } px-4`}
                  />
                  {touched.condition && errors.condition ? (
                    <View className="flex-row items-center space-x-2 mt-2">
                      <MaterialIcons
                        name="error-outline"
                        size={16}
                        color="red"
                      />
                      <Text style={{ color: "red" }}>{errors.condition}</Text>
                    </View>
                  ) : null}
                </View>
                <View className="relative w-full">
                  <FormField
                    title={
                      <Text className="text-sm font-medium text-black">
                        Price
                      </Text>
                    }
                    titleShow={true}
                    value={values.price}
                    handleChangeText={handleChange("price")}
                    onBlur={handleBlur("price")}
                    otherStyles="mt-2"
                    placeholder="Enter price"
                    keyboardType="numeric"
                    errorClass={`${
                      touched.price && errors.price ? "!border-red-500" : ""
                    } px-4`}
                  />
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
                <CustomButton
                  title="Upload"
                  containerStyles="bg-primary mt-8 w-full py-3"
                  titleStyle="text-base font-medium text-black"
                  isLoading={isSubmitting}
                  handlePress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
            Item upload succesfull
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
