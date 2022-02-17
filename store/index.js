export const actions = {
  async nuxtClientInit({ commit }, context) {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // cache data in local storage for 30 minutes
    if (context.store.state.data.created) {
      var millisecconds = Date.now() - context.store.state.data.created;
      var minutes = Math.floor((millisecconds/1000)/60);
      if (minutes < 30) {
        return;
      }
    }

    var start = performance.now();
    var data = await fetch(process.env.DATA_JSON_URL).then((res) =>
      res.json()
    );
    var end = performance.now();

    // show loading page at least 3 seconds
    var delayTime = 3000 - (end - start);
    if (delayTime > 0) {
      await delay(delayTime);
    }

    commit("data/setData", data);
  }
}
