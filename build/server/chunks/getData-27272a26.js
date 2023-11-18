const API_TOKEN = "test";
async function getData() {
  const response = await fetch("http://localhost:3005/api/v1/data", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`
    }
  });
  const data = await response.json();
  return data;
}

export { API_TOKEN as A, getData as g };
//# sourceMappingURL=getData-27272a26.js.map
