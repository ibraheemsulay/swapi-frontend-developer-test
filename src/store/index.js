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
    searchValue: " ",
    planetSlider: [],
  },

  //GETTERS
  getters: {
    popularStarships: (state) =>
      state.starships
        .filter((starship) =>
          starship.name.toLowerCase().includes(state.searchValue.toLowerCase())
        )
        .slice(0, 6),
    popularPlanets: (state) =>
      state.planets
        .filter((planet) =>
          planet.name.toLowerCase().includes(state.searchValue.toLowerCase())
        )
        .slice(0, 9),
    popularCharacters: (state) =>
      state.characters
        .filter((character) =>
          character.name.toLowerCase().includes(state.searchValue.toLowerCase())
        )
        .slice(0, 4),
    allStarships: (state) =>
      state.starships.filter((starship) =>
        starship.name.toLowerCase().includes(state.searchValue.toLowerCase())
      ),
    allPlanets: (state) =>
      state.planets.filter((planet) =>
        planet.name.toLowerCase().includes(state.searchValue.toLowerCase())
      ),
    allCharacters: (state) =>
      state.characters.filter((character) =>
        character.name.toLowerCase().includes(state.searchValue.toLowerCase())
      ),
    searchValue: (state) => state.searchValue,
    planetSlider: (state) =>
      state.planetSlider
        .filter((planet) =>
          planet.name.toLowerCase().includes(state.searchValue.toLowerCase())
        )
        .slice(0, 3),
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

        if (response.next !== null)
          dispatch("fetchData", { url: response.next, commitState });
      } catch (error) {
        console.log(error);
        commit("setHasFetched", false);
      }
      commit("setHasFetched", true);
    },
    filter: ({ commit }, { value }) => {
      commit("setSearchValue", value);
    },
    firstSlide: ({ state, commit }) => {
      const value = state.planets.filter((planet) =>
        planet.name.toLowerCase().includes(state.searchValue.toLowerCase())
      );
      commit("setPlanetsChange", value);
    },
    secondSlide: ({ state, commit }) => {
      const value = state.planets
        .filter((planet) =>
          planet.name.toLowerCase().includes(state.searchValue.toLowerCase())
        )
        .slice(3, 6);
      commit("setPlanetsChange", value);
    },
    thirdSlide: ({ state, commit }) => {
      const value = state.planets
        .filter((planet) =>
          planet.name.toLowerCase().includes(state.searchValue.toLowerCase())
        )
        .slice(6, 9);
      commit("setPlanetsChange", value);
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
    setSearchValue: (state, val) => (state.searchValue = val),
    setPlanetSlider: (state, val) =>
      (state.planetSlider = [...state.planetSlider, ...val]),
    setPlanetsChange: (state, val) => (state.planetSlider = [...val]),
  },
});
