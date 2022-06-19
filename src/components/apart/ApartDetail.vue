<template>
  <div class="col mt-3" v-if="house">
    <div hover class="card bg-warning shadow border-0">
      <img v-lazy="'img/theme/img-1-1200x1000.jpg'" class="card-img-top" />
      <blockquote class="card-blockquote">
        <svg
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 583 95"
          class="svg-bg"
        >
          <polygon points="0,52 583,95 0,95" class="fill-warning"></polygon>
          <polygon
            points="0,42 583,95 683,0 0,95"
            opacity=".2"
            class="fill-info"
          ></polygon>
        </svg>
        <h4 class="display-3 font-weight-bold text-white">
          {{ house.아파트 }}
        </h4>
        <p class="lead text-italic text-white">
          일련번호 : {{ house.일련번호 }} <br />
          법정동 : {{ house.법정동 }} <br />
          층수 : {{ house.층 }}층 <br />
          거래금액 :
          {{ (parseInt(house.거래금액.replace(",", "")) * 10000) | price }}원
        </p>
      </blockquote>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "ApartDetail",
  computed: {
    ...mapState(houseStore, ["house"]),
    // house() {
    //   return this.$store.state.house;
    // },
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style></style>
