<template>
  <div class="test-container">
    <header>
      <div class="icon-title">
        <i class="iconfont icon-lishijilu_huaban test-icon"></i>
        <h1>点检模块</h1>
      </div>
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
            <el-button
              type="primary"
              round
              class="test-el-btn"
              @click="getTestByEidAndDate()"
              >搜索</el-button
            >
          </div>
          <div class="test-search-btn test-search-item">
            <el-button
              type="primary"
              round
              class="test-el-btn"
              @click="addTestHandle()"
              :disabled="isAddRecord"
              >添加记录</el-button
            >
          </div>
        </div>
        <!-- 添加点检记录 -->
        <div class="add-record-data" v-if="isAddRecord">
          <div class="add-record-item add-record-item-first">
            <h3>点检设备</h3>
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
          <div class="add-record-item">
            <h3>点检人员</h3>
            <el-select v-model="addRecordData.checkPerson" placeholder="员工">
              <el-option
                v-for="item in checkPersonList"
                :key="item.uid"
                :label="item.name"
                :value="item.name"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </div>
          <div class="add-record-item item-date">
            <h3>点检日期</h3>
            <el-date-picker
              v-model="addRecordData.checkDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
          <div class="add-record-item">
            <h3>点检结果</h3>
            <el-select v-model="addRecordData.checkResult" placeholder="结果">
              <el-option
                v-for="(item, index) in checkResultList"
                :key="index"
                :label="item.label"
                :value="item.label"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </div>
          <div class="add-record-item item-explaination">
            <h3>说明</h3>
            <el-input
              v-model="addRecordData.explaination"
              placeholder="请输入"
            ></el-input>
          </div>
          <div class="add-record-item">
            <h3>操作</h3>
            <el-button
              type="success"
              icon="el-icon-check"
              circle
              @click="addTestRecord()"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="cancelAddRecord()"
            ></el-button>
          </div>
        </div>
        <div class="test-table">
          <el-table
            :data="deviceTestData"
            stripe
            style="width: 85%"
            :height="tableHeight"
          >
            <el-table-column fixed prop="recordId" label="记录id" width="80">
            </el-table-column>
            <el-table-column prop="equipId" label="设备id" width="80">
            </el-table-column>
            <el-table-column prop="deviceName" label="设备名" width="110">
            </el-table-column>
            <el-table-column prop="checkPerson" label="检修工" width="110">
            </el-table-column>
            <el-table-column prop="checkDate" label="检修日期" width="220">
            </el-table-column>
            <el-table-column prop="checkResult" label="结果" width="100">
            </el-table-column>
            <el-table-column prop="explaination" label="说明" width="100">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.checkResult == checkResultList[0].deviceError"
                  @click="handleRepairClick(scope.row)"
                  type="danger"
                  >报修</el-button
                >
                <el-button
                  v-if="
                    scope.row.checkResult !== checkResultList[0].deviceError
                  "
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
import { FormatDate } from "@/utils/DateFormat";

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
      checkResultList: [
        {
          label: "故障",
          deviceError: "故障",
        },
        {
          label: "正常",
          deviceWork: "正常",
        },
      ],
      //是否添加表格数据
      isAddRecord: false,
      //表格添加数据
      addRecordData: {
        equipId: "",
        deviceName: "",
        checkPerson: "",
        checkDate: "",
        checkResult: "",
        explaination: "",
      },
      //表格高度
      tableHeight: 520,
    };
  },
  mounted() {
    //获取所有点检记录
    this.getAllCheckList();
    //初始化echarts
    this.initLineChart();
  },
  computed: {
    ...mapGetters({
      equipOptions: "equipOptionsGetter",
      checkPersonList: "checkPersonListGetter",
      deviceTestData: "testRecordListGetter",
      chartData: "testTimeDataGetter",
    }),
  },
  methods: {
    //获取所有点检记录
    async getAllCheckList() {
      try {
        await this.$store.dispatch("getAllCheckList");
      } catch (error) {
        console.log(error);
      }
    },
    //返回主页
    backToHomePage() {
      this.$router.push("/home");
    },

    //点检频率表格
    initLineChart() {
      var chartDom = document.getElementById("test-chart");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "1%"];
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
          textStyle: {
            fontSize: "24px",
          },
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
            data: this.chartData,
          },
        ],
      };
      option && myChart.setOption(option);
    },
    //根据设备和日期获取点检记录
    async getTestByEidAndDate() {
      if (this.equipValue == "") {
        alert("请选择设备！");
        //获取所有点检记录
        this.getAllCheckList();
        return;
      }
      if (this.timeValue == "") {
        alert("请选择日期！");
        //获取所有点检记录
        this.getAllCheckList();
        return;
      }
      const eid = this.equipValue;
      const date = FormatDate(this.timeValue);
      console.log(eid, date);
      let res = null;
      try {
        await this.$store.dispatch(
          "getCheckRecordsByEidAndDate",
          JSON.stringify({
            equipId: eid,
            date,
          })
        );
      } catch (error) {
        console.log(error);
      }
      this.equipValue = "";
      this.timeValue = "";
    },
    //报修按钮
    async handleRepairClick(data) {
      let errorobj = {
        equipId: data.equipId,
      };
      let res = null;
      try {
        res = await this.$store.dispatch("sendDeviceError", errorobj);
        if (res == "ok") {
          alert("上报错误成功！等待检修");
        }
      } catch (error) {
        console.log(error);
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
    //检测记录输入
    testRecordInput() {
      //确认添加
      if (this.addRecordData.equipId == "") {
        alert("请选择点检设备！");
        return false;
      }
      if (this.addRecordData.checkPerson == "") {
        alert("请选择点检人员！");
        return false;
      }
      if (this.addRecordData.checkDate == "") {
        alert("请选择点检日期！");
        return false;
      }
      if (this.addRecordData.checkResult == "") {
        alert("请选择检测结果！");
        return false;
      }
      if (this.addRecordData.explaination == "") {
        alert("请填写点检说明！");
        return false;
      }
      return true;
    },
    //清除输入框
    clearRecordInput() {
      this.addRecordData.equipId == "";
      this.addRecordData.deviceName = "";
      this.addRecordData.checkPerson = "";
      this.addRecordData.checkDate = "";
      this.addRecordData.checkResult = "";
      this.addRecordData.explaination = "";
    },
    //添加记录展开编辑行
    addTestHandle() {
      if (!this.isAddRecord) {
        this.isAddRecord = !this.isAddRecord;
        this.tableHeight = 480;
      }
    },
    //确认添加点检记录
    async addTestRecord() {
      //添加记录
      if (!this.testRecordInput()) {
        return;
      }
      //根据eid填充设备名称
      this.addRecordData.deviceName = "设备" + this.addRecordData.equipId;
      //格式化日期
      this.addRecordData.checkDate = FormatDate(this.addRecordData.checkDate);
      //复制得到数据对象
      const data = JSON.stringify(
        Object.assign(
          { recordId: this.deviceTestData.length + 1 },
          this.addRecordData
        )
      );
      //console.log("111", data);
      //清除输入框
      this.clearRecordInput();
      //更改按钮，表格状态
      this.isAddRecord = !this.isAddRecord;
      this.tableHeight = 520;
      //提交记录到后台
      let res = null;
      try {
        res = await this.$store.dispatch("addEquipCheckRecord", data);
        if (res == "ok") {
          alert("点检记录插入成功！");
        }
      } catch (error) {
        console.log(error);
      }
    },
    //取消添加记录
    cancelAddRecord() {
      //清除输入框
      this.clearRecordInput();
      //更改按钮状态
      this.isAddRecord = !this.isAddRecord;
      this.tableHeight = 520;
    },
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
.icon-title {
  width: 60%;
  display: flex;
  align-items: center;
}
.test-icon {
  font-size: 60px;
  color: #fff;
  padding-left: 30px;
}
.test-container .test-el-btn {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 3px;
  box-shadow: 2px 2px 2px black;
}
.test-search-btn.test-search-item .test-el-btn {
  transform: translateY(20px);
}
.test-nav {
  width: 60%;
  display: flex;
  justify-content: flex-end;
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
.add-record-data {
  display: flex;
  justify-content: flex-start;
  margin: 10px 0 10px 0;
  height: 80px;
}
.add-record-item {
  padding: 0 15px;
}
.add-record-item h3 {
  margin-bottom: 10px;
}
.add-record-data .add-record-item >>> .el-input__inner {
  width: 120px;
}
.add-record-data .add-record-item.item-date >>> .el-input__inner {
  width: 140px;
}
.add-record-data .add-record-item.item-date >>> .el-date-editor.el-input {
  width: 140px;
}
.add-record-data .add-record-item.item-explaination >>> .el-input__inner {
  width: 240px;
}
.add-record-item-first {
  padding-left: 50px;
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
  z-index: 999;
}
</style>