<template>
  <div class="monitor-container">
    <div id="monitor-map"></div>
    <div class="monitor-right">
      <div class="monitor-info">
        <h2>设备信息</h2>
        <div class="monitor-info-item">
          <span class="info-item-title">设备ID</span>
          <span class="info-item-text">{{ curEquipMent.equipId }}</span>
        </div>
        <div class="monitor-info-item">
          <span class="info-item-title">设备名称</span>
          <span class="info-item-text">{{ curEquipMent.deviceName }}</span>
        </div>
        <div class="monitor-info-item">
          <span class="info-item-title">设备位置</span>
          <span class="info-item-text">{{ curEquipMent.location }}</span>
        </div>
        <div class="monitor-info-item">
          <span class="info-item-title">点检日期</span>
          <span class="info-item-text">{{ curEquipMent.date }}</span>
        </div>
        <div class="monitor-info-item">
          <span class="info-item-title">累计工时</span>
          <span class="info-item-text"
            >{{ curEquipMent.totalWOrkTime }}&nbsp min</span
          >
        </div>
        <div class="monitor-info-item">
          <span class="info-item-title">设备状态</span>
          <span class="info-item-text">{{ curEquipMent.status }}</span>
        </div>
      </div>
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      //当前设备
      curEquipMent: {
        equipId: 111,
        deviceName: "墨子一号",
        location: "码头1（111.222.333）",
        date: "2022.12.17",
        totalWOrkTime: "116",
        status: "空闲中",
      },
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
      //地图实例
      mapInstance: null,
      //标注图片
      mapSignIcon: require("../../assets/port.png"),
    };
  },
  computed: {
    ...mapGetters({
      mapConfig: "mapConfigGetter",
    }),
  },
  mounted() {
    this.initMap();
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
    },
    //创建地图
    async createMap() {
      // 创建Map实例
      this.mapInstance = new BMapGL.Map("monitor-map");
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
.monitor-info {
  width: 370px;
  padding-left: 30px;
}
.monitor-info h2 {
  padding: 20px 0;
}
.monitor-info-item:hover {
  color: rgb(76, 154, 233);
  font-size: 19px;
}
.info-item-title {
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  padding: 11px 20px 11px 0;
}

.opera-item {
  margin: 15px 0;
}
.opera-item span {
  display: inline-block;
  padding-right: 30px;
  font-size: 18px;
}
</style>