<template>
  <div class="carousel">
    <van-swipe :autoplay="3000" indicator-color="#FFF">
      <van-swipe-item
        v-for="(data, index) in storiesdata"
        :key="index"
        @click="handle(index)"
      >
        <img v-lazy="data.image" />
        <div class="carousel_bgd">
          <div class="carousel_message">
            <div>{{ data.title }}</div>
            <div>{{ data.hint }}</div>
          </div>
          <img :src="data.image" alt="" />
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: ["storiesdata"],
  methods: {
    handle(index) {
      console.log(this.storiesdata);
      this.$router.push({
        path: "Newcontent",
        query: {
          id: this.storiesdata[index].id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.carousel {
  position: relative;
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  img {
    width: 100vw;
    height: 100vw;
    box-shadow: 0 -10vw 30vw red inset;
  }

  .carousel_bgd {
    width: 100%;
    height: 45vw;
    color: rgb(255, 255, 255);
    position: absolute;
    bottom: 4px;
    left: 0;
    overflow: hidden;

    .carousel_message {
      width: 100vw;
      height: 100%;
      position: relative;
      // left: 5vw;
      // top: 20vw;
      z-index: 99;
      background-image: linear-gradient(transparent, rgba(200, 52, 148, 0.295));
      :nth-child(1) {
        position: absolute;
        bottom: 15vw;
        left: 4vw;
        text-align: left;
        padding-right: 1.5vw;
        font-size: 6vw;
      }
      :nth-child(2) {
        position: absolute;
        bottom: 8vw;
        left: 5vw;
        margin-top: 3vw;
        text-align: left;
        font-size: 3.8vw;
      }
    }

    img {
      position: absolute;
      bottom: 0;
      left: 0;
      filter: blur(1px);
    }
  }

  /deep/.van-swipe__indicators {
    left: 86%;
    bottom: 6vw;
  }
  /deep/.van-swipe__indicator--active {
    width: 20px;
    height: 5px;
    margin-top: 1px;
    border-radius: 20%;
  }
}
</style>