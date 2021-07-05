<template>
  <section class="section">
    <h2 class="section__title">All Starships</h2>
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
      <StarshipCard
        v-for="starship in paginationItem"
        :key="starship.name"
        :imageLink="imageLink[Math.floor(Math.random() * 5)]"
        :name="starship.name"
        :cargo="starship.cargo_capacity"
        :model="starship.model"
        :display="display"
      />
    </div>
    <Pagination :category="category" :paginationItem="starships" />
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
import StarshipCard from "../components/Starships/StarshipCard.vue";
import Pagination from "../components/Partials/Pagination.vue";

export default {
  components: {
    StarshipCard,
    Pagination,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      category: "starships",
      display: "grid",
      paginationItem: computed(() => store.getters.paginationItem),
      starships: computed(() => store.getters.starships),
      imageLink: computed(() => store.state.images.starships),
    });

    onMounted(() => {
      (function () {
        store.commit("setPaginationItem", data.starships.slice(0, 6));
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
      cursor: pointer;
      transition: all ease-in 0.1s;

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
