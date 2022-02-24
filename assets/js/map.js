layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var $ = layui.$,
        form = layui.form;

    var audio = document.getElementById("audio"),
        play = 0, isPlay;
    $("#play").click(function () {
        isPlay = $(this).attr("is");
        if (isPlay == 'true') {
            $(this).attr("is", "false");
            $(this).attr("src", "../images/false.png");
        } else {
            $(this).attr("is", "true");
            $(this).attr("src", "../images/true.png");
        };
        playStatus();
    });
    function playStatus() {
        play && isPlay == 'false' ? audio.play() : audio.pause();
    };

    // 站点类型
    var checkArr = [];
    function getsiteTypeFn() {
        http({
            url: urls.siteType,
            success: function (res) {
                var data = res.data;
                var option = '', checkbox = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].pk + '">' + data[i].fields.Type + '</option>';
                    checkbox += '<div class="layui-form-item">' +
                        '<div class="layui-inline">' +
                        '<div class="layui-input-inline">' +
                        '<input type="checkbox" value="' + data[i].pk + '" lay-skin="primary" lay-filter="check" title="' + data[i].fields.Type + '" checked/>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    checkArr.push(data[i].pk);
                };

                siteType = checkArr.join(",");
                $("#siteCheck").html(checkbox);
                $("#siteType").html(option);
                form.render("checkbox", "siteCheck");
                form.render("select", "layInputBox");
                if (data.length > 0) {
                    dayval = data[0].pk;
                    getToDayDataFn();
                    getMapDataFn();
                    getListFn();
                };
            }
        });
    };

    // 右侧今日传输量
    var dayTime, dayval;
    function getToDayDataFn() {
        clearTimeout(dayTime);
        http({
            url: urls.indexReceive,
            data: { type: dayval },
            success: function (res) {
                var data = res.data;
                $("#file").html(data.file);
                $("#fileUnit").html(data.fileUnit);
                $("#data").html(data.data);
                $("#dataUnit").html(data.dataUnit);
            },
            complete: function () {
                dayTime = setTimeout(function () {
                    getToDayDataFn();
                }, 60000);
            }
        });
    };
    form.on('select(siteType)', function (data) {
        dayval = data.value;
        getToDayDataFn();
    });

    // 右侧故障
    var rollTime, rollTimeout, rollSh = 40, rollSpeed = 30;
    function getListFn() {
        clearInterval(rollTime);
        clearTimeout(rollTimeout);
        $("#roll").empty();
        http({
            url: urls.alarmList,
            data: { type: siteType },
            success: function (res) {
                $("#roll").empty();
                var data = res.data;
                var content = '';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    content += '<div class="list_item">' +
                        '<p class="item_deta">' + dataItem.content + '</p>' +
                        '<p class="item_time">' + dataItem.date + '</p>' +
                        '</div>';
                };
                $("#menuRoll").html(content);
                if ($("#menuRoll").height() > $("#menuList").height()) {
                    rollTime = setInterval(function () {
                        setRollFn();
                    }, rollSpeed);
                };

                play = data.length > 0 ? 1 : 0;

                var isIe = layui.device().ie;
                if (isIe) {
                    $("#play").hide();
                    audio.play();
                } else {
                    $("#play").show();
                    playStatus();
                };
            },
            complete: function () {
                rollTimeout = setTimeout(function () {
                    getListFn();
                }, 60000);
            }
        });
    };

    function setRollFn() {
        $("#menuRoll").animate({
            marginTop: '-=1'
        }, 0, function () {
            var s = Math.abs(parseInt($(this).css("margin-top")));
            if (s >= rollSh) {
                $(this).find("div").slice(0, 1).appendTo($(this));
                $(this).css("margin-top", 0);
            }
        });
        $("#menuList").hover(function () {
            clearInterval(rollTime);
            clearTimeout(rollTimeout);
        }, function () {
            clearInterval(rollTime);
            clearTimeout(rollTimeout);
            rollTime = setInterval(function () {
                setRollFn();
            }, rollSpeed);
            rollTimeout = setTimeout(function () {
                getListFn();
            }, 30000);
        });
    };


    // 获取地图数据
    var myChart = echarts.init(document.getElementById('main'));
    $.getJSON(urls.mapUrl, function (geoJson) {
        echarts.registerMap('zhejiang', geoJson);
        initMapFn();
    });
    var siteType = '', mapTime, checkTime;
    function getMapDataFn() {
        clearTimeout(mapTime);
        http({
            url: urls.index,
            type: "post",
            data: { type: siteType },
            success: function (res) {
                var data = res.data, lineData = res.line;
                var temp = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var symbol = "image://../images/icon" + dataItem.type + dataItem.state + ".png";
                    dataItem.name = dataItem.fontSize == 0 ? "" : dataItem.site;
                    dataItem.symbol = symbol;
                    dataItem.symbolSize = dataItem.size;
                    temp.push(dataItem);
                };
                myChart.setOption({
                    series: [{
                        data: temp
                    }, {
                        data: lineData
                    }]
                });
            },
            complete: function () {
                mapTime = setTimeout(function () {
                    getMapDataFn();
                }, 60000);
            }
        });
    };
    // 左侧复选框
    form.on('checkbox(check)', function (data) {
        clearTimeout(checkTime);
        var tempVal = Number(data.value);
        var isChecked = data.elem.checked;
        if (isChecked) {
            checkArr.push(tempVal)
        } else {
            var idx = checkArr.indexOf(tempVal);
            checkArr.splice(idx, 1);
        };
        siteType = checkArr.join(',');
        checkTime = setTimeout(function () {
            getMapDataFn();
            getListFn();
        }, 1000);
    });

    myChart.on('click', function (e) {
        // return;
        if (!e.data || !e.data.id) {
            // layer.msg("请使用最新版IE打开")
            return;
        };
        // || !isIe
        var data = e.data;
        var siteId = data.id;
        var url = './layHome.html?id=' + siteId;
        layer.closeAll(function () {
            layer.open({
                type: 2,
                title: data.name,
                shade: 0.8,
                resize: !1,
                moveOut: 1,
                skin: "layui_layer",
                area: ['400px', '400px'],
                content: url,
                success: function () {

                },
                cancel: function () {

                }
            });
        });
    });

    function initMapFn() {
        var option = {
            tooltip: {
                trigger: 'item',
                borderColor: '#FFFFCC',
                hideDelay: 0,
                transitionDuration: 0,
                extraCssText: 'z-index:100',
                textStyle: {
                    color: '#fff'
                },
                formatter: function (params) {
                    var data = params.data;
                    return data.site;
                }
            },
            geo: {
                map: 'zhejiang',
                roam: true,
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    emphasis: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: "#224560",
                        borderColor: '#73CBE3'
                    },
                    emphasis: {
                        areaColor: '#2AB8FF',
                        color: 'green'
                    }
                }
            },
            series: [{
                type: 'effectScatter', coordinateSystem: 'geo', zlevel: 2,
                rippleEffect: { period: 10, brushType: 'fill', scale: 0 },
                label: {
                    normal: {
                        show: true, position: 'right',
                        textStyle: {
                            color: '#fff', fontFamily: 'arial', fontSize: 16
                        },
                        formatter: '{b}'
                    }
                },
            }, {
                type: 'lines',
                tooltip: {
                    formatter: function (e) {
                        return '';
                    }
                },
                zlevel: 1,
                effect: { show: true, symbolSize: 2, constantSpeed: 50, color: '#73CBE3', shadowBlur: 8 },
                lineStyle: {
                    normal: {
                        curveness: 0.2,
                        color: function (item) {
                            var line = item.data.line;
                            var color = line == 0 ? "rgba(51,204,0,0.1)" : "rgba(255,0,0,0.1)";
                            return color;
                        }
                    }
                }
            }]
        };
        myChart.setOption(option);
        getsiteTypeFn();
    };

    e("map", {})
});