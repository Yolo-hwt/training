<template>
  <div class="home-page">
    <header>
      <i class="iconfont icon-caozuoxitong home-icon"></i>
      <!-- <i class="iconfont icon-xitong1 home-icon"></i> -->
      <h1>港口库场流动机械运行监控系统</h1>
    </header>
    <!-- <img class="home-bg" src="../../assets/homebg.jpg" alt="主页背景" /> -->
    <div class="wrapper">
      <div class="cols home-page-cols">
        <div
          class="col"
          ontouchstart="this.classList.toggle('hover');"
          v-for="(item, index) in menuList"
          :key="index"
        >
          <div class="container" @click="routeToMenu(index)">
            <div
              class="front"
              :style="{ 'background-image': 'url(' + item.pic + ')' }"
            >
              <!-- :style="{ 'background-image': 'url(' + item.pic + ')' }" -->
              <div class="inner">
                <p>{{ item.name }}</p>
              </div>
            </div>
            <div class="back">
              <div class="inner">
                <p>
                  {{ item.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer>Copyright 2022 by hwt v1.0</footer>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      menuList: [
        {
          name: "实时监控",
          desc: "实时监测设备位置信息",
          target: "/graph",
          // pic: "../../assets/monitor.png",
          pic: require("../../assets/monitor.png"),
        },
        {
          name: "点检记录",
          desc: "设备点检记录列表",
          target: "/test",
          // pic: "../../assets/record.png",
          pic: require("../../assets/record.png"),
        },
        {
          name: "状态管理",
          desc: "设备状态管理中心",
          target: "/status",
          // pic: "../../assets/status.png",
          pic: require("@/assets/status.png"),
        },
      ],
    };
  },
  methods: {
    getLocalPicByName(picnme, type = "png") {
      return require("../../assets/" + picnme + "." + type);
      // return require(picnme);
    },
    routeToMenu(index) {
      this.$router.push(this.menuList[index].target);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.home-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-image: url("../../assets/homebg.jpg");
  background-size: cover;
}
.home-icon {
  font-size: 45px;
  padding-right: 20px;
  padding-top: 5px;
}
header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90px;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.05);
  color: #fff;
  box-shadow: 0px 0px 10px rgb(157, 191, 207);
}
header h1 {
  line-height: 90px;
  text-align: center;
  letter-spacing: 0.2em;
  font-size: 40px;
  text-shadow: 4px 4px 6px black;
}
footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;

  line-height: 50px;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  color: lightgray;
  font-size: 15px;
}
.wrapper {
  /* width: 90%; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.cols {
  width: 75%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: space-around;
}
.col {
  width: calc(23%);
  margin: 3rem 2rem;
  cursor: pointer;
}

.container {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-perspective: 1000px;
  perspective: 1000px;
}

.front,
.back {
  background-size: cover;
  background-position: center;
  -webkit-transition: -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  -o-transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1),
    -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  text-align: center;
  min-height: 360px;
  height: auto;
  border-radius: 20px;
  color: #fff;
  font-size: 1.5rem;
}

.back {
  background: #cedce7;
  background: -webkit-linear-gradient(45deg, #cedce7 0%, #596a72 100%);
  background: -o-linear-gradient(45deg, #cedce7 0%, #596a72 100%);
  background: linear-gradient(45deg, #cedce7 0%, #596a72 100%);
}

.front:after {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  content: "";
  display: block;
  opacity: 0.2;
  background-color: #000;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 20px;
}
.container:hover .front,
.container:hover .back {
  -webkit-transition: -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  -o-transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1),
    -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  letter-spacing: 1pt;
  font-size: 16pt;
  font-weight: 400;
}

.inner {
  -webkit-transform: translateY(-50%) translateZ(60px) scale(0.94);
  transform: translateY(-50%) translateZ(60px) scale(0.94);
  top: 50%;
  position: absolute;
  left: 0;
  width: 100%;
  padding: 2rem;
  font-size: 1.1em;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 1px solid transparent;
  -webkit-perspective: inherit;
  perspective: inherit;
  z-index: 2;
}
.back :hover {
  color: #1062b5;
}
.container .back {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.container .front {
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.container:hover .back {
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.container:hover .front {
  -webkit-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.front .inner p {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  position: relative;
  letter-spacing: 2pt;
}

.front .inner p:after {
  content: "";
  width: 4rem;
  height: 2px;
  position: absolute;
  background: #c6d4df;
  display: block;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -0.75rem;
}

.front .inner span {
  /* color: rgba(255, 255, 255, 0.7); */
  color: white;
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 1.6rem;
}

@media screen and (max-width: 64rem) {
  .col {
    width: calc(33.333333% - 2rem);
  }
}

@media screen and (max-width: 48rem) {
  .col {
    width: calc(50% - 2rem);
  }
}

@media screen and (max-width: 32rem) {
  .col {
    width: 100%;
    margin: 0 0 2rem 0;
  }
}
</style>