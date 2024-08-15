import { render, fireEvent } from "@testing-library/react-native";
import { formatGBPCurrency } from "@/helpers";
import { Product } from "@/types";
import ProductItem from "@/components/shop/ProductItem";

// Mock the router module
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

// Sample product data
const sampleProduct: Product = {
  id: "test-slug",
  title: "Test Product Title That Is Long",
  price: 1234.56,
  product_image: require("@/assets/images/productImage1.png"),
  quantity: 1,
};

describe("ProductItem Component", () => {
  it("renders correctly with given props", () => {
    console.log("Rendering ProductItem with props");
    const { getByTestId } = render(<ProductItem data={sampleProduct} />);

    // Check if the title is rendered correctly
    console.log("Checking product title");
    const title = getByTestId("product-title");
    expect(title.props.children).toBe(sampleProduct.title.substring(0, 18));

    // Check if the price is formatted correctly
    console.log("Checking product price");
    const price = getByTestId("product-price");
    expect(price.props.children).toBe(formatGBPCurrency(sampleProduct.price));

    // Check if the image is rendered
    console.log("Checking product image");
    const image = getByTestId("product-image");
    expect(image).toBeTruthy();
  });

  it("navigates to the correct detail page when image is pressed", () => {
    console.log("Testing navigation to detail page");
    const { getByTestId } = render(<ProductItem data={sampleProduct} />);

    // Mock function for navigation
    const { push } = require("expo-router").router;

    // Find the image element and simulate press event
    const imageElement = getByTestId("product-image");
    fireEvent.press(imageElement);

    // Check if the router push function is called with the correct slug
    expect(push).toHaveBeenCalledWith(`/product/${sampleProduct.id}`);
  });

  it("renders the heart icon", () => {
    console.log("Testing rendering of heart icon");
    const { getByTestId } = render(<ProductItem data={sampleProduct} />);

    // Check if the heart icon is rendered
    const heartIcon = getByTestId("heart-icon");
    expect(heartIcon).toBeTruthy();
  });
});
