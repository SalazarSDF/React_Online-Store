//const apiURL = process.env.REACT_APP_API_URL
const apiURL = "https://dummyjson.com";
import { ProductItems } from "../utils/types";
async function client(endpoint: string) {
  const config = {
    method: "GET",
  };

  return window
    .fetch(`${apiURL}/${endpoint}?limit=0`, config)
    .then(async (response) => {
      if (response.status === 401) {
        return Promise.reject({ message: "Please re-authenticate." });
      }
      const data: ProductItems = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { client };
