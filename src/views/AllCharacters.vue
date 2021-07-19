<template>
  <section class="section">
    <h2 class="section__title">All Characters</h2>
    <div class="filters">
      <label for="gender">
        FILTER
        <select id="gender" v-model="gender">
          <option value="allGender" selected>All Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="hermaphrodite">Hermaphrodite</option>
        </select>
      </label>
      <label for="display">
        DISPLAY
        <select id="display" v-model="display">
          <option value="grid" selected>Grid</option>
          <option value="list">List</option>
        </select>
      </label>
    </div>
    <div class="section__body">
      <CharacterProfile
        v-for="character in paginationItem"
        :key="character.name"
        :imageLink="imageLink[Math.floor(Math.random() * 4)]"
        :name="character.name"
        :birthyear="character.birth_year"
        :gender="character.gender"
        :display="display"
        :item="character"
      />
    </div>
    <Pagination :category="category" :paginationItem="characters" />
    <div class="section__button">
      <router-link :to="{ name: 'Home' }">
        <button type="button">Return Home</button>
      </router-link>
    </div>
  </section>
</template>

<script>
import { reactive, toRefs, computed, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import CharacterProfile from "../components/Characters/CharacterProfile.vue";
import Pagination from "../components/Partials/Pagination.vue";

export default {
  components: {
    CharacterProfile,
    Pagination,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      category: "characters",
      gender: "allGender",
      display: "grid",
      paginationItem: computed(() => store.getters.paginationItem),
      characters: computed(() =>
        store.getters.characters
          .map((character) => {
            if (character.gender === data.gender) {
              return character;
            } else if (data.gender === "allGender") {
              return character;
            }
          })
          .filter((character) => character !== undefined)
      ),
      imageLink: computed(() => store.state.images.characters),
    });

    onMounted(() => {
      (function () {
        store.commit("setPaginationItem", data.characters.slice(0, 6));
      })();
    });

    onBeforeUnmount(() => store.commit("setSearchValue", ""));

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
      transition: all linear 0.1s;
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
