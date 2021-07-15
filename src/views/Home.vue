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
import { reactive, toRefs } from "vue";

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
    const data = reactive({
      search: "",
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>
