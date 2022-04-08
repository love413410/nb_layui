layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var $ = layui.$,
        form = layui.form;

    var typeId, dataId;
    function getTypeFn() {
        http({
            url: urls.siteType,
            success: function (res) {
                var data = res.data;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.Type + '</option>';
                };
                $("#sitetype").html(str);
                form.render();
                typeId = data.length > 0 ? data[0].pk : "";
                getSiteFn();
            }
        });
    };
    getTypeFn();

    form.on('select(siteType)', function (data) {
        typeId = data.value;
        getSiteFn();
    });

    function getSiteFn() {
        http({
            url: urls.dataList,
            data: { type: typeId },
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.stationName + '</option>';
                };
                $("#site").html(str);
                form.render();
                dataId = data.length > 0 ? data[0].pk : "";
                getLineDataFn();
            }
        });
    };

    form.on('select(siteFilter)', function (data) {
        dataId = data.value;
        getLineDataFn();
    });
    var elementList = [
        { dom: "wlLine", el: "wl", title: "潮位", range: 50, color: "#91cc75" },
        { dom: "wsLine", el: "ws", title: "风速", range: 1, color: "#5470c6" },
        { dom: "atLine", el: "at", title: "气温", range: 1, color: "#fac858" },
        { dom: "huLine", el: "hu", title: "湿度", range: 1, color: "#ea7ccc" },
        { dom: "wtLine", el: "wt", title: "水温", range: 1, color: "#73c0de" },
        { dom: "slLine", el: "sl", title: "盐度", range: 5, color: "#ee6666" },
        { dom: "bpLine", el: "bp", title: "气压", range: 10, color: "#fc8452" },
        { dom: "vbLine", el: "vb", title: "能见度", range: 1, color: "#9a60b4" },
        { dom: "rnLine", el: "rn", title: "雨量", range: 10, color: "#3ba272" },
    ];
    var realTimer = null;
    function getLineDataFn() {
        // clearTimeout(realTimer);
        http({
            url: urls.dataReal,
            data: { id: dataId },
            success: function (res) {
                var data = res.data;
                for (var i = 0; i < data.ws.data.length; i++) {
                    var dataItem = data.ws.data[i];
                    dataItem.symbol = 'image://../../images/dirs' + dataItem.path + '.png';
                    dataItem.symbolSize = 15;
                };
                for (var i = 0; i < elementList.length; i++) {
                    var dataItem = elementList[i];
                    dataItem.strength = echarts.init(document.getElementById(dataItem.dom)).dispose();
                    dataItem.strength = echarts.init(document.getElementById(dataItem.dom));
                    dataItem.strength.setOption(initOption(data[dataItem.el], dataItem));
                };
            },
            complete: function () {
                // realTimer = setTimeout(getLineDataFn, 60 * 1000);
            }
        });
    };

    function initOption(data, dataItem) {
        var lastData = data.data[data.data.length - 1];
        var text = (lastData.value || '') + lastData.unit;
        var title = '8小时' + dataItem.title;
        var color = dataItem.color;
        var name = dataItem.title;
        var range = dataItem.range;
        var min = data.min == 10000 ? 0 : (data.min - range).toFixed(2);
        var max = data.min == 10000 ? 0 : (data.max + range).toFixed(2);
        return {
            title: {
                text: text,
                subtext: title,
                subtextStyle: {
                    fontWeight: 600
                },
                left: "center"
            },
            color: color,
            grid: {
                top: 70,
                right: 30,
                bottom: 60,
                left: 30,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (item) {
                    var dataItem = item[0];
                    var time = dataItem.data.time;
                    var value = dataItem.data.value;
                    var unit = dataItem.data.unit;
                    var seriesName = dataItem.seriesName;
                    var str = time + '</br>' +
                        dataItem.marker +
                        seriesName + ':' +
                        value + unit;

                    dataItem.data.solve ? str += '</br>风向:' + dataItem.data.solve : "";
                    return str;
                }
            },
            xAxis: {
                boundaryGap: false,
                axisLine: {
                    show: true,
                    onZero: false
                },
                axisTick: {
                    show: true,
                    alignWithLabel: true
                },
                data: data.time
            },
            yAxis: {
                min: min,
                max: max,
                axisLine: {
                    show: true
                },
                axisTick: {
                    show: true
                }
            },
            series: [{
                name: name,
                type: 'line',
                smooth: true,
                data: data.data,
                label: {
                    show: true,
                    position: 'top',
                    formatter: function (item) {
                        item = item.data;
                        return item.value + item.unit;
                    }
                }
            }]
        }
    };

    e("realData", {})
});