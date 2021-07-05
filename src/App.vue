<template>
  <div v-if="hasFetched">
    <Header v-if="!$route.meta.hideHeader" />

    <router-view />
  </div>
  <div v-else class="loader">
    <img class="logo" src="@/assets/Images/logo.png" />
  </div>
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
        url: "https://swapi.dev/api/planets",
        commitState: "setPlanets",
      });
      store.dispatch("fetchData", {
        url: "https://swapi.dev/api/planets",
        commitState: "setPlanetSlider",
      });
      store.dispatch("fetchData", {
        url: "https://swapi.dev/api/people",
        commitState: "setCharacters",
      });
      store.dispatch("fetchData", {
        url: "https://swapi.dev/api/starships",
        commitState: "setStarShips",
      });
    })();

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700;900&display=swap");
body {
  margin: 0;
  font-family: "Source Sans Pro", sans-serif;
}
.loader {
  background-image: url("assets/Images/hero-banner.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  .logo {
    width: 100px;
    height: auto;
    animation-name: fade;
    animation-iteration-count: infinite;
    animation-duration: 0.5s;
    animation-direction: alternate;
  }
  @keyframes fade {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0.8;
    }
    50% {
      opacity: 0.6;
    }
    75% {
      opacity: 0.4;
    }
    100% {
      opacity: 0.2;
    }
  }
}
</style>
