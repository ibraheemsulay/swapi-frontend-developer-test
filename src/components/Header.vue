<template>
  <header class="hero">
    <img class="hero__banner" :src="heroBanner" alt="Hero banner" />
    <nav class="hero__navbar">
      <router-link :to="{ name: 'Home' }">
        <img :src="logo" alt="Star wars logo" class="hero__logo" />
      </router-link>
    </nav>
    <div class="hero__body">
      <div class="hero__content">
        <div class="hero__heading">
          <img :src="logo" alt="Star wars logo" class="hero__logo" />
          <h2>Directory</h2>
        </div>
        <h3 class="hero__subtext">
          Find you favourite Characters, Films, Species, Starships and Planets.
        </h3>
        <div class="searchbar">
          <input
            type="text"
            placeholder="Enter a search item"
            class="searchbar__input"
            v-model="search"
          />
          <div class="searchbar__icon">
            <img src="@/assets/Images/search.svg" alt="search bar icon" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { reactive, toRefs, computed, watch } from "vue";
import { useStore } from "vuex";

export default {
  component: {},
  setup() {
    const store = useStore();
    const data = reactive({
      search: "",
      heroBanner: computed(() => store.state.images.heroBanner),
      logo: computed(() => store.state.images.logo),
    });

    watch(
      () => data.search,
      (search) => {
        store.dispatch("filter", { value: search });
      }
    );

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 80vmin;
  margin-bottom: 5em;

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

  &__body {
    max-width: 800px;
    margin: 1rem auto 0;
    text-align: center;
  }

  &__content {
    color: white;
    padding: 3rem 2rem;
    background-color: rgba(0, 0, 0, 0.2);

    @media (max-width: 450px) {
      padding: 4rem 1rem;
    }
  }

  &__heading {
    max-width: 40%;
    padding: 0.6rem 0;
    border-bottom: 2px solid white;
    margin: 0 auto;

    > * {
      margin: 0 0.3rem;
    }

    img {
      vertical-align: middle;
    }

    h2 {
      display: inline-block;
    }

    @media (max-width: 768px) {
      max-width: 60%;
    }

    @media (max-width: 460px) {
      max-width: 80%;

      h2 {
        font-size: 1.1rem;
      }
    }
  }

  &__subtext {
    max-width: 60%;
    margin: 1.2rem auto;
    line-height: 1.5;

    @media (max-width: 768px) {
      max-width: 70%;
    }

    @media (max-width: 460px) {
      max-width: 90%;
      font-size: 1rem;
    }
  }
}

.searchbar {
  position: relative;
  margin-top: 2em;
  width: 90%;

  &__input {
    font-size: 1.35rem;
    padding: 1rem;
    padding-left: 5rem;
    border: none;
    border-radius: 0.4rem;
    width: 100%;
  }

  &__icon {
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    color: gray;

    img {
      width: 30px;
    }
  }
  //mini
  &.mini {
    flex-basis: 50%;

    .searchbar__input {
      font-size: 0.9rem;
      padding: 0.6rem;
      padding-left: 2rem;
      width: 100%;
      border: 1px solid rgba(0, 0, 0, 0.5);
    }

    .searchbar__icon {
      left: 0.6rem;
      top: 58%;

      img {
        width: 15px;
      }
    }
  }

  @media (max-width: 460px) {
    &__input {
      font-size: 1rem;
      padding: 0.8rem;
      padding-left: 3rem;
      width: 90%;
    }

    &__icon {
      left: 1rem;
      img {
        width: 12px;
      }
    }
  }
}

.search-result {
  &__title {
    margin-bottom: 0;
    font-size: 2.5rem;
    text-align: center;
  }
}
</style>
