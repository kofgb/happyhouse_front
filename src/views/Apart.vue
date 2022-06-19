<template>
  <div>
    <div>
      <div class="position-relative">
        <!-- shape Hero -->
        <section class="section-shaped my-0">
          <div class="shape shape-style-1 bg-gradient-danger shape-skew">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="container shape-container d-flex">
            <div class="col px-0">
              <div class="row">
                <div class="col-md-6 order-lg-2 ml-lg-auto">
                  <div class="position-relative pl-md-5">
                    <img src="img/ill/ill-2.svg" class="img-center img-fluid" />
                  </div>
                </div>
                <div class="col-lg-6">
                  <h1 class="display-3 text-white">
                    주택 정보
                    <span>위치로 검색</span>
                  </h1>
                  <p class="lead text-white">
                    주택과 인근 상가의 정보를 조사할 수 있습니다.
                  </p>
                  <div class="btn-wrapper">
                    <apart-nav></apart-nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- 1st Hero Variation -->
      </div>
      <section class="section section-lg pt-lg-0 mt--200">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12">
              <ka-kao-map-view></ka-kao-map-view>
            </div>
            <div></div>
            <apart-list></apart-list>
            <apart-detail></apart-detail>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ApartNav from "../components/apart/ApartNav.vue";
import ApartList from "../components/apart/ApartList.vue";
import ApartDetail from "../components/apart/ApartDetail.vue";
import KaKaoMapView from "../components/kakaomap/KaKaoMapView.vue";

export default {
  name: "Apart",
  components: { ApartNav, ApartList, ApartDetail, KaKaoMapView, ApartDetail },
  methods: {
    movePage() {
      this.$router.push("/board/write");
    },
  },
};
</script>
