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
            >{{ curEquipMent.totalWorkTime }}&nbsp min</span
          >
        </div>
        <div class="monitor-info-item">
          <span class="info-item-title">设备状态</span>
          <span
            class="info-item-text"
            :class="{
              'equip-free': curEquipMent.status == '空闲',
              'equip-work': curEquipMent.status == '作业中',
              'equip-repair': curEquipMent.status == '维修中',
            }"
            >{{ curEquipMent.status }}</span
          >
        </div>
      </div>
      <div class="monitor-opera">
        <h2>设备调度</h2>
        <div class="opera-item">
          <span>设备</span>
          <el-select
            v-model="equipValue"
            placeholder="选择设备"
            @change="(val) => equipChangeHandle(val)"
          >
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
          <span>位置</span>
          <el-select v-model="siteValue" placeholder="选择目的地">
            <el-option
              v-for="item in siteOptions"
              :key="item.sid"
              :label="`码头${item.sid}`"
              :value="item.sid"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div>
        <div class="opera-item">
          <span>作业时间</span>
          <el-input-number
            v-model="workTime"
            :min="1"
            :max="1000"
            label="作业时间"
          ></el-input-number>
          <span>min</span>
        </div>
        <div class="opera-item">
          <el-button
            type="primary"
            round
            class="graph-el-btn"
            @click="mapPredictViewPath()"
            >{{ pathViewOrClose ? "查看路径" : "清除路径" }}</el-button
          >
          <el-button
            type="primary"
            round
            class="graph-el-btn"
            @click="releaseOrderToEquip()"
            >发布指令</el-button
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
  AddSelfMapPoint,
  AddMapLine,
} from "@/utils/BaiduMap";
export default {
  data() {
    return {
      //当前设备
      // curEquipMent: {
      //   equipId: 1, //eid
      //   deviceName: "墨子一号",
      //   location: 1, //sid
      //   date: "2022.12.17",
      //   totalWOrkTime: "116",
      //   status: "空闲",
      // },
      curEquipMent: {},
      //设备选项
      equipValue: "",
      //位置选项
      siteValue: "",
      //设备工时
      workTime: 0,
      //路径查看或关闭 true:查看，false:关闭
      pathViewOrClose: true,
      //地图实例
      mapInstance: null,
      //地图dom
      mapTargetDom: "monitor-map",
      //标注图片
      mapSignIcon: require("../../assets/port.png"),
      //设备覆盖物实例
      mapEquipInstance: null,
      //设备折线对象
      mapLineInstance: null,
    };
  },
  computed: {
    ...mapGetters({
      mapConfig: "mapConfigGetter",
      siteOptions: "mapSignListGetter",
      equipOptions: "equipOptionsGetter",
    }),
  },
  mounted() {
    this.initData();
  },
  methods: {
    //初始化数据
    async initData() {
      try {
        this.curEquipMent = this.equipOptions[0];
        this.initMap();
      } catch (error) {
        console.log(error);
      }
    },
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
    //设备选择变化handle
    equipChangeHandle(eid) {
      if (this.curEquipMent.equipId === eid) return;
      for (const equip of this.equipOptions) {
        if (equip.equipId === eid) {
          this.curEquipMent = equip;
          break;
        }
      }
    },
    //根据码头id获取其对象
    getWharfBySid(sid) {
      let res = {};
      for (const local of this.mapConfig.mapSignList) {
        if (local.sid === sid) {
          res = local;
        }
      }
      return res;
    },
    //根据设备id获取其对象
    getEquipByEid(eid) {
      let res = {};
      for (const local of this.equipOptions) {
        if (local.equipId === eid) {
          res = local;
        }
      }
      return res;
    },
    //根据设备id获取码头对象
    getEquipSiteObjByEid(eid) {
      let equipobj = this.getEquipByEid(eid);
      let res = {};
      for (const local of this.mapConfig.mapSignList) {
        if (local.sid === equipobj.location) {
          res = local;
        }
      }
      return res;
    },
    //预先查看路径
    async mapPredictViewPath() {
      //移除路径
      if (!this.pathViewOrClose) {
        this.removeOverLay(this.mapLineInstance);
        this.mapLineInstance = null;
        this.pathViewOrClose = !this.pathViewOrClose;
        return;
      }
      //添加路径
      //设备当前位置对象
      let source = this.getEquipSiteObjByEid(this.equipValue);
      //目标位置对象
      let target = this.getWharfBySid(this.siteValue);
      if (Object.getOwnPropertyNames(source).length == 0) {
        alert("请选择设备");
        return;
      }
      if (Object.getOwnPropertyNames(target).length == 0) {
        alert("请选择目的地");
        return;
      }
      let path = [source, target];
      this.mapLineInstance = await AddMapLine(path, "red");
      this.mapInstance.addOverlay(this.mapLineInstance);
      this.pathViewOrClose = !this.pathViewOrClose;
      //console.log(source, target);
    },
    //向设备发布指令
    async releaseOrderToEquip() {
      if (this.curEquipMent.status !== "空闲") {
        alert("当前设备" + this.curEquipMent.status + "!");
        return;
      }
      //添加路径
      //设备当前位置
      let source = this.getEquipSiteObjByEid(this.equipValue);
      let target = this.getWharfBySid(this.siteValue);
      let time = this.workTime;
      if (Object.getOwnPropertyNames(source).length == 0) {
        alert("请选择设备");
        return;
      }
      if (Object.getOwnPropertyNames(target).length == 0) {
        alert("请选择目的地");
        return;
      }
      // let path = [source, target];
      //发布指令
      let workobj = JSON.stringify({
        equipId: this.curEquipMent.equipId,
        destination: target.sid,
        worktime: time,
      });

      let res = await this.$store.dispatch("addEquipWorkRecord", workobj);
      if (res == "ok") {
        alert(
          "指令已发布\n源地点：码头" +
            source.sid +
            "\n目的地：码头" +
            target.sid +
            "\n作业时间: " +
            time +
            "分钟"
        );
        //发布成功后更新当前设备信息
        // console.log(this.curEquipMent);
        const equipId = this.curEquipMent.equipId;
        this.curEquipMent = await this.$store.dispatch(
          "getEquipInfoById",
          JSON.stringify({
            equipId,
          })
        );
      } else {
        alert("指令发布失败");
      }
    },
    //移除覆盖物
    removeOverLay(overlay) {
      this.mapInstance.removeOverlay(overlay);
    },
    //
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
.equip-free {
  color: rgb(76, 154, 233);
  font-size: 18px;
  font-weight: 600;
  border: 1px solid rgb(76, 154, 233);
  padding: 3px;
}
.equip-repair {
  color: red;
  font-size: 18px;
  font-weight: 600;
  border: 1px solid red;
  padding: 3px;
}
.equip-work {
  color: green;
  font-size: 18px;
  font-weight: 600;
  border: 1px solid green;
  padding: 3px;
}
</style>