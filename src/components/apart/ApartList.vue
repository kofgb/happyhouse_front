<template>
  <div class="col">
    <div class="text-center mt-3" v-if="houses && houses.length != 0">
      <card class="border-0" shadow body-classes="py-5">
        <apart-list-item
          v-for="(house, index) in houses"
          :key="index"
          :house="house"
        ></apart-list-item>
      </card>
    </div>
    <div v-else class="text-center mt-3">
      <card class="border-0" hover shadow body-classes="py-5">
        <icon name="ni ni-sound-wave" type="warning" rounded class="mb-4">
        </icon>
        <h6 class="text-warning text-uppercase">검색 결과가 없습니다.</h6>
      </card>
    </div>
  </div>
</template>

<script>
import ApartListItem from "./ApartListItem.vue";
import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "ApartList",
  components: {
    ApartListItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
    // houses() {
    //   return this.$store.state.houses;
    // },
  },
  watch: {
    houses() {
      console.log(this.houses);
    },
  },
};
</script>

<style></style>
