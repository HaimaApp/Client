import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ModalLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sellmodal"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
            headerShown: false,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="photoguildmodal"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
            headerShown: false,
            headerTransparent: true,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#FFFFFF" style="dark" />
    </>
  );
};

export default ModalLayout;
