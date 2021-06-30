<template>
  <div v-if="hasFetched">
    <Header />
    <router-view />
  </div>
  <div v-else class="loader">loading</div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import Header from "./components/Header.vue";

export default {
  components: {
    Header,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      hasFetched: computed(() => store.state.starships.length > 1),
    });

    (function () {
      store.dispatch("fetchData", {
        url: "https://swapi.dev/api/people",
        commitState: "setCharacters",
      });
      store.dispatch("fetchData", {
        url: "https://swapi.dev/api/starships",
        commitState: "setStarShips",
      });
      store.dispatch("fetchData", {
        url: "https://swapi.dev/api/planets",
        commitState: "setPlanets",
      });
    })();

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>
