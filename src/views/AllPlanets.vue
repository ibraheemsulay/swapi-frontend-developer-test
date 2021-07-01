<template>
  <section class="section">
    <h2 class="section__title">All Planets</h2>
    <div class="filters">
      <label for="display">
        DISPLAY
        <select id="display" v-model="display">
          <option value="grid" selected>Grid</option>
          <option value="list">List</option>
        </select>
      </label>
    </div>
    <div class="section__body">
      <PlanetProfile
        v-for="planet in planets"
        :key="planet.name"
        :imageLink="imageLink[Math.floor(Math.random() * 3)]"
        :name="planet.name"
        :temperature="planet.temperature"
        :population="planet.population"
        :display="display"
      />
    </div>
    <div class="section__button">
      <router-link to="/starships">
        <button type="button">View All</button>
      </router-link>
    </div>
  </section>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import PlanetProfile from "../components/Planets/PlanetProfile.vue";

export default {
  components: {
    PlanetProfile,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      display: "grid",
      planets: computed(() => store.getters.allPlanets),
      imageLink: computed(() => store.state.images.planets),
    });

    return {
      ...toRefs(data),
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

  .filters {
    display: flex;
    justify-content: start;
    margin: 3em auto 5em auto;
    label {
      margin: 0 auto;
      select {
        margin-left: 1em;
        padding: 0.5em 0.5em 0.5em 0.2em;
        border-radius: 4px;
        border: 2px solid;
        background: #fff;
        &:hover {
          background: #cfcccc56;
        }
      }
    }
  }

  &__body {
    margin-top: 2rem;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
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

      @media (min-width: 768px) {
        min-width: 500px;
      }

      @media (max-width: 768px) {
        width: 70vw;
      }
    }
  }
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
}
</style>
