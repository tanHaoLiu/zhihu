<template>
  <div class="read_content">
    <div class="select_article" @click="jumpin">
      <div class="content_msg">
        <div>{{ item.title }}</div>
        <div>{{ item.hint }}</div>
      </div>
      <img :src="item.images" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    jumpin() {
      this.$router.push({
        path: "Newcontent",
        query: {
          id: this.item.id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.read_content {
  .select_article {
    width: 93vw;
    min-height: 28vw;
    margin: 4vw auto;
    // border: 1px solid black;
    display: flex;
    justify-content: space-between;
    .content_msg {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-top: 1vw;
      :nth-child(1) {
        font-size: 4.5vw;
        letter-spacing: 0.3vw;
        font-weight: bold;
        text-align: left;
        width: 60vw;
      }
      :nth-child(2) {
        width: 60vw;
        font-size: 3vw;
        letter-spacing: 0.3vw;
        color: rgba(131, 137, 142, 0.79);
        margin-top: 1.3vw;
        text-align: left;
      }
    }

    img {
      width: 23vw;
      height: 23vw;
    }
  }
}
</style>