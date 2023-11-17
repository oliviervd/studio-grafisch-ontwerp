export async function fetchPayload(BASE_URI, collection) {
  // function that fetches data from payload.
  try {
    const response = await fetch(`${BASE_URI}/api/${collection}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
