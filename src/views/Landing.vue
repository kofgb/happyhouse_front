<template>
  <div>
    <div class="position-relative">
      <!-- shape Hero -->
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 shape-default shape-skew">
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
              <div class="col-lg-6">
                <h1 class="display-3 text-white">
                  게시판
                  <span>자유 주제</span>
                </h1>
                <p class="lead text-white">
                  정보와 경험담을 자유롭게 주고 받을 수 있습니다.
                </p>
                <div class="btn-wrapper">
                  <base-button
                    tag="a"
                    class="mb-3 mb-sm-0"
                    type="white"
                    icon="ni ni-laptop"
                    @click="movePage"
                  >
                    글쓰기
                  </base-button>
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
            <router-view></router-view>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  methods: {
    movePage() {
      this.$router.push("/board/write");
    },
  },
};
</script>
