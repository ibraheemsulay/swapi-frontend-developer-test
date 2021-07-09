<template>
  <div class="description">
    <header class="hero">
      <img class="hero__banner" :src="heroBanner" alt="Hero banner" />
      <nav class="hero__navbar">
        <router-link :to="{ name: 'Home' }">
          <img :src="logo" alt="Star wars logo" class="hero__logo" />
        </router-link>
      </nav>
      <div class="hero__body">
        <div class="img__container">
          <img :src="imageLink" :alt="category" />
        </div>
        <div class="description__title">
          <div class="item__name">
            <div class="bracket__left"></div>
            <h1>{{ name.split(" ")[0] }}</h1>
            <div class="bracket__right"></div>
          </div>

          <div class="description__slider">
            <button @click="navigatePrevious">
              <img
                src="@/assets/Images/arrow_left_white_24dp.svg"
                alt="previous icon"
              />
            </button>
            <button @click="navigateNext">
              <img
                src="@/assets/Images/arrow_right_white_24dp.svg"
                alt="next icon"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
    <section class="section">
      <h2 class="section__title">{{ name }} Details</h2>
      <div class="section__body">
        <p v-if="category === 'starships'">
          {{ item[0].name }} is of the {{ item[0].model }} model and was
          manufactured by {{ item[0].manufacturer }}. It costs
          {{ item[0].cost_in_credits }} credits. It has a length of
          {{ item[0].length }}, maximum atmosphering speed of 950, crew capacity
          of {{ item[0].crew }}, and cargo capacity of
          {{ item[0].cargo_capacity }}. It has
          {{ item[0].passengers }}
          passengers. It has {{ item[0].consumables }} consumables,
          {{ item[0].hyperdrive_rating }} hyperdrive rating,
          {{ item[0].MGLT }} MGLT, and starship class of
          {{ item[0].starship_class }}.
        </p>
        <p v-if="category === 'planets'">
          {{ item[0].name }} has a rotation period of
          {{ item[0].rotation_period }}, and has a diamater of
          {{ item[0].diameter }}. It has an orbital period of
          {{ item[0].orbital_period }}, {{ item[0].climate }} climate, gravity
          of {{ item[0].gravity }}, and has {{ item[0].terrain }} terrain. The
          population of Tatooine is {{ item[0].population }}, and has a surface
          water of {{ item[0].surface_water }}.
        </p>
        <p v-if="category === 'characters'">
          {{ item[0].name }} is a
          {{ item[0].gender == "n/a" ? "robot" : item[0].gender }}, and is
          {{ item[0].height }} tall.
          {{
            item[0].gender === "male"
              ? "He"
              : item[0].gender === "female"
              ? "She"
              : "It"
          }}
          has a mass of {{ item[0].mass }},
          {{ item[0].hair_color == "n/a" ? "no" : item[0].hair_color }} hair
          color, {{ item[0].eye_color }} eye color,
          {{ item[0].skin_color }} skin color, and was born in the year
          {{ item[0].birth_year }}.
        </p>
      </div>
      <div class="recently-viewed">
        <h2 class="recently-viewed__title">Recently Viewed</h2>
        <div class="view-card">
          <RecentlyViewed
            v-for="item in history"
            :item="item"
            :key="item.name"
          />
        </div>
        <ul class="slider">
          <li><button class="first" @click="first"></button></li>
          <li><button class="second" @click="second"></button></li>
          <li><button class="third" @click="third"></button></li>
        </ul>
      </div>
    </section>
    <div class="recently-viewed__button">
      <router-link :to="{ name: 'Home' }"
        ><button type="button">Return Home</button></router-link
      >
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import RecentlyViewed from "../components/Partials/RecentlyViewed.vue";

export default {
  props: ["category", "name"],
  components: {
    RecentlyViewed,
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const data = reactive({
      history: computed(() => store.getters.history.slice(0, 3)),
      planets: computed(() => store.getters.popularPlanets),
      image: computed(() => store.state.images.planets),
      imageLink: store.state.images[`${props.category}`][0],
      counter: 0,
      heroBanner: computed(() => store.state.images.heroBanner),
      logo: computed(() => store.state.images.logo),
      item: computed(() =>
        store.state[`${props.category}`].filter(
          (item) => item.name == props.name
        )
      ),
      characters: computed(() =>
        store.state[`${props.category}`].map((item) => item.name)
      ),
      images: computed(() => store.state.images[`${props.category}`]),
    });

    watch(
      () => [...props.name],
      (currentValue, oldValue) => {
        data.counter = data.characters.indexOf(currentValue.join(""));

        if (
          store.getters.recentlyViewed.indexOf(data.newItem) == -1 &&
          oldValue.join("") !== currentValue.join("")
        ) {
          store.dispatch("recentlyViewed", { newItem: data.item });
        }
      }
    );
    (function () {
      data.counter = data.characters.indexOf(props.name);
    })();

    const navigateNext = () => {
      const count = data.counter + 1;
      if (count == data.characters.length) return;
      if (count < data.characters.length) {
        data.imageLink =
          data.images[Math.floor(Math.random() * data.images.length)];
        router.push({
          name: "Description",
          params: {
            name: data.characters[count],
            category: props.category,
          },
        });
        document.getElementsByClassName("third")[0].style.background = "black";
        document.getElementsByClassName("second")[0].style.background = "white";
        document.getElementsByClassName("first")[0].style.background = "white";
      }
    };

    const navigatePrevious = () => {
      const count = data.counter - 1;
      if (count < 0) return;
      if (count >= 0) {
        data.imageLink =
          data.images[Math.floor(Math.random() * data.images.length)];
        router.push({
          name: "Description",
          params: {
            name: data.characters[count],
            category: props.category,
          },
        });

        document.getElementsByClassName("third")[0].style.background = "black";
        document.getElementsByClassName("second")[0].style.background = "white";
        document.getElementsByClassName("first")[0].style.background = "white";
      }
    };

    const first = (e) => {
      const view = store.getters.recentlyViewed.slice(0, 3);
      store.commit("setHistory", view);
      e.target.style.backgroundColor = "black";
      document.getElementsByClassName("second")[0].style.background = "white";
      document.getElementsByClassName("third")[0].style.background = "white";
    };

    const second = (e) => {
      const view = store.getters.recentlyViewed.slice(3, 6);
      store.commit("setHistory", view);
      e.target.style.backgroundColor = "black";
      document.getElementsByClassName("first")[0].style.background = "white";
      document.getElementsByClassName("third")[0].style.background = "white";
    };

    const third = (e) => {
      const view = store.getters.recentlyViewed.slice(6, 9);
      store.commit("setHistory", view);
      e.target.style.backgroundColor = "black";
      document.getElementsByClassName("second")[0].style.background = "white";
      document.getElementsByClassName("first")[0].style.background = "white";
    };

    return {
      ...toRefs(data),
      navigatePrevious,
      navigateNext,
      first,
      second,
      third,
    };
  },
};
</script>

<style lang="scss" scoped>
.description {
  padding-bottom: 5em;
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
  }
  .hero__body {
    .img__container {
      margin-right: auto;
      margin-left: auto;
      width: 40%;
      height: 50%;

      img {
        width: 100%;
        height: 300px;
        object-fit: fill;
      }
      @media (max-width: 700px) {
        margin-top: 20px;
        width: 60%;
      }
      @media (max-width: 500px) {
        margin-top: 20px;
        width: 70%;
      }
    }

    .description__title {
      color: white;

      margin-left: 1.5rem;

      display: flex;
      justify-content: space-between;
      margin-top: 3em;

      .item__name {
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        @media (max-width: 700px) {
          font-size: 0.8rem;
        }
        @media (max-width: 600px) {
          font-size: 0.5rem;
        }
        @media (max-width: 400px) {
          justify-content: center;
          margin-bottom: 4em;
        }

        h1 {
          align-self: center;
          margin: auto 0.3em;
        }

        .bracket__left,
        .bracket__right {
          height: 50px;
          width: 20px;
          border: 1px solid white;
          @media (max-width: 600px) {
            height: 30px;
            width: 10px;
          }
        }
        .bracket__left {
          border-right: none;
        }
        .bracket__right {
          border-left: none;
        }
      }
    }
  }

  &__slider {
    margin-right: 2em;
    button {
      padding: 0;
      margin: 0 0.5rem;
      border: 1px solid #fff;
      color: #fff;
      background: none;
      height: 65px;
      width: 65px;
      border-radius: 50%;
      transition: all ease-in 0.1s;
      cursor: pointer;

      @media (max-width: 700px) {
        height: 40px;
        width: 40px;
        padding: 0;
      }

      img {
        width: 3em;
        border-radius: 50%;
      }
    }
    button:hover {
      background: #3b3b3b;
    }
  }
  .section {
    padding: 2rem 3rem;
    margin: 0 3rem;
    @media (max-width: 500px) {
      padding: 2rem 1rem;
    }

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
      border-bottom: 1px solid #3333334d;
      p {
        flex-basis: 50%;
        margin-bottom: 5rem;
        @media (max-width: 900px) {
          flex-basis: 80%;
        }
        @media (max-width: 600px) {
          flex-basis: 100%;
        }
      }
    }
  }
  .recently-viewed {
    padding: 0 3rem;
    @media (max-width: 500px) {
      padding: 2rem 1rem;
    }
    .view-card {
      display: flex;
      justify-content: space-around;
      margin-top: 50px;
      flex-wrap: wrap;
      @media (max-width: 600px) {
        display: block;
      }
    }

    &__title {
      position: relative;
      text-align: center;
      padding: 0 0.5rem 0.5rem 0;

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
    .slider {
      display: flex;
      justify-content: center;
      list-style-type: none;
      margin-bottom: 2em;
      padding: 0;
      li {
        margin: 0 0.5em;
        button {
          height: 15px;
          border-radius: 8px;
          background: #fff;
        }
        .third {
          background: #000;
        }
      }
      li:nth-of-type(1) {
        margin-left: 0;
      }
    }

    &__button {
      text-align: center;
      margin: 0 auto;
      padding-bottom: 0.5em;
      border-bottom: 1px solid #3333334d;

      button {
        text-transform: capitalize;
        font-size: 1.3rem;
        font-weight: bolder;
        border: 1px solid #3333334d;
        color: #0e0d1a;
        padding: 0.5rem 1rem;
        background: none;
        cursor: pointer;
        transition: all ease-in 0.1s;
        border-radius: 5px;

        @media (max-width: 768px) {
          width: 70vw;
        }
      }
      button:hover {
        background: #b6b5b585;
      }
    }
  }
}
</style>
