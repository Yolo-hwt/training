<template>
  <div class="status-container">
    <header>
      <h1>状态管理</h1>
      <div class="status-nav">
        <el-button
          type="success"
          round
          @click="backToHomePage"
          class="status-el-btn"
          >安全退出</el-button
        >
      </div>
    </header>
    <div class="status-body">
      <div class="status-body-left">
        <div class="status-search">
          <div class="status-search-item">
            <h2>设备选择</h2>
            <el-select v-model="equipValue" multiple placeholder="请选择">
              <el-option
                v-for="item in equipOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="status-search-item">
            <h2>日期选择</h2>
            <el-date-picker
              v-model="timeValue"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
          <div class="status-search-item status-search-btn">
            <el-button type="primary" round class="status-el-btn"
              >搜索</el-button
            >
          </div>
        </div>
        <div class="add-record-data"></div>
        <div class="status-table">
          <el-table
            :data="deviceTestData"
            stripe
            style="width: 85%"
            height="520"
          >
            <el-table-column fixed prop="recordId" label="记录id" width="150">
            </el-table-column>
            <el-table-column prop="equipId" label="设备id" width="120">
            </el-table-column>
            <el-table-column prop="deviceName" label="设备名" width="120">
            </el-table-column>
            <el-table-column prop="checkPerson" label="检修工" width="120">
            </el-table-column>
            <el-table-column prop="checkDate" label="检修日期" width="300">
            </el-table-column>
            <el-table-column prop="checkResult" label="结果" width="120">
            </el-table-column>
            <el-table-column prop="explaination" label="说明" width="120">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="status-body-right">
        <div id="status-chart"></div>
      </div>
    </div>
    <footer>Copyright 2022 by hwt v1.0</footer>
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
      //设备选项
      equipOptions: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
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
      equipValue: [],
      //日期选项
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      timeValue: "",
      //表格数据
      deviceTestData: [
        {
          recordId: 1,
          equipId: 1,
          deviceName: "设备1",
          checkPerson: "小王",
          checkDate: "2022-12-19",
          checkResult: "正常",
          explaination: "设备各项数据正常",
        },
      ],
    };
  },
  mounted() {
    this.initPieChart();
  },
  methods: {
    //返回主页
    backToHomePage() {
      this.$router.push("/home");
    },
    //初始化ehcarts表格
    initPieChart() {
      var chartDom = document.getElementById("status-chart");
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
  },
};
</script>

<style scoped>
.status-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #4c9ae9;
}

.status-body {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
.status-body-left {
  width: 65%;
  height: 700px;
}
.status-body-right {
  width: 35%;
  height: 700px;
}
#status-chart {
  width: 600px;
  height: 600px;
  padding-top: 120px;
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
header {
  width: 100%;
  height: 90px;
  /* background: rgba(0, 0, 0, 0.05); */
  color: #fff;
  box-shadow: 0px 0px 10px black;
  z-index: 999;
}
header h1 {
  display: inline-block;
  line-height: 90px;
  width: 50%;
  padding-left: 30px;
  letter-spacing: 0.5em;
  font-size: 40px;
  text-shadow: 4px 4px 6px black;
}
.status-container .status-el-btn {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 3px;
  box-shadow: 2px 2px 2px black;
  transform: translateY(20px);
}
.status-nav {
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 30px;
}
.status-search {
  display: flex;
  justify-content: flex-start;
  margin: 25px 0 30px 0;
  height: 100px;
}
.status-search-item {
  padding: 0 50px;
}
.status-search-item h2 {
  padding: 10px 0;
}
.status-search-btn {
  display: inline-block;
  line-height: 100px;
}
.status-table .el-table {
  margin-left: 50px;
  font-size: 16px;
}
</style>