//const apiURL = process.env.REACT_APP_API_URL
const apiURL = "https://dummyjson.com";
import { TProductItems } from "../utils/types";
async function client(endpoint: string) {
  const config = {
    method: "GET",
  };

  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      const data: TProductItems = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { client };
