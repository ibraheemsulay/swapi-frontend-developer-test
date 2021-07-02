<template>
  <div class="list-item planet grid top">
    <div class="list-item__image">
      <img :src="imageLink" :alt="name" />
    </div>
    <div class="list-item__body">
      <div class="list-item__title">
        <h4>{{ name }}</h4>
      </div>
      <p class="list-item__description">
        {{ name.split(" ")[0] }} {{ characterDescription }}
      </p>
      <router-link
        :to="{
          name: 'Description',
          params: { category: 'planets', name: name },
        }"
        class="list-item__button"
      >
        <button @click="resetSearchBar">
          Read more <img src="@/assets/Images/right-arrow.svg" alt="arrow" />
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";

export default {
  props: ["imageLink", "name", "temperature", "population"],

  setup(props) {
    const store = useStore();
    const data = reactive({
      characterDescription: `${props.name} has a temperature of ${props.temperature}, and a population of ${props.population}`,
    });

    const resetSearchBar = () => {
      store.commit("setSearchValue", " ");
      console.log("working");
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

    &.top {
      position: relative;

      .list-item__image img {
        max-width: 100%;
        width: fit-content;
        height: 200px;
        object-fit: cover;
      }

      .list-item__body {
        position: relative;
        transform: translate(8px, -6px);
        background-color: #f2f2f2;
      }

      &::after {
        content: "";
        position: absolute;
        background-color: #d8d8d8;
        height: calc(100% + 2px);
        width: 100%;
        top: 0;
        left: 0;
        z-index: -2;
      }

      @media (max-width: 900px) {
        flex-basis: 45%;
      }

      @media (max-width: 530px) {
        flex-basis: 80%;
        margin-left: auto;
        margin-right: auto;
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

    a {
      color: #494857;
      font-weight: 500;
      margin-left: 0.5rem;
    }
  }

  &__title {
    color: #494857;

    h4 {
      margin: 0.5rem 0;
    }
  }

  &__button {
    text-align: right;
    display: inherit;
  }

  &__button button {
    margin-top: 1rem;
    background-color: #d8d8d8;
    padding: 0.7rem 1.2rem;
    font-size: 0.8rem;

    img {
      width: 20px;
      margin-left: 4px;
      vertical-align: middle;
    }
  }

  &.list {
    flex-basis: 100%;
    padding: 0.5rem;

    .list-item__image {
      display: none;
    }
  }

  img {
    max-width: 100%;
  }
}
</style>
