export default {
  async getAsync(url) {
    const headers = new Headers();
    headers.append("pragma", "no-cache");
    headers.append("cache-control", "no-cache");

    const data = await fetch(new URL(url, window.location.origin), {
      method: "GET",
      headers: headers,
    }).then((res) => res.json());

    return data;
  },
};
