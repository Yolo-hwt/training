//创建地图
export const CreateBaiduMap = async function (instance, targetdom, config) {
    // 创建Map实例
    instance = new BMapGL.Map(targetdom);
    // 初始化地图,设置中心点坐标和地图级别
    instance.centerAndZoom(
        new BMapGL.Point(
            config.mapCenterPoint.longitude,
            config.mapCenterPoint.dimension
        ),
        config.mapZoomLevel
    );
    instance.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    instance.setHeading(config.mapHeaing); //设置地图旋转角度
    instance.setTilt(config.mapTilt); //设置地图的倾斜角度
    //可以试着在地图区域按住鼠标右键进行拖动，地图的视角和旋转角度会随之改变
    return instance;
};
//添加控件
export const AddMapControler = async function (instance) {
    /**
     * 添加控件
     */
    var scaleCtrl = new BMapGL.ScaleControl(); // 添加比例尺控件
    instance.addControl(scaleCtrl);
    var zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件
    instance.addControl(zoomCtrl);
    // var cityCtrl = new BMapGL.CityListControl(); // 添加城市列表控件
    // map.addControl(cityCtrl);
};
//添加码头标点
export const AddMapPoint = async function (instance, icon, config) {
    for (const sign of config.mapSignList) {
        // console.log(sign);
        let point = new BMapGL.Point(sign.longitude, sign.dimension);

        //标注图层
        // console.log(that.mapSignIcon);
        let myIcon = new BMapGL.Icon(
            icon,
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
        instance.addOverlay(marker); // 将标注添加到地图中

        //提示信息
        let infoWindow = new BMapGL.InfoWindow();
        let title = "sid:" + sign.sid;
        infoWindow.setTitle("<h2>" + title + "</h2>");

        let text = sign.longitude + "," + sign.dimension;
        infoWindow.setContent("<h3>码头位置:(" + text + ")</h3>");
        //地图标点点击事件
        marker.addEventListener("click", () => {
            instance.openInfoWindow(infoWindow, point); // 打开信息窗口
        });
    }
};
//添加自定义标点
export const AddSelfMapPoint = async function (instance, icon, pointset) {
    let point = new BMapGL.Point(pointset.longitude, pointset.dimension);
    //标注图层
    // console.log(that.mapSignIcon);
    let myIcon = new BMapGL.Icon(
        icon,
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
    instance.addOverlay(marker); // 将标注添加到地图中

    //提示信息
    let infoWindow = new BMapGL.InfoWindow();
    let title = "sid:" + sign.sid;
    infoWindow.setTitle("<h2>" + title + "</h2>");

    let text = pointset.longitude + "," + pointset.dimension;
    infoWindow.setContent("<h3>设备位置:(" + text + ")</h3>");
    //地图标点点击事件
    marker.addEventListener("click", () => {
        instance.openInfoWindow(infoWindow, point); // 打开信息窗口
    });
}
//添加文本标注
export const AddMapLable = async function (instance, config) {
    for (const sign of config.mapSignList) {
        // console.log(sign);
        let point = new BMapGL.Point(sign.longitude, sign.dimension);
        let content = "<span>码头" + sign.sid + "</span>";
        let label = new BMapGL.Label(content, {
            // 创建文本标注
            position: point,
            offset: new BMapGL.Size(10, 15),
        });
        instance.addOverlay(label); // 将标注添加到地图中
        label.setStyle({
            // 设置label的样式
            color: "#000",
            fontSize: "16px",
            border: "2px solid #4c9ae9",
            "border-radius": "10px",
        });
    }
};
//创建折线对象
export const AddMapLine = async function (path, linecolor) {
    var point = [];
    //从path中提取经纬度生成点集合
    for (let i = 0; i < path.length; i++) {
        point.push(new BMapGL.Point(path[i].longitude, path[i].dimension));
    }
    //路径覆盖物对象
    var polyLine = new BMapGL.Polyline(point);
    polyLine.setStrokeColor(linecolor);
    polyLine.setStrokeWeight(8);
    return polyLine;
}
//路径动画
//路径回放动画
export const PathPlayBackAnime = async function (instance, path, linecolor, duration = 10000) {
    var polyLine = await AddMapLine(path, linecolor);
    //trace对象
    var mapTrackAni = new BMapGLLib.TrackAnimation(
        instance,
        polyLine,
        {
            overallView: true, // 动画完成后自动调整视野到总览
            tilt: 55, // 轨迹播放的角度，默认为55
            duration: duration, // 动画持续时长，默认为10000，单位ms
            delay: 500, // 动画开始的延迟，默认0，单位ms
        }
    );
    return { polyLine, mapTrackAni }
    //this.mapTrackAni.start();
};
