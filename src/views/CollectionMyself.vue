<template>
  <div class="container">
    <!-- 顶部 -->
    <div class="comment_top">
      <div class="top_left">
        <van-icon name="arrow-left" @click="toback" />
      </div>
      <div class="comment_sum">我的收藏</div>
    </div>
    <!-- 收藏的文章 -->
    <div class="list">
      <div v-for="(item, index) in collection" :key="index">
        <NewList :item="item"></NewList>
      </div>
    </div>
  </div>
</template>

<script>
import NewList from "@/components/NewList.vue";
import { setTheme } from "@/less/theme";
export default {
  data() {
    return {
      collection: [],
    };
  },
  methods: {
    toback() {
      this.$router.back();
    },
  },
  components: {
    NewList,
  },
  beforeMount() {
    this.collection = JSON.parse(localStorage.getItem("collection")) || [];
    console.log(this.collection);
    setTheme();
  },
};
</script>

<style lang="less" scoped>
.container {
  color: rgb(@primaryTextColor);
  background-color: rgba(@primaryColor, 1);

  .comment_top {
    width: 100%;
    height: 11vw;
    border-bottom: 1px solid #e2dada;
    background-color: rgba(@primaryColor, 1);
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    z-index: 999;
    // 顶部左边
    .top_left {
      width: 10vw;

      .van-icon-arrow-left:before {
        font-size: 6vw;
        font-weight: bolder;
      }
    }
    // 顶部中间评论数
    .comment_sum {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-weight: bold;
      font-size: 4.5vw;
      letter-spacing: 0.6vw;
    }
  }
  .list {
    margin-top: 10.8vw;
  }
}
</style>