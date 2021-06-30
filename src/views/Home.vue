<template>
  <div class="home">
    <Header />
    <body>
      <div>
        <PopularStarships />
      </div>
    </body>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import Header from "../components/Header.vue";
import PopularStarships from "../components/Home/PopularStarships.vue";

export default {
  components: {
    Header,
    PopularStarships,
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

<style lang="scss" scoped></style>
