<template>
  <div class="home">
    <body>
      <div>
        <PopularStarships />
        <PopularPlanets />
        <PopularCharacters />
      </div>
    </body>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import PopularStarships from "../components/Home/PopularStarships.vue";
import PopularPlanets from "../components/Home/PopularPlanets.vue";
import PopularCharacters from "../components/Home/PopularCharacters.vue";

export default {
  components: {
    PopularStarships,
    PopularPlanets,
    PopularCharacters,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      search: "",
    });

    onBeforeUnmount(() => store.commit("setSearchValue", ""));

    return {
      ...toRefs(data),
    };
  },
};
</script>
