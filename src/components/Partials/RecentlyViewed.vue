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
        {{ characterDescription }}
      </p>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";

export default {
  props: ["item"],

  setup(props) {
    const store = useStore();
    const data = reactive({
      name: "",
      imageLink: "",
      characterDescription: "",
      recentlyViewed: computed(() => store.getters.recentlyViewed),
    });
    (function () {
      data.name = props.item.name;
      const planetNames = store.getters.planets.map((planet) => planet.name);
      if (planetNames.indexOf(props.item.name) !== -1) {
        data.imageLink =
          store.state.images.planets[Math.floor(Math.random() * 3)];
        data.characterDescription = `${props.item.name} has a temperature of ${props.item.temperature}, and a population of ${props.item.population}`;
      }

      const checkPlanets = store.getters.planets.indexOf(props.item) !== -1;
      const checkStarships = store.getters.starships.indexOf(props.item) !== -1;
      const checkCharacters =
        store.getters.characters.indexOf(props.item) !== -1;
      if (checkPlanets) {
        data.imageLink =
          store.state.images.planets[Math.floor(Math.random() * 3)];
        data.characterDescription = `${props.item.name} has a temperature of ${props.item.temperature}, and a population of ${props.item.population}`;
      }
      if (checkStarships) {
        data.imageLink =
          store.state.images.starships[Math.floor(Math.random() * 3)];
        data.characterDescription = `${props.item.name} is of the ${props.item.model} model, and has a cargo of
        ${props.item.cargo_capacity}`;
      }
      if (checkCharacters) {
        data.imageLink =
          store.state.images.characters[Math.floor(Math.random() * 3)];
        data.characterDescription = `${props.item.name} was born in the year ${
          props.item.birthyear
        }, and is a
        ${props.item.gender === "n/a" ? "robot" : props.item.gender}`;
      }
    })();

    return {
      ...toRefs(data),
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
        width: 100%;
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
    transition: all ease-in 0.1s;
    cursor: pointer;

    img {
      width: 20px;
      margin-left: 4px;
      vertical-align: middle;
    }
  }
  button:hover {
    background: #f2f2f2;
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
