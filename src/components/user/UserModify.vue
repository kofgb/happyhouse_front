<template>
  <section class="section section-skew">
    <div class="container">
      <card shadow class="card-profile mt--300" no-body>
        <form class="px-4" role="form" @submit="onSubmit">
          <div class="row justify-content-center">
            <div class="col-lg-3 order-lg-2">
              <div class="card-profile-image">
                <img
                  v-lazy="'../img/theme/team-4-800x800.jpg'"
                  class="rounded-circle"
                />
              </div>
            </div>

            <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
              <div class="card-profile-actions py-4 mt-lg-0">
                <base-button
                  type="warning"
                  size="sm"
                  class="mr-4"
                  @click="onReset"
                  >초기화</base-button
                >
                <base-button
                  type="success"
                  size="sm"
                  class="float-right"
                  @click="onSubmit"
                  >저장</base-button
                >
              </div>
            </div>

            <div class="col-lg-4 order-lg-1">
              <div
                class="card-profile-stats d-flex justify-content-center"
              ></div>
            </div>
          </div>

          <div class="text-center mt-5 py-5">
            <form role="form" @submit="onSubmit">
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
                disabled
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
            </form>
          </div>
        </form>
      </card>
    </div>
  </section>
</template>

<script>
import { modifyMember } from "@/api/member";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberModify",
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
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    this.member = this.userInfo;
  },

  methods: {
    onSubmit(event) {
      event.preventDefault();
      //   let temp = document.getElementById("userpwdcheck").value;
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
      //   err &&
      //     this.member.userpwd != temp &&
      //     ((msg = "비밀번호가 다릅니다."), (err = false));

      //   console.log(this.member.userpwd === temp);
      if (!err) alert(msg);
      else this.modifyMember();
    },
    onReset(event) {
      event.preventDefault();
      this.member.username = "";
      this.member.userid = "";
      this.member.userpwd = "";
      this.member.email = "";
      //   this.$router.push({ name: "usermodify" });
    },
    modifyMember() {
      modifyMember(
        {
          userid: this.member.userid,
          username: this.member.username,
          userpwd: this.member.userpwd,
          email: this.member.email,
        },
        ({ data }) => {
          let msg = "회원정보 수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "회원정보 수정이 완료되었습니다.";
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
      this.$router.replace({ name: "profile" });
    },
  },
};
</script>

<style></style>
