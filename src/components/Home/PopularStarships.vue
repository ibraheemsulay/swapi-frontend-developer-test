<template>
  <section class="section">
    <h2 class="section__title">Popular Starships</h2>
    <div class="section__body">
      <div v-if="starships.length < 1" class="no-result">No Result Found</div>
      <StarshipCard
        v-for="starship in starships"
        :key="starship.name"
        :imageLink="imageLink[Math.floor(Math.random() * 5)]"
        :name="starship.name"
        :cargo="starship.cargo_capacity"
        :model="starship.model"
        :display="display"
        :item="starship"
      />
    </div>
    <div class="section__button">
      <router-link :to="{ name: 'AllStarships' }">
        <button type="button">View All</button>
      </router-link>
    </div>
  </section>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import StarshipCard from "../Starships/StarshipCard.vue";

export default {
  components: {
    StarshipCard,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      display: "grid",
      starships: computed(() => store.getters.popularStarships),
      imageLink: computed(() => store.state.images.starships),
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
