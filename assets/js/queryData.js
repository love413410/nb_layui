layui.define(["http", "getFn", "tabList"], function (e) {
    var http = layui.http,
        urls = layui.urls,
        getFn = layui.getFn,
        tabList = layui.tabList;

    var $ = layui.$,
        form = layui.form,
        laydate = layui.laydate;

    var startTime = getFn.initDate(),
        endTime = getFn.initDate();
    var id = "",
        type = $("#type").val();

    laydate.render({
        elem: '#date',
        range: "~",
        value: startTime + "\xa0" + "~" + "\xa0" + endTime,
        max: 0,
        btns: ['now', 'confirm']
    });

    var typeId;
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
                id = data.length > 0 ? data[0].pk : "";
                getListFn();
                getChartsFn();
            }
        });
    };

    function getListFn() {
        http({
            url: urls.dataCenter,
            data: {
                id: id,
                type: type,
                startTime: startTime,
                endTime: endTime,
                pageSize: 0,
                pageNum: 1
            },
            success: function (res) {
                var cols = res.title;
                tabList.render({
                    url: urls.dataCenter,
                    where: {
                        id: id,
                        type: type,
                        startTime: startTime,
                        endTime: endTime
                    },
                    cols: [cols],
                    page: 1,
                    height: 485,
                    done: function (data, curr) { page = curr; }
                });
            }
        });
    };

    // 查询按钮
    form.on('submit(subBtn)', function (data) {
        data = data.field;
        id = data.id;
        type = data.type;
        var date = data.date;
        var idx = date.indexOf("~");
        startTime = date.substring(0, idx).trim();
        endTime = date.substring(idx + 1).trim();
        getListFn();
        getChartsFn();
    });


    var myChart = echarts.init(document.getElementById("main"));
    function getChartsFn() {
        http({
            url: urls.dataCenter,
            type: 'post',
            data: {
                id: id,
                start: startTime,
                end: endTime,
                type: type
            },
            success: function (res) {
                var title = res.title;
                var data = res.data;

                var nameArr = [];
                var serArr = [];
                for (var i = 0; i < data.length; i++) {
                    var names = data[i].name;
                    var val = data[i].val;
                    nameArr.push(names);
                    serArr.push({
                        name: names,
                        data: val,
                        type: "line",
                        smooth: true,
                    });
                };

                myChart.setOption({
                    legend: {
                        textStyle: {
                            data: nameArr
                        },
                    },
                    xAxis: {
                        data: title
                    },
                    tooltip: {
                        formatter: function (value) {
                            var tle = "<div>" + value[0].name + "</div>";
                            var res = "";
                            for (var i = 0; i < value.length; i++) {
                                var dataItem = value[i];
                                var marker = dataItem.marker;
                                var key = dataItem.seriesName;
                                var val = dataItem.value;
                                res += "<div>" + marker + key + ":" + val + "</div>";
                            };
                            var html = tle + res;
                            return html;
                        },
                    },
                    series: serArr,
                });

            }
        });
    };

    function initFn() {
        var option = {
            legend: {
                icon: "line",
                top: 0,
                // textStyle: {
                //     color: "#fff",
                // },
                itemWidth: 10, // 设置宽度
                itemHeight: 30, // 设置高度
            },
            grid: {
                left: "2%",
                right: "2%",
                top: 30,
                bottom: "5%",
                containLabel: true,
            },
            tooltip: {
                trigger: "axis",
                position: ["50%", "10%"],
                axisPointer: {
                    label: {
                        backgroundColor: "#07a6ff",
                    },
                },
            },
            xAxis: {
                type: "category",
                axisLine: {
                    onZero: false
                },
                // boundaryGap: false,
                // data: [
                // 	"00时",
                // 	"01时",
                // 	"02时",
                // 	"03时",
                // 	"04时",
                // 	"05时",
                // 	"06时",
                // 	"07时",
                // 	"08时",
                // 	"09时",
                // 	"10时",
                // 	"11时",
                // 	"12时",
                // 	"13时",
                // 	"14时",
                // 	"15时",
                // 	"16时",
                // 	"17时",
                // 	"18时",
                // 	"19时",
                // 	"20时",
                // 	"21时",
                // 	"22时",
                // 	"23时",
                // ],
                axisLabel: {
                    interval: "auto",
                    showMinLabel: 1,
                    showMaxLabel: 1,
                    rotate: 45,
                    textStyle: {
                        color: "#07a6ff",
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: "#07a6ff",
                    },
                    onZero: false
                },
            },
            yAxis: {
                //y轴
                axisLabel: {
                    formatter: "{value}",
                    textStyle: {
                        color: "#07a6ff",
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: "#07a6ff",
                    },
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#07a6ff",
                    },
                },
            },
            // dataZoom: [
            //     {
            //         type: "slider",
            //         height: 15,
            //         xAxisIndex: [0],
            //         bottom: 10,
            //         start: 0,
            //         end: 30,
            //         minSapn: 30,
            //         maxSpan: 30,
            //         fillerColor: '#5a98de',
            //         textStyle: {
            //             color: "transparent"
            //         }
            //     },
            // ],
        };
        myChart.setOption(option);
    };
    initFn();

    form.on('submit(chartsBtn)', function (data) {
        data = data.field;
        var id = data.id, type = data.type;
        var date = data.date;
        var idx = date.indexOf("~");
        var start = date.substring(0, idx).trim();
        var end = date.substring(idx + 1).trim();

        var url = "./queryCharts.html?id=" + id + "&start=" + start + "&end=" + end + "&type=" + type;
        layer.open({
            type: 2,
            title: "图形展示",
            skin: "layui_layer",
            shade: 0.5,
            closeBtn: 1,
            shadeClose: true,
            id: "echats",
            area: ["1100px", "500px"],
            content: url
        });
    });

    e("queryData", {});
});
