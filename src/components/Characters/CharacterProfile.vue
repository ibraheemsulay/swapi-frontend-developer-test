<template>
  <div class="list-item character grid left">
    <div v-show="display === 'grid'" class="list-item__image">
      <img :src="imageLink" :alt="name" />
    </div>
    <div class="list-item__body">
      <div class="list-item__title">
        <h4>{{ name }}</h4>
      </div>
      <p class="list-item__description">
        {{ name.split(" ")[0] }} {{ characterDescription }}
        <router-link
          @click="resetSearchBar"
          :to="{
            name: 'Description',
            params: { category: 'characters', name: name },
          }"
          >Read more</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";

export default {
  props: ["imageLink", "name", "birthyear", "gender", "display"],

  setup(props) {
    const store = useStore();
    const data = reactive({
      characterDescription: `was born in the year ${props.birthyear}, and is a
      ${props.gender === "n/a" ? "robot" : props.gender}`,
      characters: computed(() => store.getters.characters),
    });

    const resetSearchBar = () => {
      store.commit("setSearchValue", "");
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
  &.grid {
    flex-basis: 30%;
    margin-bottom: 3rem;
    justify-content: center;

    &.left {
      display: flex;
      flex-basis: 48%;
      align-self: stretch;
      align-items: stretch;

      .list-item__image {
        min-height: 300px;
        img {
          height: 100%;
          width: 300px;
          object-fit: cover;
        }

        @media (max-width: 900px) {
          img {
            width: 250px;
          }
        }

        @media (max-width: 768px) {
          img {
            width: 300px;
          }
        }

        @media (max-width: 500px) {
          img {
            width: 200px;
          }
        }
      }

      .list-item__body {
        flex-shrink: 12;
        padding-top: 3rem;
      }

      @media (max-width: 768px) {
        flex-basis: 100%;
      }
    }

    .list-item__description {
      min-height: 65px;
    }
  }

  &__body {
    padding: 1rem;
    background-color: #f2f2f2;
  }

  &__description {
    color: #494857;
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.4;

    a.router-link-active,
    a.router-link-exact-active {
      color: #494857;
      font-weight: 500;
      margin-left: 0.5rem;
    }
    a:-webkit-any-link {
      color: #494857;
    }
    a:-webkit-any-link:hover {
      color: #9e9da1dc;
    }
  }

  &__title {
    color: #494857;

    h4 {
      margin: 0.5rem 0;
    }
  }
}
</style>
