<template>
  <div class="col-lg-4 py-3">
    <card class="border-0" hover shadow body-classes="py-5">
      <icon name="ni ni-check-bold" type="primary" rounded class="mb-4"> </icon>
      <h6 class="text-primary text-uppercase">
        {{ articleno }}. {{ subject | subjectFormat }}
      </h6>
      <p class="description mt-3">{{ content | contentFormat }}</p>
      <div>
        <badge type="primary" rounded>{{ userid }}</badge>
      </div>
      <router-link
        :to="{ name: 'boarddetail', params: { articleno: articleno } }"
      >
        <base-button tag="a" href="" type="primary" class="mt-4">
          자세히 보기
        </base-button>
      </router-link>
    </card>
  </div>
</template>
<script>
export default {
  name: "BoardListItem",
  props: {
    articleno: Number,
    userid: String,
    subject: String,
    hit: Number,
    regtime: String,
    content: String,
  },
  filters: {
    subjectFormat(subject) {
      if (subject.length > 12) {
        return subject.substring(0, 12) + "…";
      } else {
        return subject;
      }
    },
    contentFormat(content) {
      if (content.length > 18) {
        return content.substring(0, 18) + "…";
      } else {
        return content;
      }
    },
  },
};
</script>
<style></style>
