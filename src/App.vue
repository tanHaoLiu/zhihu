<template>
  <div id="app">
    <keep-alive include="HomeView"> <router-view></router-view></keep-alive>
  </div>
</template>


<script>
export default {
  data() {
    return {
      zhuhudata: [],
    };
  },
  // async created() {
  //   console.log(111);
  //   await this.axios.get("/latest").then((res) => {
  //     console.log(res.data);
  //     this.zhuhudata = res.data;
  //     console.log(this.zhuhudata);
  //   });
  // },

  methods: {
    async getIfo() {
      const { data: res } = await this.axios.get("/latest");
      console.log(res.date);
    },
  },
};
</script>



<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // background: rgba(0, 0, 0, 0.804);
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
