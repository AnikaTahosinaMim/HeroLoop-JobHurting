const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const ServerMuttation = async (path, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
   console.log("status:", res.status);
   return res.json()
};
