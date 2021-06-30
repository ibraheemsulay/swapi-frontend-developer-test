<template>
  <div></div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const data = reactive({
      count: 0,
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style lang="scss" scoped></style>
