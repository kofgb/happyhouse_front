<template>
  <div>
    <div class="my-3">
      <select
        class="form-control"
        v-model="sidoCode"
        :options="sidos"
        @change="gugunList"
      >
        <option
          v-for="option in sidos"
          :key="option.text"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
    <div>
      <select
        class="form-control"
        v-model="gugunCode"
        :options="guguns"
        @change="searchApt"
      >
        <option
          v-for="option in guguns"
          :key="option.text"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

/*
  namespaced: true를 사용했기 때문에 선언해줍니다.
  index.js 에서 modules 객체의 '키' 이름입니다.

  modules: {
    키: 값
    memberStore: memberStore,
    houseStore: houseStore
  }  
*/
const houseStore = "houseStore";

export default {
  name: "ApartNav",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "houses"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    this.CLEAR_SIDO_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(houseStore, ["getSido", "getGugun", "getHouseList"]),
    ...mapMutations(houseStore, ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST"]),
    // sidoList() {
    //   this.getSido();
    // },
    gugunList() {
      console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    searchApt() {
      if (this.gugunCode) this.getHouseList(this.gugunCode);
    },
  },
};
</script>

<style></style>
