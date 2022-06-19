<template>
  <section class="section section-skew">
    <div class="container">
      <card shadow class="card-profile mt--300" no-body>
        <div class="px-4">
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
                  type="info"
                  size="sm"
                  class="mr-4"
                  @click="moveModify()"
                  >회원정보 수정</base-button
                >
                <base-button
                  type="default"
                  size="sm"
                  class="float-right"
                  @click="deleteMem()"
                  >회원 탈퇴</base-button
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
            <h3>{{ userInfo.username }}</h3>
            <div class="h6 font-weight-300">
              <i class="ni location_pin"></i>@{{ userInfo.userid }}
            </div>
            <div class="row justify-content-center">{{ userInfo.email }}</div>
            <div class="row justify-content-center">
              {{ userInfo.joindate }}
            </div>
          </div>
        </div>
      </card>
    </div>
  </section>
</template>

<script>
import { deleteMember } from "@/api/member";
import { mapState, mapMutations } from "vuex";

const memberStore = "memberStore";

export default {
  name: "UserProfile",
  components: {},
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    moveModify() {
      this.$router.replace({
        name: "usermodify",
      });
    },
    deleteMem() {
      if (confirm("정말로 회원탈퇴를 하시겠습니까?")) {
        deleteMember(
          {
            userid: this.userInfo.userid,
            username: this.userInfo.username,
            userpwd: this.userInfo.userpwd,
            email: this.userInfo.email,
          },
          ({ data }) => {
            let msg = "회원 탈퇴 처리시 문제가 발생했습니다.";
            if (data === "success") {
              msg = "회원탈퇴가 완료되었습니다.";
            }
            alert(msg);
            this.onClickLogout();
          },
          (error) => {
            console.log(error);
          },
        );
      }
    },
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      // console.log("memberStore : ", ms);
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      if (this.$route.path != "/") this.$router.push({ name: "components" });
    },
  },
};
</script>

<style></style>
