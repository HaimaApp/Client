import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="forgetpassword" options={{ headerShown: false }} />
        <Stack.Screen
          name="profiledetail/[detail]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profiledetail/success"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="resetpassword/otpcode/[otp]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="resetpassword/[email]/reset"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="resetpassword/success"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="verifyemail/[code]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="verifyemail/success"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar backgroundColor="#FFFFFF" style="dark" />
    </>
  );
};

export default AuthLayout;
