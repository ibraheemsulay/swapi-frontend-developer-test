<template>
  <section class="section">
    <h2 class="section__title">Popular Characters</h2>
    <div class="section__body">
      <div v-if="characters.length < 1" class="no-result">No Result Found</div>
      <CharacterProfile
        v-for="character in characters"
        :key="character.name"
        :imageLink="imageLink[Math.floor(Math.random() * 2)]"
        :name="character.name"
        :birthyear="character.birth_year"
        :gender="character.gender"
        :item="character"
        display="grid"
      />
    </div>
    <div class="section__button">
      <router-link :to="{ name: 'AllCharacters' }">
        <button type="button">View All</button>
      </router-link>
    </div>
  </section>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import CharacterProfile from "../Characters/CharacterProfile.vue";

export default {
  components: {
    CharacterProfile,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      characters: computed(() => store.getters.popularCharacters),
      imageLink: computed(() => store.state.images.characters),
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

  &__body {
    margin-top: 2rem;
    display: flex;
    justify-content: space-evenly;
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
