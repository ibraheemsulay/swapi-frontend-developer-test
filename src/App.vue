<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const data = reactive({});

    const fetchApi = () => {
      store.dispatch("fetchData", {
        url: "https://swapi.dev/api/people",
        commitVal: "setCharacters",
      });
      store.dispatch("fetchData", {
        url: "https://swapi.dev/api/starships",
        commitVal: "setStarShips",
      });
      store.dispatch("fetchData", {
        url: "https://swapi.dev/api/planets",
        commitVal: "setPlanets",
      });
    };

    fetchApi();
    return {
      ...toRefs(data),
    };
  },
};
</script>

<style lang="scss" scoped></style>
