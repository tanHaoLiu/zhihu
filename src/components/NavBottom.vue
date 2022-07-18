<template>
  <div class="container">
    <div class="nav_bottom">
      <van-tabbar v-model="active" active-color="rgb(94 116 94)">
        <!-- 返回 -->
        <van-tabbar-item icon="arrow-left" @click="handle"></van-tabbar-item>
        <!-- 评论 -->
        <van-tabbar-item
          icon="comment-o"
          :badge="num.comments"
          @click="commentView"
        ></van-tabbar-item>
        <!-- 点赞 -->
        <van-tabbar-item
          :color="clickLike ? '#f00' : ''"
          :badge="num.popularity"
          @click="like"
        >
          <template #icon>
            <van-icon
              :name="clickLike ? 'good-job' : 'good-job-o'"
              :color="clickLike ? '#f00' : ''"
            />
          </template>
        </van-tabbar-item>
        <!-- 收藏 -->
        <van-tabbar-item :icon="clickStar ? 'star' : 'star-o'" @click="star">
          <template #icon>
            <van-icon
              :name="clickStar ? 'star' : 'star-o'"
              :color="clickStar ? '#fc0' : ''"
            />
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <!-- 分享 -->
          <van-cell icon="share-o" @click="showShare = true" />
          <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
        /></van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      clickLike: false,
      clickStar: false,
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
      collectionData: [],
    };
  },
  props: ["num"],
  methods: {
    // 返回
    handle() {
      this.$router.back();
    },
    // 点赞
    like() {
      this.clickLike = !this.clickLike;
      if (this.clickLike) {
        this.$emit("changePopularity", true);
      } else {
        this.$emit("changePopularity", false);
      }
    },
    // 收藏
    async star() {
      var flag = true;
      this.clickStar = !this.clickStar;
      let loadData = JSON.parse(localStorage.getItem("loadData"));
      this.collectionData =
        JSON.parse(localStorage.getItem("collection")) || [];
      // 遍历查重
      this.collectionData.forEach((item, index) => {
        if (item.id == this.num.pageId) {
          if (this.clickStar) {
            flag = false;
          } else {
            this.collectionData.splice(index, 1);
          }
        }
      });
      // 添加收藏
      if (flag && this.clickStar) {
        loadData.forEach((element) => {
          if (element.id == this.num.pageId) {
            this.collectionData.push(element);
          }
        });
      }
      localStorage.setItem("collection", JSON.stringify(this.collectionData));
    },
    // 跳转评论页
    commentView() {
      this.$router.push({
        path: "Commentview",
        query: { pageId: this.num.pageId },
      });
    },
  },
  beforeMount() {
    this.collectionData = JSON.parse(localStorage.getItem("collection")) || [];
    // 遍历查重
    this.collectionData.forEach((item) => {
      if (item.id == this.num.pageId) {
        this.clickStar = true;
      }
    });
  },
};
</script>

<style lang="less" scoped>
.container {
  /deep/.van-tabbar {
    background: rgba(@primaryColor, 1);
  }

  /deep/.van-tabbar-item--active {
    background-color: rgba(@primaryColor, 1);
  }
  color: rgb(@primaryTextColor) !important;
  .nav_bottom {
    width: 100%;
    height: 14vw;

    .van-tabbar-item {
      color: rgb(@primaryTextColor);
    }
    .van-tabbar-item:nth-child(1) {
      height: 7vw;
      border-right: 1px solid rgba(87, 84, 84, 0.522);
      color: rgb(@primaryTextColor);
      margin: auto 0;
    }
    .van-icon-share-o:before {
      font-size: 20px;
    }

    .van-cell {
      background-color: rgba(@primaryColor, 1);
      color: rgb(@primaryTextColor);
    }

    .van-cell__left-icon,
    .van-cell__right-icon {
      height: 30px;
    }
  }
}
</style>