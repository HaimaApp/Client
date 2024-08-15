import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { messagesData, shopData } from "@/constants/data";
import { messageType, Product } from "@/types";
import { icons } from "@/constants";
import * as ImagePicker from "expo-image-picker";
import {
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Fee, formatGBPCurrency } from "@/helpers";
import { CustomButton, ModalPopUp } from "@/components";

const MessagedetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const chatData = messagesData.filter((item) => item.id === id);
  const router = useRouter();
  if (!chatData) {
    return <Text>Message not found</Text>;
  }

  const [messages, setMessages] = useState<messageType[]>(chatData);
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<{ uri: string } | null>(
    null
  );
  const flatListRef = useRef<FlatList>(null);
  const [offerStatus, setOfferStatus] = useState("pending");
  const [approveStatusOpen, setApproveStatusOpen] = useState(false);
  const [rejectStatusOpen, setRejectStatusOpen] = useState(false);
  const [messageId, setMessageId] = useState("");

  const renderStatus = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Image
            source={icons.pendingOfferIcon}
            alt="Pending offer"
            resizeMode="contain"
          />
        );
      case "approved":
        return (
          <Image
            source={icons.approvedOfferIcon}
            alt="Approved offer"
            resizeMode="contain"
          />
        );
      case "rejected":
        return (
          <Image
            source={icons.rejectedOfferIcon}
            alt="Rejected offer"
            resizeMode="contain"
          />
        );
      default:
        return null;
    }
  };

  const handleSend = () => {
    if (newMessage.trim() || selectedImage) {
      const content = selectedImage
        ? `${newMessage}\n${selectedImage.uri}`
        : newMessage;

      setMessages((prevMessages: any) => [
        ...prevMessages,
        {
          id: `${prevMessages.length + 1}`,
          sender: "Customer",
          receiver: "Seller",
          content,
        },
      ]);

      setNewMessage("");
      setSelectedImage(null);
    }
  };

  const handleOfferResponse = (
    messageId: string,
    status: "approved" | "rejected"
  ) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === messageId ? { ...message, offerStatus: status } : message
      )
    );
    setOfferStatus(status);
    setApproveStatusOpen(false);
    setRejectStatusOpen(false);
  };

  const handleOfferConfirmOpen = (
    id: string,
    status: "approved" | "rejected"
  ) => {
    setMessageId(id);
    if (status === "approved") {
      setApproveStatusOpen(true);
    } else {
      setRejectStatusOpen(true);
    }
  };

  const renderMessage = ({ item }: { item: messageType }) => {
    const messageParts = item.content.split("\n");
    const isOfferMessage = item.content.startsWith("New Offer");
    const productId = isOfferMessage ? item.content.split(" ")[2] : null;
    const productData: Product | any = productId
      ? shopData.find((item) => item.id === productId)
      : {};

    return (
      <View
        className={`mb-2 ${
          item.sender === "Customer"
            ? "self-end bg-primary"
            : "self-start bg-gray-200"
        } p-2 rounded`}
        style={{ maxWidth: "90%" }}
      >
        {isOfferMessage && productData && (
          <>
            <Image
              source={productData.product_image}
              style={{
                width: 250,
                height: 160,
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
                marginBottom: 10,
              }}
            />
            <Text className="text-sm font-normal text-black">
              {productData.title}
            </Text>
            <View className="w-full flex-row items-start justify-start my-2">
              {renderStatus(offerStatus)}
            </View>
            <Text>Buyer's name: John doe</Text>
            <Text>Price: {formatGBPCurrency(productData.price)}</Text>
            <View>
              <CustomButton
                title={
                  <View className="flex-row items-center justify-start space-x-2 w-full">
                    <Text className="text-sm text-black font-normal">
                      Price:
                    </Text>
                    <Text className="text-lg font-bold text-black">
                      {formatGBPCurrency(productData.price + Fee)}
                    </Text>
                  </View>
                }
                titleStyle="font-semibold"
                containerStyles="bg-primary py-3 my-3 w-full !justify-start !px-4"
              />
            </View>
            <CustomButton
              handlePress={() =>
                router.push(`/checkout/${productData.id}/payment`)
              }
              title={
                <View className="flex-row items-center justify-center space-x-2">
                  <Text className="text-sm text-black font-medium">
                    Proceed to make Payment
                  </Text>
                  <FontAwesome6
                    name="arrow-right-long"
                    size={14}
                    color="black"
                  />
                </View>
              }
              containerStyles="bg-primary p-3  my-4 w-full"
            />
          </>
        )}
        {messageParts &&
          !isOfferMessage &&
          messageParts.map((part, index) => {
            if (part.startsWith("http")) {
              return (
                <Image
                  key={index}
                  source={{ uri: part }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 8,
                    marginTop: 4,
                  }}
                />
              );
            } else if (part.startsWith("file://")) {
              return (
                <Image
                  key={index}
                  source={{ uri: part }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 8,
                    marginTop: 4,
                  }}
                />
              );
            } else {
              return <Text key={index}>{part}</Text>;
            }
          })}
        {item.offerStatus && (
          <View className="mt-2">
            <Image
              source={productData.product_image}
              style={{
                width: 250,
                height: 160,
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
                marginBottom: 10,
              }}
            />
            <Text className="text-sm font-normal text-black">
              {productData.title}
            </Text>
            <View className="w-full flex-row items-start justify-start my-2">
              {renderStatus(offerStatus)}
            </View>
            <View>
              <CustomButton
                title={
                  <View className="flex-row items-center justify-start space-x-2 w-full">
                    <Text className="text-sm text-black font-normal">
                      Price:
                    </Text>
                    <Text className="text-lg font-bold text-black">
                      {formatGBPCurrency(productData.price + Fee)}
                    </Text>
                  </View>
                }
                titleStyle="font-semibold"
                containerStyles="bg-primary py-3 my-3 w-full !justify-start !px-4"
              />
            </View>
            {item.receiver === "Seller" && item.offerStatus === "pending" && (
              <View className="flex-row space-x-2 w-full justify-between">
                <View className="w-2/4">
                  <CustomButton
                    title="Accept offer"
                    titleStyle="font-semibold"
                    containerStyles="bg-primary py-3 my-3 w-full"
                    handlePress={() =>
                      handleOfferConfirmOpen(item.id, "approved")
                    }
                  />
                </View>
                <View className="w-[45%]">
                  <CustomButton
                    title="Reject offer"
                    titleStyle="font-semibold"
                    containerStyles="bg-white border border-black py-3 my-3 w-full"
                    handlePress={() =>
                      handleOfferConfirmOpen(item.id, "rejected")
                    }
                  />
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage({ uri: result.assets[0].uri });
    }
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <SafeAreaView className="w-full flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="w-full flex-1 px-5 py-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center justify-start space-x-2"
          >
            <Ionicons name="chevron-back" size={24} color="#000000" />
            <Text className="text-xl font-medium text-black">
              {chatData[0].sender}
            </Text>
          </TouchableOpacity>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={{ paddingVertical: 20 }}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            showsVerticalScrollIndicator={false}
            onLayout={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />
          <View className="relative">
            {selectedImage && (
              <View className="flex-row items-start p-4 border-t border-black/10 relative">
                <Image
                  source={{ uri: selectedImage.uri }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    marginRight: 8,
                  }}
                />
                <TouchableOpacity
                  onPress={() => setSelectedImage(null)}
                  className=""
                >
                  <Fontisto name="close" size={14} color="black" />
                </TouchableOpacity>
              </View>
            )}

            <View className="flex-row items-center h-14 border rounded border-[#98A2B3] overflow-hidden">
              <TouchableOpacity
                onPress={handleImagePick}
                className="px-2 rotate-[120deg]"
              >
                <MaterialCommunityIcons
                  name="attachment"
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
              <TextInput
                className="flex-1"
                placeholder="Type your message..."
                value={newMessage}
                onChangeText={setNewMessage}
                multiline={true}
                numberOfLines={2}
              />
              <TouchableOpacity
                onPress={handleSend}
                className="w-fit bg-primary flex-row items-center justify-center px-3 h-full"
              >
                <Image
                  source={icons.sendIcon}
                  alt="send message icon"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <ModalPopUp visible={approveStatusOpen} className="">
        <View className="items-center flex-col justify-center space-y-6 py-3">
          <Text className="text-base font-medium text-dark text-center">
            Are you sure you want to accept the offer?
          </Text>
          <View className="flex-row space-x-2 w-full justify-between">
            <View className="w-2/4">
              <CustomButton
                title="Accept offer"
                titleStyle="font-semibold"
                containerStyles="bg-primary py-3 my-3 w-full"
                handlePress={() => handleOfferResponse(messageId, "approved")}
              />
            </View>
            <View className="w-[45%]">
              <CustomButton
                title="Cancel"
                titleStyle="font-semibold"
                containerStyles="bg-white border border-black py-3 my-3 w-full"
                handlePress={() => {
                  setApproveStatusOpen(false);
                  setRejectStatusOpen(false);
                  setMessageId("");
                  setOfferStatus("pending");
                }}
              />
            </View>
          </View>
        </View>
      </ModalPopUp>
      <ModalPopUp
        visible={rejectStatusOpen}
        className="!bg-[#FFFAFA] border border-primary"
      >
        <View className="items-center flex-col justify-center space-y-6 py-3">
          <Text className="text-base font-medium text-dark text-center">
            Are you sure you want to reject the offer?
          </Text>
          <View className="flex-row space-x-2 w-full justify-between">
            <View className="w-2/4">
              <CustomButton
                title="Reject offer"
                titleStyle="font-semibold"
                containerStyles="bg-primary py-3 my-3 w-full"
                handlePress={() => handleOfferResponse(messageId, "rejected")}
              />
            </View>
            <View className="w-[45%]">
              <CustomButton
                title="Cancel"
                titleStyle="font-semibold"
                containerStyles="bg-white border border-black py-3 my-3 w-full"
                handlePress={() => {
                  setRejectStatusOpen(false);
                  setApproveStatusOpen(false);
                  setOfferStatus("pending");
                  setMessageId("");
                }}
              />
            </View>
          </View>
        </View>
      </ModalPopUp>
    </SafeAreaView>
  );
};

export default MessagedetailScreen;
