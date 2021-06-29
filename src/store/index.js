import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    hasFetched: false,
    characters: "",
    planets: "",
    starships: "",
  },

  //GETTERS
  getters: {},

  //ACTIONS
  actions: {
    fetchData: async ({ commit }, { url, commitVal }) => {
      try {
        const response = await axios.get(url).then((res) => res.data);
        commit(commitVal, response);
        commit("setHasFetched", true);
      } catch (error) {
        console.log(error);
        commit("setHasFetched", false);
      }
    },
  },

  //MUTATIONS
  mutations: {
    setHasFetched: (state, val) => (state.hasFetched = val),
    setCharacters: (state, val) => (state.characters = val),
    setPlanets: (state, val) => (state.planets = val),
    setStarShips: (state, val) => (state.starships = val),
  },
});
