<template>
  <div class="trace-container">
    <div id="trace-map"></div>
    <div class="trace-right">
      <div id="piechart"></div>
      <div class="trace-opera">
        <h2>历史查询</h2>
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
          <el-button type="primary" round>查看路径</el-button>
          <el-button type="primary" round>发布指令</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      workTime: 0,
      chartAxisLableFontSize: "12px",
      chartTitleFontSize: "24px",
    };
  },
  mounted() {
    this.initMap();
    this.initPieChart();
  },
  methods: {
    initMap() {
      var map = new BMapGL.Map("trace-map"); // 创建Map实例
      map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    },
    initPieChart() {
      var chartDom = document.getElementById("piechart");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "设备公里数",
          subtext: "Type Data",
          left: "center",
          textStyle: {
            fontSize: this.chartTitleFontSize,
          },
        },
        dataset: {
          source: [
            ["score", "amount", "category"],
            [89.3, 58212, "Matcha Latte"],
            [57.1, 78254, "Milk Tea"],
            [74.4, 41032, "Cheese Cocoa"],
            [50.1, 12755, "Cheese Brownie"],
            [89.7, 20145, "Matcha Cocoa"],
            [68.1, 79146, "Tea"],
            [19.6, 91852, "Orange Juice"],
            [10.6, 101852, "Lemon Juice"],
            [32.7, 20112, "Walnut Brownie"],
          ],
        },
        grid: { containLabel: true, top: "10%", left: "0", bottom: "12%" },
        xAxis: {
          name: "km",
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
          min: 10,
          max: 100,
          text: ["High Score", "Low Score"],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ["#65B581", "#FFCE34", "#FD665F"],
          },
          itemWidth: "25px",
        },
        series: [
          {
            type: "bar",
            encode: {
              // Map the "amount" column to X axis.
              x: "km",
              // Map the "product" column to Y axis
              y: "category",
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