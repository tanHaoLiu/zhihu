<template>
  <div class="container">
    <div v-if="newdata == null">
      <van-skeleton title :row="10" />
    </div>
    <div v-else>
      <div v-html="newdata.body"></div>
      <!-- 底部标签 -->
      <NavBottom :num="num" @changePopularity="chag"></NavBottom>
    </div>
  </div>
</template>

<script>
import NavBottom from "@/components/NavBottom.vue";
import { setTheme } from "@/less/theme";
export default {
  data() {
    return {
      newdata: [],
      num: {
        comments: 0,
        popularity: 0,
        pageId: this.$route.query.id,
      },
    };
  },
  components: {
    NavBottom,
  },
  methods: {
    chag(bool) {
      if (bool) {
        this.num.popularity += 1;
      } else {
        this.num.popularity -= 1;
      }
    },
  },
  async beforeMount() {
    const { data: res } = await this.axios.get("story/" + this.$route.query.id);
    this.newdata = res.story;
    // 添加样式
    let link = document.createElement("link");
    link.id = "link";
    link.rel = "stylesheet";
    link.href = res.story.css[0];
    document.head.appendChild(link);
    console.log(this.newdata);

    // 评论数和点赞数
    const { data: res2 } = await this.axios.get(
      `story/${this.$route.query.id}/extra`
    );
    this.num.comments = res2.comments;
    this.num.popularity = res2.popularity;

    // 设置主题
    setTheme();
  },
  beforeDestroy() {
    let link = document.querySelector("#link");
    document.head.removeChild(link);
  },

  updated() {
    let imageplace = document.querySelector(".img-place-holder");
    if (imageplace && imageplace.innerHTML == "") {
      // let add = document.createElement("img");
      // add.src = this.newdata.image;
      // imageplace.appendChild(add);
      imageplace.innerHTML = "<img src=" + this.newdata.image + ">";

      // "<div class='imgtitle'>" +
      // this.newdata.title +
      // "</div>";

      let add = document.createElement("div");
      add.classList.add("imgtitle");
      add.innerHTML = this.newdata.title;
      imageplace.parentNode.appendChild(add);
    }
  },
};
</script>

<style lang="less" scoped>
.container {
  background: rgba(@primaryColor, 1) !important;
  color: rgb(@primaryTextColor);

  /deep/.headline {
    position: relative;
  }
  /deep/.img-place-holder {
    height: 100vw !important;
    img {
      width: 100%;
      height: 100%;
    }
  }
  /deep/.imgtitle {
    width: 90vw;
    text-align: left;
    color: white;
    font-weight: bold;
    position: absolute;
    bottom: 8vw;
    left: 5vw;
    font-size: 5vw;
    letter-spacing: 0.5vw;
  }

  /deep/.content {
    color: rgb(@primaryTextColor);
  }
  /deep/.content-wrap {
    background: none;
  }
  /deep/.headline {
    border-bottom: 4px solid transparent;
  }
}
</style>