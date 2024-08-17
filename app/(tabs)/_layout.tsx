import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { icons } from "@/constants";
import { useLinkTo } from "@react-navigation/native";

type tabIconType = {
  icon: ImageSourcePropType | undefined;
  color: string;
  name: string;
};

const TabIcon = ({ icon, color, name }: tabIconType) => (
  <View
    className={`items-center justify-center space-y-1 transition-all duration-300`}
  >
    <Image source={icon} resizeMode="contain" tintColor={color} />
    <Text className={`text-sm font-normal`} style={{ color: color }}>
      {name}
    </Text>
  </View>
);

const TabLayout = () => {
  const linkTo = useLinkTo();
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#000000",
          tabBarInactiveTintColor: "#000000",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            height: 80,
            shadowColor: "#10192812",
            shadowOffset: { width: 0, height: -7 },
            shadowOpacity: 0.3,
            shadowRadius: 24.8,
            elevation: 5,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused ? icons.focusedHomeIcon : icons.homeIcon}
                color={color}
                name="Home"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="category"
          options={{
            title: "Categories",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon
                icon={icons.searchIcon}
                color={color}
                name="Categories"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="sell"
          options={{
            title: "Sell",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused ? icons.focusedCartIcon : icons.cartIcon}
                color={color}
                name="Sell"
              />
            ),
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={(e) => {
                  e.preventDefault();
                  linkTo("/(modal)/sellmodal");
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: "Messages",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused ? icons.focusedMessageIcon : icons.messageIcon}
                color={color}
                name="Messages"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused ? icons.avatarIcon : icons.profileIcon}
                color={color}
                name="Profile"
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#FFFFFF" style="dark" />
    </>
  );
};

export default TabLayout;
