<template>
  <div>
    <div class="nav_top">
      <div class="nav_left">
        <div>
          <div>{{ day }}</div>
          <div>{{ month }}月</div>
        </div>
        <div id="ver"></div>
        <div>{{ chString }}</div>
      </div>
      <div class="nav_right">
        <img src="@/assets/cute.jpeg" alt="" @click="mymsg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      day: 0,
      month: "",
      num: [
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二",
      ],
      currentHour: 0,
    };
  },
  computed: {
    chString() {
      if (this.currentHour < 12) {
        return "早上好！";
      } else if (this.currentHour < 18) {
        return "下午好！";
      } else if (this.currentHour < 22) {
        return "晚上好！";
      } else {
        return "知乎日报";
      }
    },
  },
  props: ["time"],
  methods: {
    mymsg() {
      this.$router.push({ path: "Personview" });
    },
  },
  created() {
    // 天
    this.day = this.time.substring(6, 8);
    // 月
    let index = Number(this.time.substring(4, 6)) - 1;
    this.month = this.num[index];

    let currentTime = new Date();
    this.currentHour = currentTime.getHours();
  },
};
</script>

<style lang="less" scoped>
// 顶部
.nav_top {
  width: 100%;
  height: 14vw;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding-right: 3.5vw;
  background: rgba(@primaryColor, 1);
  position: fixed;
  z-index: 999;
  .nav_left {
    width: 70%;
    display: flex;
    margin-top: 1.5vw;
    :nth-child(1) {
      width: 15vw;
      margin-top: 0.2vw;
      :nth-child(1) {
        width: 100%;
        height: 40%;
        font-size: 5vw;
        font-weight: bold;
      }
      :nth-child(2) {
        width: 100%;
        height: 40%;
        font-size: 3vw;
        font-weight: bold;
      }
    }
    :nth-child(3) {
      width: 35vw;
      font-size: 6vw;
      font-weight: bolder;
      letter-spacing: 0.2rem;
      margin-top: 1vw;
    }
    #ver {
      width: 0;
      height: 80%;
      border-right: 1px solid rgba(0, 0, 0, 0.432);
    }
  }

  .nav_right {
    margin-top: 1.5vw;
    img {
      width: 9vw;
      height: 9vw;
      border-radius: 50%;
      border: 1px solid pink;
    }
  }
}
</style>