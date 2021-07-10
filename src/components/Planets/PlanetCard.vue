<template>
  <div class="list-item">
    <img :src="imageLink" :alt="name" />
    <router-link
      @click="resetSearchBar"
      :to="{
        name: 'Description',
        params: { category: 'planets', name: name },
      }"
      class="list-item__button"
    >
      {{ name }}
    </router-link>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";

export default {
  props: ["imageLink", "name", "temperature", "population", "item"],

  setup(props) {
    const store = useStore();
    const data = reactive({
      characterDescription: `${props.name} has a temperature of ${props.temperature}, and a population of ${props.population}`,
    });

    const resetSearchBar = () => {
      store.commit("setSearchValue", "");
      const item = [props.item];
      const recentlyViewedNames = store.getters.recentlyViewed.map(
        (item) => item.name
      );
      const checkAgain = recentlyViewedNames.includes(props.name);

      if (recentlyViewedNames.indexOf(props.name) === -1 && !checkAgain) {
        store.dispatch("recentlyViewed", { newItem: item });
      }
    };

    return {
      ...toRefs(data),
      resetSearchBar,
    };
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  height: 350px;
  width: 20em;
  position: relative;
  margin-bottom: 3rem;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  a {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 2%;
    z-index: 1;
    font-size: 1.5em;
    color: white;
    text-decoration: none;
  }
}
</style>
