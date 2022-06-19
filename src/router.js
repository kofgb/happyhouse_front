import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Apart from "./views/Apart.vue";

import BoardList from "./components/board/BoardList.vue";
import BoardDetail from "./components/board/BoardDetail.vue";
import BoardModify from "./components/board/BoardModify.vue";
import BoardWrite from "./components/board/BoardWrite.vue";

import UserModify from "./components/user/UserModify.vue";
import UserProfile from "./components/user/UserProfile.vue";

import store from "@/store/index.js";

Vue.use(Router);

// https://router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
  // console.log(store);
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const getUserInfo = store._actions["memberStore/getUserInfo"];
  let token = sessionStorage.getItem("access-token");
  if (checkUserInfo == null && token) {
    await getUserInfo(token);
  }
  if (checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    next({ name: "login" });
    // router.push({ name: "signIn" });
  } else {
    // console.log("로그인 했다.");
    next();
  }
};

export default new Router({
  linkExactActiveClass: "active",
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "components",
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter,
      },
    },
    {
      path: "/apart",
      name: "apart",
      components: {
        header: AppHeader,
        default: Apart,
        footer: AppFooter,
      },
    },
    {
      path: "/board",
      name: "board",
      redirect: "/board/list",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter,
      },
      children: [
        {
          path: "list",
          name: "boardlist",
          component: BoardList,
        },
        {
          path: "write",
          name: "boardwrite",
          beforeEnter: onlyAuthUser,
          component: BoardWrite,
        },
        {
          path: "detail/:articleno",
          name: "boarddetail",
          beforeEnter: onlyAuthUser,
          component: BoardDetail,
        },
        {
          path: "modify/:articleno",
          name: "boardmodify",
          beforeEnter: onlyAuthUser,
          component: BoardModify,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter,
      },
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter,
      },
    },
    {
      path: "/user",
      name: "profile",
      redirect: "/user/profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter,
      },
      children: [
        {
          path: "profile",
          name: "userprofile",
          beforeEnter: onlyAuthUser,
          component: UserProfile,
        },
        {
          path: "modify",
          name: "usermodify",
          beforeEnter: onlyAuthUser,
          component: UserModify,
        },
      ],
    },
  ],
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});
