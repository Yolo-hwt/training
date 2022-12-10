<template>
  <div class="graph-container">
    <header>地图</header>
    <router-view class="graph-menu-view"></router-view>
    <footer>footer</footer>
  </div>
</template>

<script>
export default {
  mounted() {
    // this.$router.push({ name: "monitor" });
  },
};
</script>

<style scoped>
.graph-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: skyblue;
}
.graph-menu-view {
  flex: 1;
}
header {
  width: 100%;
  height: 90px;
  background: rgba(0, 0, 0, 0.05);
  color: #fff;
  box-shadow: 0px 0px 10px rgb(157, 191, 207);
}
footer {
  width: 100%;
  height: 50px;

  line-height: 50px;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  color: lightgray;
  font-size: 0.5rem;
}
</style>