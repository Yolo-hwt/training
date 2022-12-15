<template>
  <div class="monitor-container">
    <div id="monitor-map"></div>
    <div class="monitor-right">
      <div id="piechart"></div>
      <div class="monitor-opera">
        <h2>设备调度</h2>
        <div class="opera-item">
          <span>设备</span>
          <el-select v-model="equipValue" placeholder="选择设备">
            <el-option
              v-for="item in equipOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div>
        <div class="opera-item">
          <span>位置</span>
          <el-select v-model="siteValue" placeholder="选择目的地">
            <el-option
              v-for="item in siteOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div>
        <div class="opera-item">
          <span>作业时间</span>
          <el-input-number
            v-model="workTime"
            @change="workTimeHandleChange"
            :min="1"
            :max="1000"
            label="作业时间"
          ></el-input-number>
          <span>min</span>
        </div>
        <div class="opera-item">
          <el-button type="primary" round class="graph-el-btn"
            >查看路径</el-button
          >
          <el-button type="primary" round class="graph-el-btn"
            >发布指令</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//按需引入echarts饼状图
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);
export default {
  data() {
    return {
      equipOptions: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
          disabled: true,
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      equipValue: "",
      siteOptions: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
          disabled: true,
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      siteValue: "",
      workTime: 0,
      //地图缩放级别
      mapZoomLevel: 20,
    };
  },
  mounted() {
    this.initMap();
    this.initPieChart();
  },
  methods: {
    //初始化百度地图
    initMap() {
      var map = new BMapGL.Map("monitor-map"); // 创建Map实例
      map.centerAndZoom(new BMapGL.Point(116.404, 39.915), this.mapZoomLevel); // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    },
    //初始化ehcarts表格
    initPieChart() {
      var chartDom = document.getElementById("piechart");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "设备状态分布",
          subtext: "Type Data",
          left: "center",
          show: true,
          textStyle: {
            fontSize: "24px",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    workTimeHandleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped>
.graph-container .graph-el-btn {
  font-size: 17px;
  box-shadow: 2px 2px 2px black;
}
.monitor-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
#monitor-map {
  width: 65%;
  height: 700px;
}
.monitor-right {
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