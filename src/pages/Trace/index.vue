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
          <el-button
            type="primary"
            round
            class="trace-el-btn"
            @click="removeOverLay(mapPolyLine)"
            >查看路径</el-button
          >
          <el-button type="primary" round class="trace-el-btn"
            >发布指令</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
      //echarts坐标轴刻度label字体
      chartAxisLableFontSize: "13px",
      //echarts标头title字体
      chartTitleFontSize: "24px",
      //echarts标尺字体
      chartScaleFontSize: "20px",
      //echarts标尺宽度
      chartScaleWidth: "25px",
      //地图实例
      mapInstance: null,
      //路径动画
      mapTrackAni: null,
      //标注图片
      mapSignIcon: require("../../assets/port.png"),
      //动画路径
      mapPolyLine: null,
    };
  },
  computed: {
    ...mapGetters({
      mapConfig: "mapConfigGetter",
    }),
  },
  mounted() {
    this.initMap();
    this.initPieChart();
  },
  beforeRouteLeave(to, from, next) {
    if (this.mapTrackAni) {
      console.log("cancel animation");
      this.mapTrackAni.cancel();
    }
    this.mapTrackAni = null;
    next();
  },
  methods: {
    //初始化百度地图
    async initMap() {
      //初始化配置
      await this.createMap();
      //添加地图控制类
      await this.addMapControler();
      //创建地图标点
      await this.addMapPoint();
      //添加lable
      await this.addMapLable();
      //动画
      this.pathPlayBackAnime(this.mapConfig.mapSignList);
    },
    //创建地图
    async createMap() {
      // 创建Map实例
      this.mapInstance = new BMapGL.Map("trace-map");
      // 初始化地图,设置中心点坐标和地图级别
      this.mapInstance.centerAndZoom(
        new BMapGL.Point(
          this.mapConfig.mapCenterPoint.longitude,
          this.mapConfig.mapCenterPoint.dimension
        ),
        this.mapConfig.mapZoomLevel
      );
      this.mapInstance.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      this.mapInstance.setHeading(this.mapConfig.mapHeaing); //设置地图旋转角度
      this.mapInstance.setTilt(this.mapConfig.mapTilt); //设置地图的倾斜角度
      //可以试着在地图区域按住鼠标右键进行拖动，地图的视角和旋转角度会随之改变
    },
    //添加控件
    async addMapControler() {
      /**
       * 添加控件
       */
      var scaleCtrl = new BMapGL.ScaleControl(); // 添加比例尺控件
      this.mapInstance.addControl(scaleCtrl);
      var zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件
      this.mapInstance.addControl(zoomCtrl);
      // var cityCtrl = new BMapGL.CityListControl(); // 添加城市列表控件
      // map.addControl(cityCtrl);
    },
    //添加标点
    async addMapPoint() {
      var that = this;
      for (const sign of this.mapConfig.mapSignList) {
        // console.log(sign);
        let point = new BMapGL.Point(sign.longitude, sign.dimension);

        //标注图层
        // console.log(that.mapSignIcon);
        let myIcon = new BMapGL.Icon(
          that.mapSignIcon,
          new BMapGL.Size(70, 80),
          {
            //   // 指定定位位置。
            //   // 当标注显示在地图上时，其所指向的地理位置距离图标左上
            //   // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
            //   // 图标中央下端的尖角位置。
            anchor: new BMapGL.Size(5, 52),
            //   // 设置图片偏移。
            //   // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
            //   // 需要指定大图的偏移位置，此做法与css sprites技术类似。
            //   imageOffset: new BMapGL.Size(0, 0 - 25), // 设置图片偏移
          }
        );
        // 创建标注对象并添加到地图
        let marker = new BMapGL.Marker(point, { icon: myIcon });
        this.mapInstance.addOverlay(marker); // 将标注添加到地图中

        //提示信息
        let infoWindow = new BMapGL.InfoWindow();
        let title = "sid:" + sign.sid;
        infoWindow.setTitle("<h2>" + title + "</h2>");

        let text = sign.longitude + "," + sign.dimension;
        infoWindow.setContent("<h3>码头位置:(" + text + ")</h3>");
        //地图标点点击事件
        marker.addEventListener("click", () => {
          that.mapInstance.openInfoWindow(infoWindow, point); // 打开信息窗口
        });
      }
    },
    //添加文本标注
    async addMapLable() {
      var that = this;
      for (const sign of this.mapConfig.mapSignList) {
        // console.log(sign);
        let point = new BMapGL.Point(sign.longitude, sign.dimension);
        let content = "<span>码头" + sign.sid + "</span>";
        let label = new BMapGL.Label(content, {
          // 创建文本标注
          position: point,
          offset: new BMapGL.Size(10, 15),
        });
        this.mapInstance.addOverlay(label); // 将标注添加到地图中
        label.setStyle({
          // 设置label的样式
          color: "#000",
          fontSize: "16px",
          border: "2px solid #4c9ae9",
          "border-radius": "10px",
        });
      }
    },
    //路径回放动画
    async pathPlayBackAnime(path) {
      var that = this;
      var point = [];
      for (let i = 0; i < path.length; i++) {
        point.push(new BMapGL.Point(path[i].longitude, path[i].dimension));
      }
      this.mapPolyLine = new BMapGL.Polyline(point);
      this.mapPolyLine.setStrokeColor("#fac858");
      this.mapPolyLine.setStrokeWeight(10);
      this.mapTrackAni = new BMapGLLib.TrackAnimation(
        this.mapInstance,
        that.mapPolyLine,
        {
          overallView: true, // 动画完成后自动调整视野到总览
          tilt: 0, // 轨迹播放的角度，默认为55
          duration: 20000, // 动画持续时长，默认为10000，单位ms
          delay: 3000, // 动画开始的延迟，默认0，单位ms
        }
      );
      this.mapTrackAni.start();
    },
    //移除覆盖物
    removeOverLay(overlay) {
      this.mapInstance.removeOverlay(overlay);
    },
    //初始化echarts图表
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