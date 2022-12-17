<template>
  <div class="graph-container">
    <header>
      <i
        class="iconfont graph-icon"
        :class="{
          'icon-jiankong1': monitorobj.monitorIsActive,
          'icon-locus-full': traceobj.traceIsActive,
        }"
      ></i>
      <h1>{{ curPageTitle }}</h1>
      <div class="graph-nav">
        <a
          class="nav-static"
          v-bind:class="{ 'nav-active': traceobj.traceIsActive }"
          @click="changeRouterView('trace')"
          >{{ traceobj.title }}</a
        >
        <a
          class="nav-static nav-last"
          v-bind:class="{ 'nav-active': monitorobj.monitorIsActive }"
          @click="changeRouterView('monitor')"
          >{{ monitorobj.title }}</a
        >
        <el-button
          type="success"
          round
          @click="backToHomePage"
          class="graph-el-btn"
          >安全退出</el-button
        >
      </div>
    </header>
    <router-view class="graph-menu-view"></router-view>
    <!-- <div class="graph-menu-view"></div> -->
    <footer>Copyright 2022 by hwt v1.0</footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curPageTitle: "",
      traceobj: {
        title: "历史轨迹",
        page: "trace",
        traceIsActive: false,
      },
      monitorobj: {
        title: "实时监控",
        page: "monitor",
        monitorIsActive: false,
      },
    };
  },
  mounted() {
    this.initTitle();
  },
  methods: {
    initTitle() {
      const routename = this.$route.name;
      if (routename === this.monitorobj.page) {
        this.curPageTitle = this.monitorobj.title;
        this.monitorobj.monitorIsActive = true;
      } else if (routename === this.traceobj.page) {
        this.curPageTitle = this.traceobj.title;
        this.traceobj.traceIsActive = true;
      }
    },
    changeRouterView(page) {
      if (this.$route.name === page) {
        return;
      }
      this.traceobj.traceIsActive = false;
      this.monitorobj.monitorIsActive = false;
      if (page === "trace") {
        this.traceobj.traceIsActive = true;
        this.curPageTitle = this.traceobj.title;
      } else if (page === "monitor") {
        this.monitorobj.monitorIsActive = true;
        this.curPageTitle = this.monitorobj.title;
      }
      this.$router.push(page);
    },
    backToHomePage() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.graph-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #4c9ae9;
}
.graph-container h1 {
  display: inline-block;
  width: 50%;
  line-height: 90px;
  padding-left: 10px;
  letter-spacing: 0.5em;
  font-size: 40px;
  text-shadow: 4px 4px 6px black;
}
.graph-container .graph-el-btn {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 3px;
  box-shadow: 2px 2px 2px black;
}

.graph-menu-view {
  flex: 1;
}
.graph-icon {
  /* line-height: 90px;
  text-align: center; */
  display: inline-block;
  font-size: 60px;
  color: #fff;
  margin: auto 0;
  padding-left: 30px;
  padding-right: 30px;
}
.graph-nav {
  float: right;
  display: inline-block;
  line-height: 90px;
  padding: 0 30px;
}
.nav-static {
  display: inline-block;
  width: 200px;
  text-decoration: none;
  font-size: 20px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  letter-spacing: 0.5em;
  font-size: 23px;
  text-shadow: 4px 4px 6px black;
}
.nav-static:hover {
  font-size: 24px;
  color: rgb(250, 200, 88);
}
.nav-last {
  margin-right: 100px;
}
.nav-active {
  font-size: 24px;
  font-weight: 600;
  color: rgb(250, 200, 88);
}

header {
  width: 100%;
  height: 90px;
  /* background: rgba(0, 0, 0, 0.05); */
  color: #fff;
  box-shadow: 0px 0px 10px black;
  z-index: 999;
}

footer {
  width: 100%;
  height: 50px;

  line-height: 50px;
  text-align: center;
  background: rgba(0, 0, 0, 0.4);
  color: lightgray;
  font-size: 15px;
}
</style>