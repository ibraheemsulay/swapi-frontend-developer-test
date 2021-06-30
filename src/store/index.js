import axios from "axios";
import { createStore } from "vuex";
import images from "@/assets/Images/Images.js";

export default createStore({
  state: {
    hasFetched: false,
    characters: [],
    planets: [],
    starships: [],
    images,
  },

  //GETTERS
  getters: {
    popularStarships: (state) => state.starships.slice(0, 6),
    popularPlanets: (state) => state.planets.slice(0, 9),
    popularCharacters: (state) => state.characters.slice(0, 4),
    allStarships: (state) => state.starships,
    allPlanets: (state) => state.planets,
    allCharacters: (state) => state.characters,
  },

  //ACTIONS
  actions: {
    fetchData: async ({ commit, dispatch }, { url, commitState }) => {
      try {
        const response = await axios
          .get(url, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((res) => res.data);
        commit(commitState, response.results);
        commit("setHasFetched", true);
        if (response.next !== null)
          dispatch("fetchData", { url: response.next, commitState });
      } catch (error) {
        console.log(error);
        commit("setHasFetched", false);
      }
    },
  },

  //MUTATIONS
  mutations: {
    setHasFetched: (state, val) => (state.hasFetched = val),
    setCharacters: (state, val) =>
      (state.characters = [...state.characters, ...val]),
    setPlanets: (state, val) => (state.planets = [...state.planets, ...val]),
    setStarShips: (state, val) =>
      (state.starships = [...state.starships, ...val]),
  },
});
