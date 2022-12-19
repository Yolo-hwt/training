<template>
  <div class="trace-container">
    <div id="trace-map"></div>
    <div class="trace-right">
      <div id="piechart"></div>
      <div class="trace-opera">
        <h2>轨迹查询</h2>
        <div class="opera-item">
          <span>设备</span>
          <el-select v-model="equipValue" placeholder="选择设备">
            <el-option
              v-for="item in equipOptions"
              :key="item.equipId"
              :label="item.deviceName"
              :value="item.equipId"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div>
        <div class="opera-item">
          <span>时间</span>
          <el-date-picker
            v-model="workTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>

        <div class="opera-item">
          <span>轨迹列表</span>
          <el-select v-model="traceValue" placeholder="选择轨迹">
            <el-option
              v-for="(item, index) in traceHistory"
              :key="index + 1"
              :label="`码头${item.source}-${item.target}`"
              :value="index + 1"
            >
            </el-option>
          </el-select>
        </div>
        <div class="opera-item">
          <el-button
            type="primary"
            round
            class="trace-el-btn"
            @click="getTraceHistoryByEidAndDate()"
            >查询轨迹</el-button
          >
          <el-button
            type="primary"
            round
            class="trace-el-btn"
            :disabled="traceHistory.length == 0"
            @click="initAniByTrace()"
            >{{ pathViewOrClose ? "路径回放" : "清除路径" }}</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  CreateBaiduMap,
  AddMapControler,
  AddMapPoint,
  AddMapLable,
  PathPlayBackAnime,
  AddMapLine,
} from "@/utils/BaiduMap";
import { FormatDate } from "@/utils/DateFormat";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  DatasetComponent,
  GridComponent,
  VisualMapComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  DatasetComponent,
  GridComponent,
  VisualMapComponent,
  BarChart,
  CanvasRenderer,
]);
export default {
  data() {
    return {
      equipValue: "",
      workTime: [],
      //查询到的历史轨迹列表
      traceHistory: [
        {
          source: 1,
          target: 4,
          workTime: 10,
        },
        { source: 4, target: 8, workTime: 10 },
      ],
      //路径选择
      traceValue: "",
      //路径回放or清除路径
      pathViewOrClose: true,
      //echarts数据
      deviceWorkTime: [
        ["time", "amount", "devicename"],
        [89.3, 0, "设备1"],
        [57.1, 0, "设备2"],
        [74.4, 0, "设备3"],
        [50.1, 0, "设备4"],
        [89.7, 0, "设备5"],
        [68.1, 0, "设备6"],
      ],
      deviceMaxWorkTime: 100,
      //echarts坐标轴刻度label字体
      chartAxisLableFontSize: "15px",
      //echarts标头title字体
      chartTitleFontSize: "24px",
      //echarts标尺字体
      chartScaleFontSize: "20px",
      //echarts标尺宽度
      chartScaleWidth: "25px",
      //地图实例
      mapInstance: null,
      //地图dom
      mapTargetDom: "trace-map",
      //路径动画
      mapTrackAni: null,
      //标注图片
      mapSignIcon: require("../../assets/port.png"),
      //动画路径
      mapPolyLine: null,
      //
    };
  },
  computed: {
    ...mapGetters({
      mapConfig: "mapConfigGetter",
      equipOptions: "equipOptionsGetter",
    }),
  },
  mounted() {
    this.initMap();
    this.initPieChart();
  },
  //路由退出之前优先取消动画
  beforeRouteLeave(to, from, next) {
    this.mapTrackAni = null;
    next();
  },
  methods: {
    //初始化百度地图
    async initMap() {
      //初始化配置
      this.mapInstance = await CreateBaiduMap(
        this.mapInstance,
        this.mapTargetDom,
        this.mapConfig
      );
      //添加地图控制类
      await AddMapControler(this.mapInstance);
      //创建地图标点
      await AddMapPoint(this.mapInstance, this.mapSignIcon, this.mapConfig);
      //添加lable
      await AddMapLable(this.mapInstance, this.mapConfig);
    },
    //根据eid获取设备对象
    getEquipByEid(eid) {
      let res = {};
      for (const equip of this.equipOptions) {
        if (equip.equipId == eid) {
          res = equip;
          break;
        }
        return res;
      }
    },
    //根据设备id和日期获取历史轨迹
    async getTraceHistoryByEidAndDate() {
      if (this.equipValue == "") {
        alert("请选择设备！");
        return;
      }
      if (this.workTime.length == 0) {
        alert("请选择日期！");
        return;
      }
      const eid = this.equipValue;
      const sDate = FormatDate(this.workTime[0]);
      const eDate = FormatDate(this.workTime[1]);

      // console.log(sDate, eDate);
      //获取历史轨迹
      this.traceHistory = await this.$store.dispatch("getTraceByEidAndDate", {
        equipId: parseInt(eid),
        startTime: sDate,
        endTime: eDate,
      });
    },
    //根据码头id获取码头数据对象
    getWharfBySid(sid) {
      let ans = {};
      for (const item of this.mapConfig.mapSignList) {
        if (sid === item.sid) {
          ans = item;
          break;
        }
      }
      return ans;
    },
    //根据选择路径初始化回放动画
    async initAniByTrace() {
      if (!this.pathViewOrClose) {
        this.removeOverLay(this.mapPolyLine);
        this.mapPolyLine = null;
        this.mapTrackAni = null;
        this.pathViewOrClose = !this.pathViewOrClose;
        return;
      }
      if (this.traceValue === "") {
        alert("请选择历史路径！");
        return;
      }
      let tracelist = [];
      const sourceobj = this.getWharfBySid(
        this.traceHistory[this.traceValue - 1].source
      );
      const targetobj = this.getWharfBySid(
        this.traceHistory[this.traceValue - 1].target
      );
      tracelist.push(sourceobj);
      tracelist.push(targetobj);
      // console.log("tracce", tracelist);
      //动画
      let res = await PathPlayBackAnime(
        this.mapInstance,
        tracelist,
        "red",
        3500
      );
      this.mapPolyLine = res.polyLine;
      this.mapTrackAni = res.mapTrackAni;
      this.traceAniStart();
      this.pathViewOrClose = !this.pathViewOrClose;
    },
    //轨迹动画开始
    traceAniStart() {
      this.mapTrackAni.start();
    },
    //轨迹动画结束
    traceAniStop() {
      this.mapTrackAni.cancel();
    },
    //移除覆盖物
    removeOverLay(overlay) {
      this.mapInstance.removeOverlay(overlay);
    },
    //获取设备工时
    async getDeviceWorkTime() {
      //       {
      // equipId:xx,
      // totalWorkTime:xx
      // }
      var result = [];
      result.push(["time", "amount", "devicename"]);
      let timelist = [];
      try {
        timelist = await this.$store.dispatch("getAllDeviceWorkTIme");
      } catch (error) {
        console.log(error);
      }
      if (timelist.length <= 0) {
        return;
      }
      let maxTime = 0;
      for (const item of timelist) {
        if (item.totalWorkTime > maxTime) {
          maxTime = totalWorkTime;
        }
        result.push([item.totalWorkTime, 0, "设备" + item.equipId]);
      }
      if (maxTime > this.deviceMaxWorkTime) {
        this.deviceWorkTime = maxTime;
      }
      this.deviceWorkTime = result;
      return result;
    },
    //初始化echarts图表
    async initPieChart() {
      await this.getDeviceWorkTime();
      var chartDom = document.getElementById("piechart");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "设备累计工时",
          subtext: "time Data",
          left: "center",
          textStyle: {
            fontSize: this.chartTitleFontSize,
          },
        },
        dataset: {
          source: this.deviceWorkTime,
        },
        grid: { containLabel: true, top: "10%", left: "0", bottom: "14%" },
        xAxis: {
          name: "time",
          axisLabel: {
            fontSize: this.chartAxisLableFontSize,
          },
        },
        yAxis: {
          type: "category",
          axisLabel: {
            fontSize: this.chartAxisLableFontSize,
          },
        },
        visualMap: {
          orient: "horizontal",
          left: "center",
          min: 1,
          max: this.deviceMaxWorkTime,
          text: ["High Score", "Low Score"],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ["#65B581", "#FFCE34", "#FD665F"],
          },
          textStyle: {
            fontSize: this.chartScaleFontSize,
          },
          itemWidth: this.chartScaleWidth,
        },
        series: [
          {
            type: "bar",
            encode: {
              // Map the "amount" column to X axis.
              x: "time",
              // Map the "product" column to Y axis
              y: "devicename",
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.trace-container .trace-el-btn {
  font-size: 17px;
  box-shadow: 2px 2px 2px black;
}
.trace-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
#trace-map {
  width: 65%;
  height: 700px;
}
.trace-right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 35%;
  height: 700px;
}
.opera-item {
  margin: 15px 0;
}
.opera-item span {
  display: inline-block;
  padding-right: 30px;
  font-size: 18px;
}
#piechart {
  width: 500px;
  height: 450px;
}
</style>