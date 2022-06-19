<template>
  <div class="col" @click="selectHouse">
    <card hover>
      <div class="d-flex align-items-center">
        <badge type="info" circle class="mr-3" icon="ni ni-istanbul"></badge>
        <h6 class="mb-0">{{ house.아파트 | apartFormat }}</h6>
        <p>{{ house.일련번호 }}</p>
      </div>
    </card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

const houseStore = "houseStore";

export default {
  name: "ApartListItem",
  data() {
    return {
      isColor: false,
    };
  },
  props: {
    house: Object,
  },
  filters: {
    apartFormat(아파트) {
      if (아파트.length > 12) {
        return 아파트.substring(0, 12) + "…";
      } else {
        return 아파트;
      }
    },
  },
  methods: {
    ...mapActions(houseStore, ["detailHouse"]),
    selectHouse() {
      // console.log("listRow : ", this.house);
      // this.$store.dispatch("getHouse", this.house);
      this.detailHouse(this.house);
    },
    colorChange(flag) {
      this.isColor = flag;
    },
  },
};
</script>

<style scoped>
.apt {
  width: 50px;
}
.mouse-over-bgcolor {
  background-color: lightblue;
}
</style>
