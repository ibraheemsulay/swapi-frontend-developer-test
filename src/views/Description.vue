<template>
  <div class="description">
    <header class="hero">
      <img class="hero__banner" :src="heroBanner" alt="Hero banner" />
      <nav class="hero__navbar">
        <img :src="logo" alt="Star wars logo" class="hero__logo" />
      </nav>
      <div class="hero__body">
        <div class="img__container">
          <img :src="imageLink" :alt="category" />
        </div>
        <div class="description__title">
          <h1>{{ name }} this is the {{ category }}</h1>
        </div>
        <div class="description__slider">
          <button @click="navigatePrevious">
            <img src="@/assets/Images/chevron-left.svg" alt="previous icon" />
          </button>
          <button @click="navigateNext">
            <img src="@/assets/Images/chevron-right.svg" alt="next icon" />
          </button>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  props: ["category", "name"],
  component: {},
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const data = reactive({
      imageLink: store.state.images[`${props.category}`][0],
      counter: 0,
      heroBanner: computed(() => store.state.images.heroBanner),
      logo: computed(() => store.state.images.logo),
      character: computed(() =>
        store.state[`${props.category}`].filter(
          (item) => item.name == props.name
        )
      ),
      allCharacters: computed(() =>
        store.state[`${props.category}`].map((item) => item.name)
      ),
      images: computed(() => store.state.images[`${props.category}`]),
    });

    const navigateNext = () => {
      data.imageLink =
        data.images[Math.floor(Math.random() * data.images.length)];
      if (data.counter == data.allCharacters.length) data.counter = 0;
      if (data.counter < data.allCharacters.length) {
        router.push({
          name: "Description",
          params: {
            name: data.allCharacters[data.counter],
            category: props.category,
          },
        });
      }

      ++data.counter;
    };

    const navigatePrevious = () => {
      data.imageLink =
        data.images[Math.floor(Math.random() * data.images.length)];
      if (data.counter < 0) data.counter = data.allCharacters.length - 1;
      if (data.counter > 0) {
        router.push({
          name: "Description",
          params: {
            name: data.allCharacters[data.counter],
            category: props.category,
          },
        });
      }
      --data.counter;
    };

    return {
      ...toRefs(data),
      navigatePrevious,
      navigateNext,
    };
  },
};
</script>

<style lang="scss" scoped>
.description {
  .hero {
    position: relative;
    min-height: 600px;

    &__banner {
      object-fit: cover;
      height: 100%;
      width: 100%;
      min-height: 600px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;

      @media (max-width: 450px) {
        min-height: 450px;
      }
    }

    > :not(.hero__banner) {
      position: relative;
      z-index: 2;
    }

    &__navbar {
      padding: 2rem;

      @media (max-width: 768px) {
        padding: 1.5rem;
      }

      @media (max-width: 450px) {
        height: 1rem;
      }
    }

    &__logo {
      height: 50px;

      @media (max-width: 768px) {
        height: 45px;
      }

      @media (max-width: 450px) {
        height: 40px;
      }
    }
  }
  .hero__body {
    .img__container {
      margin-right: auto;
      margin-left: auto;
      width: 50%;
      height: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 300px;
        object-fit: fill;
      }
    }

    .description__title {
      color: white;
      text-align: left;
      padding-left: 1.5rem;
      font-size: 1.4rem;
    }
  }

  &__slider {
    text-align: right;
    margin: 1rem 0;
    float: right;
    margin-right: 1.5rem;

    button {
      padding: 0.8rem;
      margin: 0 0.5rem;
      border: 1px solid #fff;
      color: #fff;
      background: none;
      height: 65px;
      width: 65px;
      border-radius: 50%;

      + button {
        margin-right: 0;
      }

      img {
        width: 28px;
        background: white;
        border-radius: 50%;
      }
    }

    @media (min-width: 768px) {
      margin-top: -4rem;
    }
  }

  &__body,
  &__recent {
    padding: 2rem;
  }

  &__recent {
    border-top: 2px solid black;
    margin-top: 3rem;
  }

  .recently-viewed {
    &__title {
      text-align: center;
    }

    .list-item.grid.top {
      flex-basis: 30%;
    }
  }
}
</style>
