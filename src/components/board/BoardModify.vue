<template>
  <div class="row row-grid">
    <board-input-item type="modify" />
  </div>
</template>
<script>
import BoardInputItem from "@/components/board/BoardInputItem.vue";

export default {
  name: "BoardWrite",
  components: {
    BoardInputItem,
  },
};
</script>
<style></style>
