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
                <small>정보를 입력하고 회원으로 가입하세요</small>
              </div>
              <form role="form">
                <base-input
                  id="username"
                  v-model="member.username"
                  type="text"
                  required
                  alternative
                  class="mb-3"
                  placeholder="Name"
                  addon-left-icon="ni ni-hat-3"
                >
                </base-input>
                <base-input
                  id="userid"
                  v-model="member.userid"
                  type="text"
                  required
                  alternative
                  class="mb-3"
                  placeholder="ID"
                  addon-left-icon="ni ni-single-02"
                >
                </base-input>
                <base-input
                  id="userpwd"
                  v-model="member.userpwd"
                  type="password"
                  required
                  alternative
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                >
                </base-input>
                <base-input
                  id="email"
                  v-model="member.email"
                  required
                  alternative
                  type="Email"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                >
                </base-input>
                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="onSubmit"
                    >회원가입</base-button
                  >
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-3">
            <div class="col-6">
              <a href="/login" class="text-light">
                <small>로그인</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { registerMember, checkId } from "@/api/member";
// import {mapState} from "vuex";

// const memberStore = "memberStore";

export default {
  name: "register",
  data() {
    return {
      member: {
        userid: "",
        username: "",
        userpwd: "",
        email: "",
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      // let temp = document.getElementById("userpwdcheck").value;
      let err = true;
      let msg = "";
      !this.member.userid && ((msg = "아이디를 입력해주세요"), (err = false));
      err &&
        !this.member.userpwd &&
        ((msg = "비밀번호를 입력해주세요"), (err = false));
      err &&
        !this.member.username &&
        ((msg = "이름을 입력해주세요"), (err = false));
      err &&
        !this.member.email &&
        ((msg = "이메일을 입력해주세요"), (err = false));
      // err &&
      //   this.member.userpwd != temp &&
      //   ((msg = "비밀번호가 다릅니다."), (err = false));

      if (!err) alert(msg);
      else {
        this.checkMember();
      }
    },
    checkMember() {
      checkId(
        this.member.userid,
        (response) => {
          if (response.data === 1) {
            alert("이미 있는 아이디입니다!!");
          } else {
            this.registMember();
          }
        },
        (error) => {
          console.log("에러 발생!!", error);
        }
      );
    },
    registMember() {
      registerMember(
        {
          userid: this.member.userid,
          username: this.member.username,
          userpwd: this.member.userpwd,
          email: this.member.email,
        },
        ({ data }) => {
          let msg = "회원 등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "회원 등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveList() {
      this.$router.push({ name: "components" });
    },
  },
};
</script>

<style></style>
