<template>
  <ListItems />
  <ul class="slider">
    <li><button class="first" @click="first"></button></li>
    <li><button class="second" @click="second"></button></li>
    <li><button class="third" @click="third"></button></li>
  </ul>
  <div class="section__button">
    <router-link :to="{ name: 'AllPlanets' }">
      <button type="button" @click="resetSearchBar">View All</button>
    </router-link>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import ListItems from "./ListItems.vue";

export default {
  components: { ListItems },
  setup() {
    const store = useStore();
    const data = reactive({
      displayPlanets: computed(() => store.getters.planetSlider),
      planets: computed(() => store.getters.popularPlanets),
      imageLink: computed(() => store.state.images.planets),
    });

    const resetSearchBar = () => {
      store.commit("setSearchValue", " ");
    };

    const first = (e) => {
      store.dispatch("firstSlide");
      e.target.style.backgroundColor = "black";
      document.getElementsByClassName("second")[0].style.background = "white";
      document.getElementsByClassName("third")[0].style.background = "white";
    };

    const second = (e) => {
      store.dispatch("secondSlide");
      e.target.style.backgroundColor = "black";
      document.getElementsByClassName("first")[0].style.background = "white";
      document.getElementsByClassName("third")[0].style.background = "white";
    };

    const third = (e) => {
      store.dispatch("thirdSlide");
      e.target.style.backgroundColor = "black";
      document.getElementsByClassName("second")[0].style.background = "white";
      document.getElementsByClassName("first")[0].style.background = "white";
    };
    return {
      ...toRefs(data),
      resetSearchBar,
      first,
      second,
      third,
    };
  },
};
</script>

<style lang="scss" scoped>
.slider {
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin-bottom: 2em;
  li {
    margin: 0 0.5em;
    button {
      height: 15px;
      border-radius: 8px;
      background: #fff;
    }
    .first {
      background: #000;
    }
  }
}

section__button {
  text-align: center;
  margin: 0 auto;

  button {
    text-transform: uppercase;
    font-size: 0.85rem;
    border: 2px solid #0e0d1a;
    color: #0e0d1a;
    padding: 0.8rem 1.2rem;
    background: none;
    border-radius: 0.3rem;

    @media (min-width: 768px) {
      min-width: 500px;
    }

    @media (max-width: 768px) {
      width: 70vw;
    }
  }
}
</style>
