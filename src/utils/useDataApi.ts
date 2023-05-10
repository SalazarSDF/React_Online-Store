import { useState, useEffect, useReducer } from "react";
import { TClient } from "./types";
import axios from "axios";

type DataAction =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: TClient }
  | { type: "FETCH_FAILURE" };

interface TDataProductsReducer {
  isLoading: boolean;
  isError: boolean;
  data: TClient;
}

const dataFetchReducer = (state: TDataProductsReducer, action: DataAction) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error("errpr in reducer ");
  }
};

type TUseDataApi = [
  TDataProductsReducer,
  React.Dispatch<React.SetStateAction<string>>
];

const useDataApi = (initialUrl: string, initialData: TClient): TUseDataApi => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);

        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};
export { useDataApi };
