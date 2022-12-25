export const actions = {
  async nuxtClientInit({ commit }, context) {
    // cache data in local storage for [LOCAL_STORE_LIFETIME_MINUTES] minutes
    if (context.store.state.data.timestamp) {
      const milliseconds = Date.now() - context.store.state.data.timestamp;
      const minutes = Math.floor(milliseconds / 1000 / 60);
      if (minutes < process.env.LOCAL_STORE_LIFETIME_MINUTES) {
        return;
      }
    }

    // get JSON data
    const data = await requestDataAsync(process.env.DATA_JSON_PATH);
    commit("data/setData", data);
  },
};

async function requestDataAsync(path) {
  const headers = new Headers();
  headers.append("pragma", "no-cache");
  headers.append("cache-control", "no-cache");

  const data = await fetch(new URL(path, window.location.origin), {
    method: "GET",
    headers: headers,
  }).then((res) => res.json());

  return data;
}
