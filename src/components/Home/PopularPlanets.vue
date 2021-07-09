<template>
  <section class="section">
    <h2 class="section__title">Popular Planets</h2>
    <div class="section__body">
      <div v-if="displayPlanets.length < 1" class="no-result">
        No Result Found
      </div>
      <PlanetCard
        v-for="planet in displayPlanets"
        :key="planet.name"
        :imageLink="imageLink[Math.floor(Math.random() * 3)]"
        :name="planet.name"
        :temperature="planet.temperature"
        :population="planet.population"
        :item="planet"
      />
    </div>
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
  </section>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import PlanetCard from "../Planets/PlanetCard.vue";

export default {
  components: { PlanetCard },
  setup() {
    const store = useStore();
    const data = reactive({
      displayPlanets: computed(() => store.getters.planetSlider),
      planets: computed(() => store.getters.popularPlanets),
      imageLink: computed(() => store.state.images.planets),
    });

    const resetSearchBar = () => {
      store.commit("setSearchValue", "");
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
.section {
  padding: 2rem 3rem;

  &__title {
    position: relative;
    text-align: center;
    padding: 0.5rem;

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      height: 3px;
      width: 80px;
      background-color: rgba(0, 0, 0, 0.7);
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &__body {
    margin-top: 2rem;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;

    .no-result {
      margin: 1.5em;
      font-size: 1.5em;
      text-transform: capitalize;
    }
  }

  .slider {
    display: flex;
    justify-content: center;
    list-style-type: none;
    margin-bottom: 2em;
    padding: 0;
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
    li:nth-of-type(1) {
      margin-left: 0;
    }
  }

  &__button {
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
      cursor: pointer;
      transition: all linear 0.1s;

      @media (min-width: 768px) {
        min-width: 500px;
      }

      @media (max-width: 768px) {
        width: 70vw;
      }
    }
    button:hover {
      background: #b6b5b585;
    }
  }
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
}
</style>
