<template>
  <div class="container">
    <div class="message">
      <!-- 头像 -->
      <div class="head_image">
        <img :src="Comments.avatar" alt="" />
      </div>
      <!-- 主要信息 -->
      <div class="main_msg">
        <!-- 举报评论 -->
        <div class="many">
          <van-popover
            v-model="showPopover"
            trigger="click"
            :actions="actions"
            placement="left"
            theme="dark"
          >
            <template #reference>
              <van-icon name="ellipsis" />
            </template>
          </van-popover>
        </div>

        <div>
          <div class="author">{{ Comments.author }}</div>
          <div class="content">
            {{ Comments.content }}
          </div>
        </div>

        <!-- 列表底部 -->
        <div class="list_bottom">
          <div class="time">{{ commentTime.toLocaleTimeString() }}</div>
          <div class="right">
            <div>
              <span>{{ likeCount }}</span>
              <van-icon
                :name="islike ? 'good-job' : 'good-job-o'"
                :color="islike ? '#f00' : ''"
                @click="change"
              />
            </div>
            <div>
              <van-icon name="chat-o" @click="comFocus" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      islike: false,
      likeCount: this.Comments.likes,
      showPopover: false,
      actions: [{ text: "举报", icon: "warn-o" }],
      commentTime: 0,
    };
  },
  methods: {
    change() {
      this.islike = !this.islike;
      if (this.islike) {
        this.likeCount += 1;
      } else {
        this.likeCount -= 1;
      }
    },
    // 传父组件
    comFocus() {
      this.$emit("comFocus");
    },
  },
  props: ["Comments"],
  created() {
    this.commentTime = new Date(this.Comments.time);
    // console.log(this.commentTime.toLocaleTimeString());
  },
};
</script>

<style lang="less" scoped>
.container {
  .message {
    width: 100%;
    min-height: 35vw;
    padding-top: 4vw;
    border-bottom: 1px solid #e2dada;
    display: flex;
    // 头像
    .head_image {
      width: 19vw;
      img {
        width: 11vw;
        border-radius: 50%;
      }
    }
    // 主要评论信息
    .main_msg {
      width: 76vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-bottom: 3vw;
      font-size: 4.5vw;
      .many {
        width: 10vw;
        position: absolute;
        right: 2.5vw;
      }
      .author {
        width: 50vw;
        font-weight: bold;
        text-align: left;
      }

      .content {
        width: 100%;
        text-align: left;
        margin-top: 1.2vw;
      }
      //   底边内容
      .list_bottom {
        width: 76vw;
        color: rgb(132, 124, 124);
        margin-top: 3vw;
        text-align: left;
        display: flex;
        justify-content: space-between;
        .time {
          font-size: 3.3vw;
        }
        .right {
          width: 18vw;
          display: flex;
          font-size: 5vw;
          justify-content: space-between;
        }
        span {
          font-size: 4vw;
        }
      }
    }
  }
}
</style>