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
    searchValue: "",
    planetSlider: [],
    paginationItem: "",
    recentlyViewed: [],
    history: [],
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
    starships: (state) =>
      state.starships.filter((starship) =>
        starship.name.toLowerCase().includes(state.searchValue.toLowerCase())
      ),
    planets: (state) =>
      state.planets.filter((planet) =>
        planet.name.toLowerCase().includes(state.searchValue.toLowerCase())
      ),
    characters: (state) =>
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
    paginationItem: (state) => state.paginationItem,
    recentlyViewed: (state) => state.recentlyViewed,
    history: (state) => state.history,
  },

  //ACTIONS
  actions: {
    //FETCH DATA FROM API
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
        commit("setHasFetched", true);
      } catch (error) {
        console.log(error.message);
      }
    },

    //SEARCH FILTER OPTION
    filter: ({ commit }, { value }) => {
      commit("setSearchValue", value);
    },

    //SLIDER BUTTON FUNCTIONS IN POPULAR PLANET COMPONENTS
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

    recentlyViewed: ({ state, commit }, { newItem }) => {
      const recentlyViewedNamesArray = state.recentlyViewed.map(
        (item) => item.name
      );
      if (recentlyViewedNamesArray.includes(newItem[0].name)) return;
      let list = [...new Set(state.recentlyViewed)];
      if (list.length < 9) {
        list = [...list, ...newItem];
        commit("setHistory", list.slice(-3, list.length));
        commit("setRecentlyViewed", list);
      } else {
        list = [...list.slice(1, 9), ...newItem];
        commit("setHistory", list.slice(6, 9));
        commit("setRecentlyViewed", list);
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
    setSearchValue: (state, val) => (state.searchValue = val),
    setPlanetSlider: (state, val) =>
      (state.planetSlider = [...state.planetSlider, ...val]),
    setPlanetsChange: (state, val) => (state.planetSlider = [...val]),
    setPaginationItem: (state, val) => (state.paginationItem = [...val]),
    setRecentlyViewed: (state, val) => (state.recentlyViewed = val),
    setHistory: (state, val) => (state.history = val),
  },
});
