<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default shape-skew">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-center text-muted mb-4">
                <small>정보를 입력하여 로그인하세요</small>
              </div>
              <form role="form">
                <base-input
                  id="userid"
                  v-model="user.userid"
                  required
                  alternative
                  class="mb-3"
                  placeholder="ID"
                  addon-left-icon="ni ni-single-02"
                  @keyup.enter="confirm"
                >
                </base-input>
                <base-input
                  id="userpwd"
                  v-model="user.userpwd"
                  required
                  alternative
                  type="password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                  @keyup.enter="confirm"
                >
                </base-input>
                <base-checkbox> Remember me </base-checkbox>
                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="confirm"
                    >로그인</base-button
                  >
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-3">
            <div class="col-6">
              <a href="" class="text-light">
                <small>비밀번호 재발급</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <a href="/register" class="text-light">
                <small>신규회원 가입</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberLogin",
  data() {
    return {
      user: {
        userid: null,
        userpwd: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$router.push({ name: "components" });
      } else {
        alert("아이디와 비밀번호를 확인하세요.");
      }
    },
    movePage() {
      this.$router.push({ name: "register" });
    },
  },
};
</script>

<style></style>
