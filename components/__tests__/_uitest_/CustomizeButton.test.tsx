import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CustomButton from "@/components/ui/CustomizeButton";

jest.mock("@/constants", () => ({
  icons: {
    whiteLoadingIcon: "@/assets/icons/whiteLoadingIcon.png",
  },
}));

describe("CustomButton Component", () => {
  // Unit Tests
  it("renders correctly with given props", () => {
    const { getByText } = render(
      <CustomButton title="Click Me" containerStyles="bg-blue-500" />
    );

    expect(getByText("Click Me")).toBeTruthy();
  });

  it("displays the loading indicator when isLoading is true", () => {
    const { getByTestId } = render(
      <CustomButton
        title="Loading"
        containerStyles="bg-blue-500"
        isLoading={true}
      />
    );

    const loadingImage = getByTestId("loading-image");
    expect(loadingImage).toBeTruthy();
  });

  it("disables the button when disabled is true", () => {
    const { getByRole } = render(
      <CustomButton
        title="Disabled"
        containerStyles="bg-blue-500"
        disabled={true}
      />
    );

    const button = getByRole("button");
    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  it("applies the correct styles when isLoading or disabled is true", () => {
    const { getByTestId, rerender } = render(
      <CustomButton
        title="Styled Button"
        containerStyles="bg-blue-500"
        isLoading={true}
      />
    );

    let button = getByTestId("custom-button");
    let styles = button.props.style;
    styles = Array.isArray(styles) ? styles : [styles]; // Ensure styles is an array

    const opacityStyle = styles.find((style: any) => style.opacity === 0.9);
    expect(opacityStyle).toBeTruthy();

    rerender(
      <CustomButton
        title="Styled Button"
        containerStyles="bg-blue-500"
        disabled={true}
      />
    );

    button = getByTestId("custom-button");
    styles = button.props.style;
    styles = Array.isArray(styles) ? styles : [styles]; // Ensure styles is an array

    const newOpacityStyle = styles.find((style: any) => style.opacity === 0.9);
    expect(newOpacityStyle).toBeTruthy();
  });

  // Integration Tests
  it("calls handlePress function when the button is pressed", () => {
    const handlePress = jest.fn();
    const { getByRole } = render(
      <CustomButton
        title="Press Me"
        containerStyles="bg-blue-500"
        handlePress={handlePress}
      />
    );

    const button = getByRole("button");
    fireEvent.press(button);
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it("does not call handlePress function when the button is disabled or loading", () => {
    const handlePress = jest.fn();
    const { getByRole, rerender } = render(
      <CustomButton
        title="No Press"
        containerStyles="bg-blue-500"
        handlePress={handlePress}
        isLoading={true}
      />
    );

    let button = getByRole("button");
    fireEvent.press(button);
    expect(handlePress).not.toHaveBeenCalled();

    rerender(
      <CustomButton
        title="No Press"
        containerStyles="bg-blue-500"
        handlePress={handlePress}
        disabled={true}
      />
    );

    button = getByRole("button");
    fireEvent.press(button);
    expect(handlePress).not.toHaveBeenCalled();
  });
});
