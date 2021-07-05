<template>
  <div class="pagination">
    <div>
      <button disabled>{{ current }}</button> of
      <button disabled>{{ total }}</button>
    </div>
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
import { reactive, toRefs, computed, watch } from "vue";
import { useStore } from "vuex";

export default {
  props: ["category", "paginationItem"],
  setup(props) {
    const store = useStore();
    const data = reactive({
      paginationItem: props.paginationItem,
      total: props.paginationItem.length,
      nextCount: 1,
      prevCount: 0,
      current:
        store.getters[`${props.category}`].length - 6 > 1
          ? 6
          : store.getters[`${props.category}`].length,
      allItems: computed(() => store.getters[`${props.category}`]),
    });

    watch(
      () => [...props.paginationItem],
      (currentValue) => {
        data.paginationItem = currentValue;
        store.commit("setPaginationItem", currentValue.slice(0, 6));
        data.current = currentValue.slice(0, 6).length;
        data.total = data.paginationItem.length;
      }
    );

    const next = () => {
      data.total = data.paginationItem.length;

      let val = 6 * data.nextCount;
      if (val < data.paginationItem.length && val !== -6) {
        const list = data.paginationItem.slice(val, val + 6);
        data.current = val;
        store.commit("setPaginationItem", list);
        ++data.nextCount;
        if (Math.sign(data.prevCount) === -1) {
          const limit = Math.ceil(data.paginationItem.length / data.nextCount);
          data.prevCount <= -limit ? --data.prevCount : false;
        } else {
          --data.prevCount;
        }
      } else {
        data.current = data.paginationItem.length;
        data.nextCount = 0;
      }
    };
    const previous = () => {
      data.total = data.paginationItem.length;

      let val = 6 * data.prevCount;
      if (val < data.paginationItem.length && val !== -6) {
        const list = data.paginationItem.slice(val, val + 6);
        data.current = val;
        store.commit("setPaginationItem", list);
        const limit = Math.ceil(data.paginationItem.length / data.nextCount);
        -data.nextCount < -limit ? false : --data.nextCount;
        ++data.prevCount;
      } else {
        data.current = data.paginationItem.length;
        data.prevCount = 0;
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
