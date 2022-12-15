<template>
  <div class="test-container">
    <header>
      <h1>点检模块</h1>
      <div class="test-nav">
        <el-button type="success" round @click="backToHomePage"
          >安全退出</el-button
        >
      </div>
    </header>
    <div class="test-body">
      <div class="test-search">
        <div class="test-search-item">
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
      </div>
      <div class="test-table">
        <el-table :data="tableData" style="width: 85%" height="580">
          <el-table-column fixed prop="date" label="日期" width="150">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="province" label="省份" width="120">
          </el-table-column>
          <el-table-column prop="city" label="市区" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="300">
          </el-table-column>
          <el-table-column prop="zip" label="邮编" width="120">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <footer>footer</footer>
  </div>
</template>

<script>
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
      //表格数据
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
    };
  },
  methods: {
    //返回主页
    backToHomePage() {
      this.$router.push("/home");
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
  background-color: skyblue;
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
header {
  width: 100%;
  height: 90px;
  background: rgba(0, 0, 0, 0.05);
  color: #fff;
  box-shadow: 0px 0px 10px rgb(157, 191, 207);
}
header h1 {
  display: inline-block;
  line-height: 90px;
  width: 50%;
  padding-left: 30px;
}

.test-nav {
  float: right;
  display: inline-block;
  line-height: 90px;
  padding-right: 30px;
}
.test-body {
  flex: 1;
  background-color: rgb(28, 190, 136);
}
.test-search {
  display: flex;
  justify-content: flex-start;
  margin: 25px 0 30px 0;
  height: 100px;
}
.test-search-item {
  padding: 0 30px;
}
.test-search-item h2 {
  padding: 10px 0;
}
.test-search-btn {
  display: inline-block;
  line-height: 100px;
}
.test-el-btn {
  transform: translateY(20px);
}
.test-table .el-table {
  margin-left: 30px;
}
</style>