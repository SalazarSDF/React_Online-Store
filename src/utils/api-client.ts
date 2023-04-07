//const apiURL = process.env.REACT_APP_API_URL
const apiURL = "https://dummyjson.com";
//import { TProductItems, TProductItem } from "../utils/types";
async function client<T>(endpoint: string): Promise<T> {
  const config = {
    method: "GET",
  };

  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then<T>(async (response) => {
      const data: T = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { client };
