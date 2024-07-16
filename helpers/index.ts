import * as WebBrowser from "expo-web-browser";

export const Fee = 500;

export const handleExternalLink = (url: string) => {
  WebBrowser.openBrowserAsync(url);
};

export const formatNGNCurrency = (value: number) => {
  const formattedValue = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

  return formattedValue.replace("₦", "₦ ");
};

export function cardNumberFormatter(
  oldValue: string,
  newValue: string
): string {
  // user is deleting so return without formatting
  if (oldValue.length > newValue.length) {
    return newValue;
  }
  return newValue
    .replace(/\W/gi, "")
    .replace(/(.{4})/g, "$1 ")
    .substring(0, 19);
}

export function expirationDateFormatter(
  oldValue: string,
  newValue: string
): string {
  // If user is deleting, return without formatting
  if (oldValue.length > newValue.length) {
    return newValue;
  }

  // Remove any non-numeric characters
  newValue = newValue.replace(/\D/g, "");

  // Ensure the length does not exceed 4 characters
  if (newValue.length > 4) {
    newValue = newValue.substring(0, 4);
  }

  // Format the string as MM/YY
  if (newValue.length >= 4) {
    newValue = newValue.replace(/(\d{2})(\d{1,2})/, "$1/$2");
  }

  return newValue;
}
