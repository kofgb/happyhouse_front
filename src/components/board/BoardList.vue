<template>
  <div class="row row-grid" v-if="articles.length">
    <board-list-item
      v-for="article in articles"
      :key="article.articleno"
      v-bind="article"
    ></board-list-item>
  </div>
  <div v-else class="text-center">
    <card class="border-0" hover shadow body-classes="py-5">
      <icon name="ni ni-sound-wave" type="warning" rounded class="mb-4"> </icon>
      <h6 class="text-warning text-uppercase">작성된 글이 없습니다.</h6>
    </card>
  </div>
</template>

<script>
import { listArticle } from "@/api/board.js";
import BoardListItem from "@/components/board/BoardListItem.vue";

export default {
  name: "BoardList",
  components: { BoardListItem },
  data() {
    return {
      articles: [],
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    listArticle(
      param,
      (response) => {
        this.articles = response.data;
      },
      (error) => {
        console.log(error);
      },
    );
  },
};
</script>
