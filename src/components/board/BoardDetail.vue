<template>
  <div class="col">
    <card class="border-0" hover shadow body-classes="py-5">
      <icon name="ni ni-istanbul" type="info" rounded class="mb-4"> </icon>
      <h6 class="text-info text-uppercase">{{ article.subject }}</h6>
      <p class="description mt-3">
        {{ article.content }}
      </p>
      <div>
        <badge type="info" rounded>{{ article.userid }}</badge>
      </div>
      <div class="text-center">
        <base-button type="primary" class="m-1" @click="listArticle"
          >목록으로</base-button
        >
        <base-button
          type="info submit"
          v-if="article.userid === userInfo.userid"
          class="m-1"
          @click="moveModifyArticle"
          >수정</base-button
        >
        <base-button
          type="warning reset"
          v-if="article.userid === userInfo.userid"
          class="m-1"
          @click="deleteArticle"
          >삭제</base-button
        >
      </div>
    </card>
  </div>
</template>
<script>
// import moment from "moment";
import { mapState } from "vuex";
import { getArticle, deleteArticle } from "@/api/board";

const memberStore = "memberStore";

export default {
  name: "BoardDetail",
  data() {
    return {
      article: {},
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    getArticle(
      this.$route.params.articleno,
      (response) => {
        this.article = response.data;
      },
      (error) => {
        console.log("삭제시 에러발생!!", error);
      },
    );
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "boardlist" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "boardmodify",
        params: { articleno: this.article.articleno },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제할까요?")) {
        deleteArticle(this.article.articleno, () => {
          this.$router.push({ name: "boardlist" });
        });
      }
    },
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style></style>
