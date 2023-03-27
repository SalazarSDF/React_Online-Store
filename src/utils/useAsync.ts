import { useReducer, useCallback } from "react";
import { ProductItems } from "./types";

type LoadingAction = {
  status: "LOADING";
};

type SuccessAction = {
  status: "SUCCESS";
  data: ProductItems;
};

type ErrorAction<T> = {
  status: "ERROR";
  error: T;
};

type AsyncAction<E> = LoadingAction | SuccessAction | ErrorAction<E>;

export type AsyncState<E> = {
  loading: boolean;
  data: ProductItems | null;
  error: E | null;
};

function asyncReducer<E>(
  state: AsyncState<E>,
  action: AsyncAction<E>
): AsyncState<E> {
  switch (action.status) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };
  }
}

function useAsync() {
  const [{ loading, data, error }, setState] = useReducer(asyncReducer, {
    loading: false,
    data: null,
    error: null,
  });

  const run = useCallback(
    (promise: Promise<ProductItems>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }
      setState({ status: "LOADING" });
      return promise.then(
        (data) => {
          setState({ status: "SUCCESS", data });
          return data;
        },
        (error) => {
          setState({ status: "ERROR", error });
          return Promise.reject(error);
        }
      );
    },
    [setState]
  );

  return {
    isLoading: loading,
    isError: error !== null,
    isSuccess: data !== null,
    error,
    data,
    run,
  };
}

export { useAsync };
