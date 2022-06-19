<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type="" effect="light" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
        HappyHouse
      </router-link>

      <div class="row" slot="content-header" slot-scope="{ closeMenu }">
        <div class="col-6 collapse-brand">
          <router-link to="/"> HappyHouse </router-link>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
          <a
            slot="title"
            href="#"
            class="nav-link"
            data-toggle="dropdown"
            role="button"
          >
            <i class="ni ni-ui-04 d-lg-none"></i>
            <span class="nav-link-inner--text">주택 정보</span>
          </a>
          <div class="dropdown-menu-inner">
            <!-- <router-link to="" class="media d-flex align-items-center">
              <div
                class="icon icon-shape bg-gradient-primary rounded-circle text-white"
              >
                <i class="ni ni-zoom-split-in"></i>
              </div>
              <div class="media-body ml-3">
                <h6 class="heading text-primary mb-md-1">이름으로 검색</h6>
                <p class="description d-none d-md-inline-block mb-0">
                  주택의 이름을 검색하여 그 위치와 정보를 조회합니다.
                </p>
              </div>
            </router-link> -->
            <router-link to="/apart" class="media d-flex align-items-center">
              <div
                class="icon icon-shape bg-gradient-warning rounded-circle text-white"
              >
                <i class="ni ni-square-pin"></i>
              </div>
              <div class="media-body ml-3">
                <h5 class="heading text-warning mb-md-1">위치로 검색</h5>
                <p class="description d-none d-md-inline-block mb-0">
                  지역을 특정하여 범위 내의 주택 정보를 조회합니다.
                </p>
              </div>
            </router-link>
          </div>
        </base-dropdown>
        <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
          <a
            slot="title"
            href="#"
            class="nav-link"
            data-toggle="dropdown"
            role="button"
          >
            <i class="ni ni-ui-04 d-lg-none"></i>
            <span class="nav-link-inner--text">게시판</span>
          </a>
          <div class="dropdown-menu-inner">
            <router-link
              to="/board/write"
              class="media d-flex align-items-center"
            >
              <div
                class="icon icon-shape bg-gradient-primary rounded-circle text-white"
              >
                <i class="ni ni-laptop"></i>
              </div>
              <div class="media-body ml-3">
                <h6 class="heading text-primary mb-md-1">글쓰기</h6>
                <p class="description d-none d-md-inline-block mb-0">
                  글 작성 에디터로 이동합니다.
                </p>
              </div>
            </router-link>
            <router-link to="/board" class="media d-flex align-items-center">
              <div
                class="icon icon-shape bg-gradient-warning rounded-circle text-white"
              >
                <i class="ni ni-books"></i>
              </div>
              <div class="media-body ml-3">
                <h5 class="heading text-warning mb-md-1">게시글 보기</h5>
                <p class="description d-none d-md-inline-block mb-0">
                  게시판에 쓰여진 글을 조회합니다.
                </p>
              </div>
            </router-link>
          </div>
        </base-dropdown>

        <li class="nav-item" menu-classes="dropdown-menu-xl" v-if="userInfo">
          <router-link to="/user" class="nav-link"
            ><i class="ni ni-diamond"></i> 회원정보</router-link
          >
        </li>
        <li class="nav-item" menu-classes="dropdown-menu-xl" v-else>
          <router-link to="/register" class="nav-link"
            ><i class="ni ni-spaceship"></i> 회원가입</router-link
          >
        </li>

        <li
          class="nav-item"
          menu-classes="dropdown-menu-xl"
          v-if="userInfo"
          @click.prevent="onClickLogout"
        >
          <router-link to="" class="nav-link"
            ><i class="ni ni-user-run"></i> 로그아웃</router-link
          >
        </li>
        <li class="nav-item" menu-classes="dropdown-menu-xl" v-else>
          <router-link to="/login" class="nav-link"
            ><i class="ni ni-key-25"></i> 로그인</router-link
          >
        </li>
      </ul>
      <!-- <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <li class="nav-item d-none d-lg-block ml-lg-4">
          <a href="" class="btn btn-neutral btn-icon">
            <span class="btn-inner--icon">
              <i class="ni ni-curved-next mr-2"></i>
            </span>
            <span class="nav-link-inner--text">정보 정정 요청</span>
          </a>
        </li>
      </ul> -->
    </base-nav>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import { mapState, mapMutations } from "vuex";

const memberStore = "memberStore";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
  methods: {
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
