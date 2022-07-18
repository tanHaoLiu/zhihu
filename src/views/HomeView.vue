<template>
  <div class="home" v-if="time" @changeTheme="changeTheme">
    <!-- 顶部 -->
    <navTop :time="time"></navTop>
    <!-- 刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="nav_bottom">
        <!-- 轮播图-->
        <Carousel :storiesdata="topstoriesdata"></Carousel>
        <!-- 文章列表 -->
        <van-list
          v-model="loading"
          @load="onLoad"
          :finished="finished"
          :immediate-check="false"
        >
          <div v-for="(item, index) in storiesdata" :key="index">
            <div class="currentTime" v-if="index != 0 && index % 6 == 0">
              {{ item.ga_prefix.substr(0, 2) }}月{{
                item.ga_prefix.substr(2, 2)
              }}日
              <hr />
            </div>
            <newList :item="item"></newList>
          </div>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import Carousel from "@/components/CarouselImage.vue";
import navTop from "@/components/NavTop.vue";
import newList from "@/components/NewList.vue";
import { setTheme } from "../less/theme";

export default {
  name: "HomeView",
  data() {
    return {
      // 下滚加载
      loading: false,
      finished: false,
      // 下拉刷新
      isLoading: false,
      storiesdata: [],
      topstoriesdata: [],
      time: "",
      // 上一天时间
      lastTime: "",
    };
  },

  components: {
    // 轮播图
    Carousel,
    navTop,
    newList,
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    },
    // 下滚加载
    onLoad() {
      // console.log(1);
      let timer = setTimeout(async () => {
        const { data: res } = await this.axios.get(
          "/stories/before/" + this.lastTime
        );
        console.log(res.stories);
        // res;
        // 结束加载
        this.loading = false;
        this.lastTime = res.date;
        // 拼接数组
        this.storiesdata = this.storiesdata.concat(res.stories);
        localStorage.setItem("loadData", JSON.stringify(this.storiesdata));
        clearTimeout(timer);
      }, 1000);
    },
    changeTheme() {
      console.log(123);
    },
  },

  async beforeMount() {
    const { data: res } = await this.axios.get("/stories/latest");
    this.storiesdata = res.stories;
    this.topstoriesdata = res.top_stories;
    //
    console.log(res);
    this.time = res.date;
    this.lastTime = res.date;
    setTheme();
  },
};
</script>

<style lang='less' scoped>
.home {
  // 文章
  background: rgba(@primaryColor, 1);
  color: rgb(@primaryTextColor);
  .nav_bottom {
    margin-top: 14vw;

    .currentTime {
      font-size: 2.8vw;
      text-align: left;
      color: rgb(160, 128, 128);
      padding-left: 4vw;
    }
  }
}
</style>
