<template>
  <div class="status-container">
    <header>
      <div class="status-icon-title">
        <i class="iconfont icon-xitongzhuangtai status-icon"></i>
        <h1>状态管理</h1>
      </div>
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
          <div class="status-search-item">
            <h2>日期选择</h2>
            <el-date-picker
              v-model="timeValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
          <div class="status-search-item status-search-btn">
            <el-button
              type="primary"
              round
              class="status-el-btn"
              @click="getStatusListByEidAndDate()"
              >搜索</el-button
            >
          </div>
        </div>
        <div class="add-record-data"></div>
        <div class="status-table">
          <el-table :data="statusData" stripe style="width: 85%" height="520">
            <el-table-column fixed prop="recordId" label="记录id" width="110">
            </el-table-column>
            <el-table-column prop="equipId" label="设备id" width="110">
            </el-table-column>
            <el-table-column prop="deviceName" label="设备名" width="140">
            </el-table-column>
            <el-table-column prop="checkDate" label="检测日期" width="150">
            </el-table-column>
            <el-table-column prop="checkResult" label="状态" width="140">
            </el-table-column>
            <el-table-column prop="explaination" label="说明" width="150">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button @click="handleViewClick(scope.row)" type="primary"
                  >查看</el-button
                >
              </template>
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
import { mapGetters } from "vuex";
import { FormatDate } from "@/utils/DateFormat";
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
      equipValue: "",
      //日期选项
      timeValue: [],
      //表格数据
    };
  },
  computed: {
    ...mapGetters({
      statusData: "allStatusRecordListGetter",
      equipOptions: "equipOptionsGetter",
      equipTypeData: "deviceTypeListGetter",
    }),
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
    async initPieChart() {
      //获取设备状态分布数据
      try {
        await this.$store.dispatch("getEquipTypeData");
      } catch (error) {
        console.log(error);
      }
      var data = [];
      for (const item of this.equipTypeData) {
        let temp = {};
        temp.value = item.num;
        temp.name = item.status;
        data.push(temp);
      }
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
          textStyle: {
            fontSize: "17px",
          },
        },
        legend: {
          orient: "vertical",
          left: "left",
          textStyle: {
            fontSize: "17px",
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data,
            label: {
              fontSize: "17px",
            },
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
    //查看按钮
    handleViewClick(data) {
      const {
        recordId,
        equipId,
        deviceName,
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
    //根据eid和date获取状态列表
    async getStatusListByEidAndDate() {
      if (this.equipValue == "") {
        alert("请选择设备！");
        return;
      }
      if (this.timeValue.length == 0) {
        alert("请选择日期！");
        return;
      }
      const eid = this.equipValue;
      const sDate = FormatDate(this.timeValue[0]);
      const eDate = FormatDate(this.timeValue[1]);
      console.log(eid, sDate, eDate);
      let res = null;
      try {
        res = await this.$store.dispatch("getRecordsByEidAndDate", {
          equipId: eid,
          startTime: sDate,
          endTime: eDate,
        });
        if (res == "ok") {
          alert("查询成功");
        } else {
          alert("查询失败");
        }
      } catch (error) {
        console.log(error);
      }
      this.equipValue = "";
      this.timeValue = [];
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
  display: flex;
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
.status-icon-title {
  width: 60%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.status-icon {
  font-size: 60px;
  color: #fff;
  padding-left: 30px;
}
.status-container .status-el-btn {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 3px;
  box-shadow: 2px 2px 2px black;
}
.status-search-item.status-search-btn .status-el-btn {
  transform: translateY(20px);
}
.status-nav {
  width: 40%;
  display: flex;
  justify-content: flex-end;
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