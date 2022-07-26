export const actions = {
  async nuxtClientInit({ commit }, context) {
    // cache data in local storage for [LOCAL_STORE_LIFETIME_MINUTES] minutes
    if (context.store.state.data.timestamp) {
      var millisecconds = Date.now() - context.store.state.data.timestamp;
      var minutes = Math.floor((millisecconds / 1000) / 60);
      if (minutes < process.env.LOCAL_STORE_LIFETIME_MINUTES) {
        return;
      }
    }

    var headers = new Headers();
    headers.append('pragma', 'no-cache');
    headers.append('cache-control', 'no-cache');

    var reqInit = {
      method: 'GET',
      headers: headers,
    };

    var data = await fetch(process.env.DATA_JSON_URL, reqInit).then((res) =>
      res.json()
    );

    commit("data/setData", data);
  }
}
