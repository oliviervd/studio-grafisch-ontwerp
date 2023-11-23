import { useQuery } from "react-query";
import axios from "axios";

export async function fetchPayload(BASE_URI, collection) {
  // function that fetches data from payload.
  try {
    const response = await fetch(`${BASE_URI}/api/${collection}?limit=100`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

// react query
export function fetchPayloadCache(BASE_URI, collection) {
  useQuery("output", async () => {
    const { data } = await axios.get(`${BASE_URI}/api/${collection}?limit=100`);
    return data;
  });
}
