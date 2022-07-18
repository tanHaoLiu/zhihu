<template>
  <div class="container">
    <!-- 顶部 -->
    <div class="comment_top">
      <div class="top_left">
        <van-icon name="arrow-left" @click="toback" />
      </div>
      <div class="comment_sum">
        {{ longComments.length + shortComments.length }}条评论
      </div>
    </div>

    <!-- 评论内容 -->
    <div class="comment_main">
      <!-- 长评 -->
      <div class="total_comments">
        <div class="comment_count" v-if="longComments.length != 0">
          {{ longComments.length }}条长评
        </div>
        <div v-for="(item, index) in longComments" :key="index">
          <CommentList
            :Comments="item"
            @comFocus="comFocus(item.author)"
          ></CommentList>
        </div>
      </div>
      <!-- 短评 -->
      <div class="total_comments">
        <div class="comment_count" v-if="shortComments.length != 0">
          {{ shortComments.length }}条短评
        </div>
        <div v-for="(item, index) in shortComments" :key="index">
          <CommentList
            :Comments="item"
            @comFocus="comFocus(item.author)"
          ></CommentList>
        </div>
      </div>
    </div>
    <!-- 发表评论 -->
    <div class="write_comment">
      <van-field
        v-model="message"
        rows="1"
        autosize
        clearable
        type="textarea"
        left-icon="manager"
        :placeholder="inplaceholder"
        slot="left-icon"
        ref="input"
      >
        <template #left-icon>
          <img src="@/assets/cute.jpeg" alt="" id="headImg" />
        </template>
        <template #button>
          <van-button round type="info" size="small" color="#d83f5f">
            评论
          </van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import CommentList from "@/components/CommentList.vue";
import { setTheme } from "@/less/theme";
export default {
  data() {
    return {
      shortComments: [],
      longComments: [],
      show: true,
      message: "",
      inplaceholder: "请留下你友好的发言",
    };
  },

  methods: {
    // 返回
    toback() {
      this.$router.back();
    },
    // 回复
    comFocus(author) {
      this.$refs.input.focus();
      this.inplaceholder = "回复 @" + author + " :";
    },
  },

  components: {
    CommentList,
  },
  async beforeMount() {
    // 短评数据
    const { data: shortRes } = await this.axios.get(
      `story/${this.$route.query.pageId}/short-comments`
    );
    console.log(shortRes);
    // 长评数据
    const { data: longRes } = await this.axios.get(
      `story/${this.$route.query.pageId}/long-comments`
    );
    console.log(longRes);
    this.shortComments = shortRes.comments;
    this.longComments = longRes.comments;

    // const { data: res } = await this.axios.get(`/story/9741200/short-comments`);
    // console.log(res);

    setTheme();
  },
};
</script>

<style lang="less" scoped>
.container {
  background: rgba(@primaryColor, 1);
  color: rgb(@primaryTextColor);
  // 顶部
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
  // 评论内容
  .comment_main {
    margin-top: 11vw;
    width: 100%;
    // position: absolute;
    margin-bottom: 14vw;
    .total_comments {
      .comment_count {
        text-align: left;
        font-weight: bolder;
        padding: 4vw 0 3vw 4vw;
      }
    }
  }
  .write_comment {
    width: 100%;
    position: fixed;
    bottom: 0;
    #headImg {
      width: 8vw;
      border-radius: 50%;
    }
    .van-cell {
      // height: 13vw;
      font-size: 3.5vw;
      background-color: rgba(@primaryColor, 1);
      border: 1px solid white;
    }
    /deep/.van-cell__value--alone {
      margin-top: 1vw;
    }
    .van-field__control {
      line-height: 3vw;
    }
  }
}
</style>