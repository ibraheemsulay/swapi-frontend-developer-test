<template>
  <div class="pagination">
    <div><button disabled>3</button> of <button disabled>40</button></div>
    <div>
      <button @click="previous">
        <img src="@/assets/Images/chevron-left.svg" alt="previous" />
      </button>

      <button @click="next">
        <img src="@/assets/Images/chevron-right.svg" alt="next" />
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";

export default {
  props: ["category", "paginationItem"],
  setup(props) {
    const store = useStore();
    const data = reactive({
      current:
        store.getters[`${props.category}`].length - 9 > 1
          ? 9
          : store.getters[`${props.category}`].length,
      allItems: computed(() => store.getters[`${props.category}`]),
    });

    const next = (e) => {
      data.total = data.props.paginationItem.length;
      const element = e.currentTarget;
      element.clicks = (element.clicks || 0) + 1;

      let val = 6 * element.clicks;
      if (val < props.paginationItem.length) {
        data.current = val;
        store.commit(
          "setPaginationItem",
          props.paginationItem.slice(val, val + 6)
        );
      } else {
        data.current = props.paginationItem.length;
        element.clicks = 0;
      }
    };
    const previous = (e) => {
      data.total = data.props.paginationItem.length;
      const element = e.currentTarget;
      element.clicks = (element.clicks || 0) + 1;

      let val = 6 * element.clicks;
      if (val < props.paginationItem.length) {
        data.current = val;
        store.commit(
          "setPaginationItem",
          props.paginationItem.slice(val, val + 6)
        );
        console.log(store.state.paginationItem);
      } else {
        data.current = props.paginationItem.length;
        element.clicks = 0;
      }
    };

    return {
      ...toRefs(data),
      next,
      previous,
    };
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  div {
    margin: 1em 0 4em 0;
    button {
      height: 100%;
      padding: 0.5em;
      margin: 0 0.5em;
      img {
        height: 10px;
      }
    }
  }
}
</style>
