<template>
  <div class="test-container">
    <header>
      <h1>点检模块</h1>
      <div class="test-nav">
        <el-button
          type="success"
          round
          @click="backToHomePage"
          class="test-el-btn"
          >安全退出</el-button
        >
      </div>
    </header>
    <div class="test-body">
      <div class="test-body-left">
        <div class="test-search">
          <div class="test-search-item">
            <h2>设备选择</h2>
            <el-select v-model="equipValue" placeholder="请选择">
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
          <div class="test-search-item">
            <h2>日期选择</h2>
            <el-date-picker
              v-model="timeValue"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
          <div class="test-search-btn test-search-item">
            <el-button type="primary" round class="test-el-btn">搜索</el-button>
          </div>
          <div class="test-search-btn test-search-item">
            <el-button
              type="primary"
              round
              class="test-el-btn"
              @click="addTestRecord()"
              >添加记录</el-button
            >
          </div>
        </div>
        <div class="add-record-data" v-if="isAddRecord">
          <h4>点检设备</h4>
          <el-select v-model="addRecordData.equipId" placeholder="设备">
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
        <div class="test-table">
          <el-table
            :data="deviceTestData"
            stripe
            style="width: 85%"
            height="520"
          >
            <el-table-column fixed prop="recordId" label="记录id" width="100">
            </el-table-column>
            <el-table-column prop="equipId" label="设备id" width="100">
            </el-table-column>
            <el-table-column prop="deviceName" label="设备名" width="120">
            </el-table-column>
            <el-table-column prop="checkPerson" label="检修工" width="120">
            </el-table-column>
            <el-table-column prop="checkDate" label="检修日期" width="120">
            </el-table-column>
            <el-table-column prop="checkResult" label="结果" width="120">
            </el-table-column>
            <el-table-column prop="explaination" label="说明" width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.checkResult == deviceError"
                  @click="handleRepairClick(scope.row)"
                  type="danger"
                  >报修</el-button
                >
                <el-button
                  v-if="scope.row.checkResult !== deviceError"
                  @click="handleViewClick(scope.row)"
                  type="primary"
                  >查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="test-body-right">
        <div id="test-chart"></div>
      </div>
    </div>
    <footer>Copyright 2022 by hwt v1.0</footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);
export default {
  data() {
    return {
      equipValue: [],
      //日期选项
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      timeValue: "",
      deviceError: "故障",
      //是否添加表格数据
      isAddRecord: true,
      //表格添加数据
      addRecordData: {
        equipId: "",
        deviceName: "",
        checkPerson: "",
        checkDate: "",
        checkResult: "",
        explaination: "",
      },
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
        {
          recordId: 1,
          equipId: 1,
          deviceName: "设备1",
          checkPerson: "小王",
          checkDate: "2022-12-19",
          checkResult: "故障",
          explaination: "设备各项数据正常",
        },
        {
          recordId: 1,
          equipId: 1,
          deviceName: "设备1",
          checkPerson: "小王",
          checkDate: "2022-12-19",
          checkResult: "正常",
          explaination: "设备各项数据正常",
        },
        {
          recordId: 1,
          equipId: 1,
          deviceName: "设备1",
          checkPerson: "小王",
          checkDate: "2022-12-19",
          checkResult: "正常",
          explaination: "设备各项数据正常",
        },
        {
          recordId: 1,
          equipId: 1,
          deviceName: "设备1",
          checkPerson: "小王",
          checkDate: "2022-12-19",
          checkResult: "正常",
          explaination: "设备各项数据正常",
        },
        {
          recordId: 1,
          equipId: 1,
          deviceName: "设备1",
          checkPerson: "小王",
          checkDate: "2022-12-19",
          checkResult: "正常",
          explaination: "设备各项数据正常",
        },
        {
          recordId: 1,
          equipId: 1,
          deviceName: "设备1",
          checkPerson: "小王",
          checkDate: "2022-12-19",
          checkResult: "正常",
          explaination: "设备各项数据正常",
        },
        {
          recordId: 1,
          equipId: 1,
          deviceName: "设备1",
          checkPerson: "小王",
          checkDate: "2022-12-19",
          checkResult: "正常",
          explaination: "设备各项数据正常",
        },
        {
          recordId: 1,
          equipId: 1,
          deviceName: "设备1",
          checkPerson: "小王",
          checkDate: "2022-12-19",
          checkResult: "正常",
          explaination: "设备各项数据正常",
        },
        {
          recordId: 1,
          equipId: 1,
          deviceName: "设备1",
          checkPerson: "小王",
          checkDate: "2022-12-19",
          checkResult: "正常",
          explaination: "设备各项数据正常",
        },
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
    this.initLineChart();
  },
  computed: {
    ...mapGetters({
      equipOptions: "equipOptionsGetter",
    }),
  },
  methods: {
    //返回主页
    backToHomePage() {
      this.$router.push("/home");
    },
    initLineChart() {
      var chartDom = document.getElementById("test-chart");
      var myChart = echarts.init(chartDom);
      var option;

      let base = +new Date(2000, 10, 9);
      let oneDay = 24 * 3600 * 1000;
      let data = [[base, Math.random() * 20]];
      for (let i = 1; i < 10; i++) {
        let now = new Date((base += oneDay));
        data.push([+now, Math.round(Math.random() * 20)]);
      }
      option = {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        grid: {
          containLabel: true,
          top: "10%",
          left: "0",
          right: "5%",
          bottom: "12%",
        },
        title: {
          left: "center",
          text: "点检频率",
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "time",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 24,
          },
          {
            start: 0,
            end: 24,
          },
        ],
        series: [
          {
            name: "点检次数",
            type: "line",
            smooth: true,
            symbol: "none",
            areaStyle: {},
            data: data,
          },
        ],
      };

      option && myChart.setOption(option);
    },
    //报修按钮
    async handleRepairClick(data) {
      let errorobj = {
        equipId: data.equipId,
      };
      let res = null;
      try {
        res = await this.$store.dispatch("sendDeviceError", errorobj);
      } catch (error) {
        console.log(error);
      }
      if (res == "ok") {
        alert("上报错误成功！等待检修");
      }
    },
    //查看按钮
    handleViewClick(data) {
      const {
        recordId,
        equipId,
        deviceName,
        checkPerson,
        checkDate,
        checkResult,
        explaination,
      } = data;
      alert(
        "记录编号：" +
          recordId +
          "\n" +
          "设备ID：" +
          equipId +
          "\n" +
          "设备名称：" +
          deviceName +
          "\n" +
          "检测员工：" +
          checkPerson +
          "\n" +
          "检测日期：" +
          checkDate +
          "\n" +
          "检测结果：" +
          checkResult +
          "\n" +
          "检测说明：" +
          explaination +
          "\n"
      );
    },
    addTestRecord() {},
  },
};
</script>

<style scoped>
.test-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #4c9ae9;
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

.test-container .test-el-btn {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 3px;
  box-shadow: 2px 2px 2px black;
  transform: translateY(20px);
}

.test-nav {
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 30px;
}
.test-body {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.test-body-left {
  width: 60%;
  height: 700px;
}
.test-body-right {
  width: 40%;
  height: 700px;
}
#test-chart {
  width: 650px;
  height: 520px;
  padding-top: 120px;
}
.test-search {
  display: flex;
  justify-content: flex-start;
  margin: 25px 0 30px 0;
  height: 100px;
}
.test-search-item {
  padding: 0 50px;
}
.test-search-item h2 {
  padding: 10px 0;
}
.test-search-btn {
  display: inline-block;
  line-height: 100px;
}
.test-table .el-table {
  margin-left: 60px;
  font-size: 16px;
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