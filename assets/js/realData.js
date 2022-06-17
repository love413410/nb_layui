layui.define(["http"], function (e) {
    var store = layui.store;

    var http = layui.http,
        urls = layui.urls;

    var $ = layui.$,
        form = layui.form;

    var element = {
        wl: { title: "潮位", color: "#91cc75", charts: null },
        ws: { title: "风速", color: "#5470c6", charts: null },
        wt: { title: "水温及盐度", wtColor: "#73c0de", slColor: "#ee6666", charts: null },
        at: { title: "气温及湿度", atColor: "#fac858", huColor: "#3ba272", charts: null },
        bp: { title: "气压", color: "#fc8452", charts: null },
        wd: { title: "风向", color: "#58D9F9", charts: null },

        vb: { title: "能见度", color: "#9a60b4", charts: null },
        rn: { title: "雨量", color: "#3ba272", charts: null }
    };

    var chartsOption = {
        // 潮位
        wl: function (key) {
            var dataItem = element[key];
            var data = dataItem.data, time = dataItem.time, unit = dataItem.unit;
            var text = dataItem.newData + unit;
            var title = '8小时' + dataItem.title;
            var color = dataItem.color;
            var name = dataItem.title;
            var option = {
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
                    right: 20,
                    bottom: 0,
                    left: 20,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    valueFormatter: function (value) {
                        return value + unit;
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
                    data: time
                },
                yAxis: {
                    min: function (val) {
                        var min = val.min;
                        min = min > 0 ? Math.floor(min * 0.8) : Math.floor(min * 1.2);
                        min = min.toFixed(2);
                        return min;
                    },
                    max: function (val) {
                        var max = val.max;
                        max = max > 0 ? Math.ceil(max * 1.2) : Math.ceil(max * 0.8);
                        max = max.toFixed(2);
                        return max;
                    },
                    axisLine: { show: true }
                },
                series: [{
                    name: name,
                    type: 'line',
                    smooth: true,
                    data: data
                }]
            }
            return option;
        },
        // 风速
        ws: function (key) {
            var dataItem = element[key];
            var data = dataItem.data, time = dataItem.time, unit = dataItem.unit;
            var text = dataItem.newData + unit;
            var title = '8小时' + dataItem.title;
            var color = dataItem.color;
            var name = dataItem.title;
            var option = {
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
                    right: 20,
                    bottom: 0,
                    left: 20,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    valueFormatter: function (value) {
                        return value + unit;
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
                    data: time
                },
                yAxis: {
                    min: function (val) {
                        var min = val.min;
                        min = min > 0 ? Math.floor(min * 0.8) : Math.floor(min * 1.2);
                        min = min.toFixed(2);
                        return min;
                    },
                    max: function (val) {
                        var max = val.max;
                        max = max > 0 ? Math.ceil(max * 1.2) : Math.ceil(max * 0.8);
                        max = max.toFixed(2);
                        return max;
                    },
                    axisLine: { show: true }
                },
                series: [{
                    name: name,
                    type: 'line',
                    smooth: true,
                    data: data
                }]
            }
            return option;
        },
        // 气温和湿度
        at: function (key) {
            var dataItem = element[key];
            var atData = dataItem.at,
                atUnit = dataItem.atUnit;
            var huData = dataItem.hu,
                huUnit = dataItem.huUnit;
            var time = dataItem.time;

            var atColor = dataItem.atColor,
                huColor = dataItem.huColor;

            var at_val = dataItem.atNew,
                hu_val = dataItem.huNew;
            var text = "气温" + at_val + atUnit + ";湿度" + hu_val + huUnit;
            var title = '8小时' + dataItem.title;

            var option = {
                title: {
                    text: text,
                    subtext: title,
                    subtextStyle: {
                        fontWeight: 600
                    },
                    left: "center"
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                grid: {
                    top: 70,
                    right: 20,
                    bottom: 0,
                    left: 20,
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: time,
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '气温',
                        min: function (val) {
                            var min = val.min;
                            min = min > 0 ? Math.floor(min * 0.8) : Math.floor(min * 1.2);
                            min = min.toFixed(2);
                            return min;
                        },
                        max: function (val) {
                            var max = val.max;
                            max = max > 0 ? Math.ceil(max * 1.2) : Math.ceil(max * 0.8);
                            max = max.toFixed(2);
                            return max;
                        },
                        interval: 5
                    },
                    {
                        type: 'value',
                        name: '湿度',
                        min: 0,
                        max: 100,
                        interval: 20
                    }
                ],
                series: [{
                    name: '气温',
                    color: atColor,
                    type: 'line',
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + atUnit;
                        }
                    },
                    data: atData
                },
                {
                    name: '湿度',
                    color: huColor,
                    yAxisIndex: 1,
                    type: 'line',
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + huUnit;
                        }
                    },
                    data: huData
                }]
            };
            return option;
        },
        // 水温和盐度
        wt: function (key) {
            var dataItem = element[key];
            var data = dataItem.data;
            var wt = data.wt,
                wtUnit = data.wtUnit;
            var sl = data.sl,
                slUnit = data.slUnit;
            data = [{
                value: wt,
                name: '水温',
                title: {
                    offsetCenter: ['-40%', 90]
                },
                detail: {
                    offsetCenter: ['-40%', 110],
                    formatter: '{value}' + wtUnit
                }
            }, {
                value: sl,
                name: '盐度',
                title: {
                    offsetCenter: ['40%', 90]
                },
                detail: {
                    offsetCenter: ['40%', 110],
                    formatter: '{value}' + slUnit
                }
            }];
            var option = {
                series: [{
                    type: 'gauge',
                    radius: 140,
                    center: ['50%', 140],
                    anchor: {
                        show: true,
                        showAbove: true,
                        itemStyle: { color: '#FAC858' }
                    },
                    pointer: {
                        icon: 'diamond',
                        width: 6,
                        length: '50%',
                        offsetCenter: [0, '8%']
                    },
                    progress: {
                        show: true,
                        overlap: true,
                        roundCap: true
                    },
                    axisLine: {
                        roundCap: true
                    },
                    startAngle: 200,
                    endAngle: -20,
                    min: 0,
                    max: 45,
                    splitNumber: 6,
                    data: data,
                    title: { title: 12 },
                    detail: {
                        width: 40,
                        height: 14,
                        lineHeight: 14,
                        fontSize: 12,
                        color: 'auto',
                        // backgroundColor: 'auto',
                        borderRadius: 3
                    }
                }]
            };
            return option;
        },
        // 气压
        bp: function (key) {
            var dataItem = element[key];
            var data = dataItem.data, time = dataItem.time, unit = dataItem.unit;
            var text = dataItem.newData + unit;
            var title = '8小时' + dataItem.title;
            var color = dataItem.color;
            var name = dataItem.title;
            var option = {
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
                    right: 20,
                    bottom: 0,
                    left: 20,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    valueFormatter: function (value) {
                        return value + unit;
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
                    data: time
                },
                yAxis: {
                    min: function (val) {
                        var min = val.min;
                        min = min > 0 ? Math.floor(min * 0.8) : Math.floor(min * 1.2);
                        min = min.toFixed(2);
                        return min;
                    },
                    max: function (val) {
                        var max = val.max;
                        max = max > 0 ? Math.ceil(max * 1.2) : Math.ceil(max * 0.8);
                        max = max.toFixed(2);
                        return max;
                    },
                    axisLine: { show: true }
                },
                series: [{
                    name: name,
                    type: 'line',
                    smooth: true,
                    data: data
                }]
            }
            return option;
        },
        // 风向
        wd: function (key) {
            var dataItem = element[key];
            var title = dataItem.title;
            var data = dataItem.data;
            var color = dataItem.color;
            var option = {
                series: [{
                    type: 'gauge',
                    radius: 120,
                    center: ['50%', 120],
                    min: 0,
                    max: 360,
                    startAngle: 90,
                    endAngle: -270,
                    splitNumber: 12,
                    itemStyle: { color: color },
                    pointer: {
                        length: '75%',
                        width: 6,
                        offsetCenter: [0, '5%']
                    },
                    axisLine: {
                        roundCap: true,
                        lineStyle: {
                            color: [[1, color]],
                            width: 6
                        }
                    },
                    axisTick: {
                        splitNumber: 2,
                        lineStyle: {
                            width: 2,
                            color: '#999'
                        }
                    },
                    splitLine: {
                        length: 10,
                        lineStyle: {
                            width: 3,
                            color: '#999'
                        }
                    },
                    axisLabel: {
                        distance: 10,
                        color: '#303030',
                        fontSize: 12,
                        formatter: function (val) {
                            var value = val == 360 ? "" : val;
                            return value;
                        }
                    },
                    title: { show: false },
                    detail: {
                        offsetCenter: [0, 140],
                        valueAnimation: true,
                        fontSize: 18,
                        formatter: title + ':{value}°'
                    },
                    data: data
                },
                {
                    type: 'gauge',
                    radius: 110,
                    center: ['50%', 120],
                    min: 0,
                    max: 360,
                    startAngle: 90,
                    endAngle: -270,
                    splitNumber: 8,
                    axisLine: { show: false },
                    splitLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: {
                        distance: 25,
                        formatter: function (val) {
                            var html = '';
                            switch (val) {
                                case 0: html = '{a|N}'; break;
                                case 45: html = '{b|NE}'; break;
                                case 90: html = '{a|E}'; break;
                                case 135: html = '{b|SE}'; break;
                                case 180: html = '{a|S}'; break;
                                case 225: html = '{b|SW}'; break;
                                case 270: html = '{a|W}'; break;
                                case 315: html = '{b|NW}'; break;
                                default: html = "";
                            };
                            return html;
                        },
                        rich: {
                            a: {
                                fontSize: 14,
                                fontWeight: 700,
                                color: '#303030',
                            },
                            b: {
                                fontSize: 12,
                                color: '#303030',
                            },
                        }
                    },
                    pointer: { show: false },
                    title: { show: false },
                    anchor: { show: false }
                }]
            };
            return option;
        },
        // 能见度
        vb: function (key) {
            var dataItem = element[key];
            var data = dataItem.data, time = dataItem.time, unit = dataItem.unit;
            var text = dataItem.newData + unit;
            var title = '8小时' + dataItem.title;
            var color = dataItem.color;
            var name = dataItem.title;
            var option = {
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
                    right: 20,
                    bottom: 0,
                    left: 20,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    valueFormatter: function (value) {
                        return value + unit;
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
                    data: time
                },
                yAxis: {
                    min: function (val) {
                        var min = val.min;
                        min = min > 0 ? Math.floor(min * 0.8) : Math.floor(min * 1.2);
                        min = min.toFixed(2);
                        return min;
                    },
                    max: function (val) {
                        var max = val.max;
                        max = max > 0 ? Math.ceil(max * 1.2) : Math.ceil(max * 0.8);
                        max = max.toFixed(2);
                        return max;
                    },
                    axisLine: { show: true }
                },
                series: [{
                    name: name,
                    type: 'line',
                    smooth: true,
                    data: data
                }]
            }
            return option;
        },
        // 雨量
        rn: function (key) {
            var dataItem = element[key];
            var data = dataItem.data, time = dataItem.time, unit = dataItem.unit;
            var text = dataItem.newData + unit;
            var title = '8小时' + dataItem.title;
            var color = dataItem.color;
            var name = dataItem.title;
            var option = {
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
                    right: 20,
                    bottom: 0,
                    left: 20,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    valueFormatter: function (value) {
                        return value + unit;
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
                    data: time
                },
                yAxis: {
                    min: function (val) {
                        var min = val.min;
                        min = min > 0 ? Math.floor(min * 0.8) : Math.floor(min * 1.2);
                        min = min.toFixed(2);
                        return min;
                    },
                    max: function (val) {
                        var max = val.max;
                        max = max > 0 ? Math.ceil(max * 1.2) : Math.ceil(max * 0.8);
                        max = max.toFixed(2);
                        return max;
                    },
                    axisLine: { show: true }
                },
                series: [{
                    name: name,
                    type: 'line',
                    smooth: true,
                    data: data
                }]
            }
            return option;
        },
    };
    var initEcharts = function (key) {
        var option = this[key](key);
        element[key].charts = echarts.init(document.getElementById(key)).dispose();
        element[key].charts = echarts.init(document.getElementById(key));
        element[key].charts.setOption(option);
    };
    var getLineDataFn = function () {
        // var data = {
        //     wl: { data: [700, 800, 900, 1000], time: ["17时", "18时", "19时", "20时"], unit: "cm" },
        //     ws: { data: [700, 800, 900, 1000], time: ["17时", "18时", "19时", "20时"], unit: "/s" },
        //     at: { at: [30, 31, 32, 33, 34, 35], atUnit: "°C", hu: [40, 41, 42, 43, 44], huUnit: "%", time: ["17时", "18时", "19时", "20时"] },
        //     wt: { data: { wt: 20, sl: 22.9, wtUnit: "°C", slUnit: "%" } },
        //     bp: { data: [700, 800, 900, 1000], time: ["17时", "18时", "19时", "20时"], unit: "hpa" },
        //     wd: { data: [100] },
        //     vb: { data: [700, 800, 900, 1000], time: ["17时", "18时", "19时", "20时"] },
        //     rn: { data: [700, 800, 900, 1000], time: ["17时", "18时", "19时", "20时"] },
        // };
        // for (var item in data) {
        //     $("#" + item + "_box").show();
        //     element[item] = Object.assign(element[item], data[item]);
        //     initEcharts.call(chartsOption, item);
        // };

        http({
            url: urls.dataReal,
            data: { id: dataId },
            success: function (res) {
                var data = res.data;
                for (var item in data) {
                    $("#" + item).show();
                    $.extend(element[item], data[item]);
                    // element[item] = Object.assign(element[item], data[item]);
                    initEcharts.call(chartsOption, item);
                };
            }
        });
    };

    var typeId, dataId;
    var getSiteFn = function () {
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


    var getTypeFn = function () {
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


    $("#step").click(function () {
        var title = "一键签到", url = store.filterUrl("step");
        layer.open({
            type: 2,
            title: title,
            resize: !1,
            skin: "layui_layer",
            id: "id",
            area: ["90%", "680px"],
            offset: "50px",
            content: url
        });
    });
    // $("#step").click();

    e("realData", {})
});