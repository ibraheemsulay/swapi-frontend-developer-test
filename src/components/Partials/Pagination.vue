<template>
  <div class="pagination">
    <div>
      <button disabled>{{ current }}</button> of
      <button disabled>{{ total }}</button>
    </div>
    <div>
      <button disabled id="previous" @click="previous">
        <img src="@/assets/Images/chevron-left.svg" alt="previous" />
      </button>

      <button id="next" @click="next">
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
      count: 1,
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
        data.count = 1;
        document.getElementById("previous").disabled = true;
        document.getElementById("next").disabled = false;
      }
    );

    //PAGINATION NEXT BUTTON
    const next = () => {
      ++data.count;
      document.getElementById("previous").disabled = false;
      let val = 6 * data.count;
      if (val > data.paginationItem.length) {
        val = val % 6 == 0 ? 6 : val % 6;
        document.getElementById("next").disabled = true;

        const list = data.paginationItem.slice(
          -val,
          data.paginationItem.length
        );
        store.commit("setPaginationItem", list);
        data.current = data.paginationItem.indexOf(list[list.length - 1]) + 1;
      } else {
        const list = data.paginationItem.slice(val, val + 6);
        store.commit("setPaginationItem", list);
        data.current = data.paginationItem.indexOf(list[list.length - 1]) + 1;
      }
    };

    //PAGINATION PREVIOUS BUTTON
    const previous = () => {
      --data.count;
      document.getElementById("next").disabled = false;
      let val = 6 * data.count;
      if (val == 0) {
        document.getElementById("previous").disabled = true;
        const list = data.paginationItem.slice(0, 6);
        store.commit("setPaginationItem", list);
        data.current = data.paginationItem.indexOf(list[list.length - 1]) + 1;
      } else {
        const list = data.paginationItem.slice(val, val + 6);
        store.commit("setPaginationItem", list);
        data.current = data.paginationItem.indexOf(list[0]) + 1;
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
