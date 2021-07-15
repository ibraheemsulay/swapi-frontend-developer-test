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
        v-for="planet in paginationItem"
        :key="planet.name"
        :imageLink="imageLink[Math.floor(Math.random() * 3)]"
        :name="planet.name"
        :temperature="planet.temperature"
        :population="planet.population"
        :display="display"
        :item="planet"
      />
    </div>
    <Pagination :category="category" :paginationItem="planets" />
    <div class="section__button">
      <router-link :to="{ name: 'Home' }">
        <button type="button">Return Home</button>
      </router-link>
    </div>
  </section>
</template>

<script>
import { reactive, toRefs, computed, onMounted } from "vue";
import { useStore } from "vuex";
import PlanetProfile from "../components/Planets/PlanetProfile.vue";
import Pagination from "../components/Partials/Pagination.vue";

export default {
  components: {
    PlanetProfile,
    Pagination,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      category: "planets",
      display: "grid",
      paginationItem: computed(() => store.getters.paginationItem),
      planets: computed(() => store.getters.planets),
      imageLink: computed(() => store.state.images.planets),
    });

    onMounted(() => {
      (function () {
        store.commit("setPaginationItem", data.planets.slice(0, 6));
      })();
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style lang="scss" scoped>
.section {
  padding: 2rem 3rem 8rem 2rem;

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
      cursor: pointer;
      transition: all ease-in 0.1s;
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
