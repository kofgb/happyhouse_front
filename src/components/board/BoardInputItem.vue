<template>
  <div class="col">
    <card shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5">
      <template>
        <h2 class="display-4 text-primary">글 작성 에디터</h2>
        <p class="description mt-3">의견과 생각을 나눠보세요.</p>
        <form role="form" @submit="onSubmit">
          <div
            class="mt-3"
            id="userid-group"
            label="작성자 : "
            label-for="userid"
            description="작성자를 입력하세요."
          >
            <base-input
              alternative
              required
              placeholder=" ID"
              addon-left-icon="ni ni-single-02"
              id="userid"
              disabled
              v-model="article.userid"
              ref="userid"
            >
            </base-input>
          </div>
          <div
            class="mt-3"
            id="subject-group"
            label="제목 : "
            label-for="subject"
            description="제목을 입력하세요."
          >
            <base-input
              alternative
              required
              placeholder="Subject"
              addon-left-icon="ni ni-tie-bow"
              id="usercontent"
              v-model="article.subject"
              ref="subject"
            >
            </base-input>
          </div>
          <div
            class="mb-4"
            id="content-group"
            label="내용 : "
            label-for="content"
            description="내용을 입력하세요."
          >
            <base-input>
              <textarea
                id="content"
                v-model="article.content"
                class="form-control form-control-alternative"
                rows="10"
                cols="80"
                placeholder="Content"
                ref="content"
              ></textarea>
            </base-input>
          </div>
          <div class="text-center">
            <base-button type="primary" class="m-1" @click="movePage"
              >목록으로</base-button
            >
            <base-button type="warning reset" class="m-1" @click="onReset"
              >초기화</base-button
            >
            <base-button
              type="success submit"
              class="m-1"
              v-if="this.type === 'register'"
              @click="onSubmit"
              >등록</base-button
            >
            <base-button
              type="success submit"
              class="m-1"
              v-else
              @click="onSubmit"
              >저장</base-button
            >
          </div>
        </form>
      </template>
    </card>
  </div>
</template>
<script>
import { writeArticle, getArticle, modifyArticle } from "@/api/board";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "BoardInputItem",
  data() {
    return {
      article: {
        articleno: 0,
        userid: "",
        subject: "",
        content: "",
      },
    };
  },
  props: {
    type: { type: String },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    if (this.type === "modify") {
      getArticle(
        this.$route.params.articleno,
        ({ data }) => {
          // this.article.articleno = data.article.articleno;
          // this.article.userid = data.article.userid;
          // this.article.subject = data.article.subject;
          // this.article.content = data.article.content;
          this.article = data;
        },
        (error) => {
          console.log(error);
        },
      );
      this.isUserid = true;
    } else {
      this.article.userid = this.userInfo.userid;
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.article.userid && ((msg = "작성자 입력해주세요"), (err = false));
      err &&
        !this.article.subject &&
        ((msg = "제목 입력해주세요"), (err = false));
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"), (err = false));
      // this.$refs.content.focus());

      if (!err) alert(msg);
      else
        this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.articleno = 0;
      this.article.subject = "";
      this.article.content = "";
    },
    registArticle() {
      writeArticle(
        {
          userid: this.article.userid,
          subject: this.article.subject,
          content: this.article.content,
        },
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        },
      );
    },
    modifyArticle() {
      modifyArticle(
        {
          articleno: this.article.articleno,
          userid: this.article.userid,
          subject: this.article.subject,
          content: this.article.content,
        },
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.$router.push({ name: "boardlist" });
        },
        (error) => {
          console.log(error);
        },
      );
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
    movePage() {
      this.$router.push("/board/list");
    },
  },
};
</script>
<style></style>
