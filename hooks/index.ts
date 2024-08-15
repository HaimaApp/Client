import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

// Define a generic type T for the data
type UseDataFetchResponse<T> = {
  data: T | null;
  refetch: () => void;
  loading: boolean;
};

const useDataFetch = <T>(fn: () => Promise<T>): UseDataFetchResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const serverErrorMessage = error.response.data.message;
        Toast.show({
          type: "error",
          text1: serverErrorMessage,
          position: "bottom",
        });
      } else {
        Toast.show({
          type: "error",
          text1: error.message || "Internal sever Error",
          position: "bottom",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const refetch = () => fetchPost();

  return { data, refetch, loading };
};

export default useDataFetch;

export const getErrorMessage = (error: any, text: string): string => {
  if (error.message === "Network Error") {
    return "Network Error";
  }

  if (error.response && error.response.data) {
    if (error.response.data.message) {
      return error.response.data.message;
    }
    if (error.response.data.email) {
      return error.response.data.email[0];
    }
    if (error.response.data.plan) {
      return error.response.data.plan[0];
    }
  }

  return error.message || text;
};
