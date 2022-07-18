<template>
  <div class="container">
    <div class="top">
      <van-icon name="arrow-left" @click="back()" />
    </div>

    <div class="main">
      <div class="head_image_name">
        <img src="@/assets/cute.jpeg" alt="" />
        <div class="name">冥思苦想</div>
      </div>
      <div class="coll_msg">
        <div class="message" @click="toCollection">
          <span>我的收藏</span><span><van-icon name="arrow" /></span>
        </div>
        <div class="message">
          <span>消息中心</span><span><van-icon name="arrow" /></span>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="patern">
        <div style="font-size: 8vw" @click="change">
          <van-icon :name="changenight ? 'eye-o' : 'closed-eye'" />
          <!-- closed-eye -->
        </div>
        <div style="font-size: 3.5vw">
          {{ changenight ? "夜间模式" : "白天模式" }}
        </div>
      </div>
      <div class="seting">
        <div class="patern">
          <div style="font-size: 8vw"><van-icon name="setting-o" /></div>
          <div style="font-size: 3.5vw">设置</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setTheme } from "../less/theme";
export default {
  data() {
    return {
      changenight: true,
    };
  },
  methods: {
    back() {
      this.$router.push({ name: "home" });
    },
    change() {
      if (this.changenight) {
        setTheme("dark");
      } else {
        setTheme("default");
      }
      this.changenight = !this.changenight;
      localStorage.setItem("on_close", JSON.stringify(this.changenight));
    },
    toCollection() {
      this.$router.push({ path: "Collectionmyself" });
    },
  },
  created() {
    switch (localStorage.getItem("on_close")) {
      case "false":
        this.changenight = false;
        break;
      case "true":
        this.changenight = true;
        break;
    }
    setTheme();
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100vh;
  // background: rgb(255, 253, 253);
  background: rgba(@primaryColor, 1);
  color: rgb(@primaryTextColor);
  // background-color: @primaryTextColor;
  .top {
    width: 100%;
    font-size: 7vw;
    text-align: left;
    box-sizing: border-box;
    padding-top: 3vw;
    padding-left: 4vw;
  }
  .main {
    .head_image_name {
      img {
        width: 22vw;
        border-radius: 50%;
        margin-top: 5vw;
      }
      .name {
        margin-top: 3vw;
        font-size: 5vw;
        font-weight: bolder;
      }
    }
    .coll_msg {
      margin-top: 11vw;
      .message {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 3.5vw 4.1vw;
        border-top: 1px solid rgba(64, 62, 62, 0.229);
        :nth-child(2) {
          display: inline-block;
        }
      }
    }
  }
  .bottom {
    width: 100%;
    position: absolute;
    bottom: 12vw;
    display: flex;
    justify-content: center;
    :nth-child(1),
    :nth-child(2) {
      width: 38vw;
    }
  }
}
</style>