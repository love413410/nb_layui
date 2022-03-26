layui.define(["http"], function (e) {
    var utils = layui.utils,
        store = layui.store;

    var http = layui.http,
        urls = layui.urls;

    var $ = layui.$,
        form = layui.form;

    function setTimeFn() {
        var date = new Date();
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        date = date.toJSON().substr(0, 19).replace(/T/g, ' ');
        $('#headDate').html(date);
        setTimeout(setTimeFn, 500);
    };
    setTimeFn();

    var userName = layui.sessionData('userName').key;
    $("#users").html(userName);

    // function isSign() {
    //     http({
    //         url: urls.personnelSign,
    //         type: "post",
    //         success: function (res) {
    //             if (res.code == 200) {
    //                 $("#singTips").show();
    //                 $("#isSign").show();
    //             }
    //         },
    //         complete: function () {
    //             setTimeout(isSign, 1800000);
    //         }
    //     });
    // };
    // isSign();
    // 值班签到
    // $("#menuBtn").click(function () {
    //     http({
    //         url: urls.personnelSign,
    //         success: function (res) {
    //             layer.msg(res.msg, {
    //                 time: 1500
    //             }, function () {
    //                 $("#singTips").hide();
    //                 $("#isSign").hide();
    //             });
    //         }
    //     });
    // });

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

    // 右侧要素值
    var el = '';
    function getElementFn() {
        http({
            url: urls.siteEl,
            data: { type: 1 },//固定写死,1为站点
            async: false,
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i].fields;
                    if (i == 0) {
                        el = dataItem.el;
                        str += '<div class="layui-inline active" lay-id=' + dataItem.el + '>' + dataItem.Name + '</div>';
                    } else {
                        str += '<div class="layui-inline" lay-id=' + dataItem.el + '>' + dataItem.Name + '</div>';
                    };
                };
                $("#elList").html(str);
                getRealFn()
            }
        });
    };
    getElementFn();
    $("#elList").on("click", "div", function () {
        $("#elList div").removeClass('active');
        $(this).addClass('active');
        el = $(this).attr("lay-id");
        getRealFn();
    });
    // 实时数据
    var realTimer;
    function getRealFn() {
        clearTimeout(realTimer);
        $("#realRoll").empty();
        http({
            url: urls.indexData,
            data: { el: el },
            success: function (res) {
                $("#realRoll").empty();
                var data = res.data, content = '';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    content += '<div class="list_item">' +
                        '<p class="item_deta">' + dataItem.name + '</p>' +
                        '<p class="item_time">' + dataItem.value + '</p>' +
                        '<p class="item_deta">' + dataItem.time + '</p>' +
                        '</div>';
                };
                $("#realRoll").html(content);
            },
            complete: function () {
                realTimer = setTimeout(getRealFn, 60 * 1000);
            }
        });
    };

    // 右侧故障
    var faultTimer, faultRollTimer;
    function getFaultFn() {
        clearInterval(faultRollTimer);
        clearTimeout(faultTimer);
        $("#roll").empty();
        http({
            url: urls.alarmList,
            success: function (res) {
                $("#roll").empty();
                var data = res.data, content = '';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    content += '<div class="list_item">' +
                        '<p class="item_deta">' + dataItem.content + '</p>' +
                        '<p class="item_time">' + dataItem.date + '</p>' +
                        '</div>';
                };
                $("#menuRoll").html(content);
                if ($("#menuRoll").height() > $("#menuList").height()) {
                    faultRollTimer = setInterval(faultRollFn, 30);
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
                faultTimer = setTimeout(getFaultFn, 60 * 1000);
            }
        });
    };
    getFaultFn();

    function faultRollFn() {
        $("#menuRoll").animate({
            marginTop: '-=1'
        }, 0, function () {
            var s = Math.abs(parseInt($(this).css("margin-top")));
            if (s >= 40) {
                $(this).find("div").slice(0, 1).appendTo($(this));
                $(this).css("margin-top", 0);
            }
        });
        $("#menuList").hover(function () {
            clearInterval(faultRollTimer);
            clearTimeout(faultTimer);
        }, function () {
            clearInterval(faultRollTimer);
            clearTimeout(faultTimer);
            faultRollTimer = setInterval(faultRollFn, 30);
            faultTimer = setTimeout(getFaultFn, 30 * 1000);
        });
    };


    // 加入浙江地图
    var myChart;
    $.getJSON(urls.mapUrl, function (geoJson) {
        echarts.registerMap('zhejiang', geoJson);
        getsiteTypeFn();
    });
    // 左侧站点类型
    var typeArr = [];
    function getsiteTypeFn() {
        http({
            url: urls.index,
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i], title = '<div class="layui-form-item checkbox_head">' + dataItem.title + '</div>', checkbox = '';
                    for (var j = 0; j < dataItem.children.length; j++) {
                        var checkboxItem = dataItem.children[j];
                        if (checkboxItem.selected == true) {
                            typeArr.push(checkboxItem.id);
                            checkbox += '<input type="checkbox" checked lay-skin="primary" value="' + checkboxItem.id + '" title="' + checkboxItem.title + '" lay-filter="siteCheck">';
                        } else {
                            checkbox += '<input type="checkbox" lay-skin="primary" value="' + checkboxItem.id + '" title="' + checkboxItem.title + '" lay-filter="siteCheck">';
                        };
                    };
                    str += title + '<div class="layui-form-item">' + checkbox + '</div>';
                };
                $("#siteCheck").html(str);
                form.render();
                getMapDataFn();
            }
        });
    };
    // 选择后添加
    form.on('checkbox(siteCheck)', function (data) {
        var value = data.value;
        var isChck = data.elem.checked;
        isChck ? typeArr.push(value) : typeArr.splice(typeArr.indexOf(value), 1);
        getMapDataFn();
    });

    // 获取地图数据
    var mapTimer = '';
    function getMapDataFn() {
        var siteType = typeArr.join(',');
        clearTimeout(mapTimer);
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
                myChart = echarts.init(document.getElementById('main')).dispose();
                myChart = echarts.init(document.getElementById('main'));
                initMapFn(temp, lineData);
            },
            complete: function () {
                mapTimer = setTimeout(getMapDataFn, 60 * 1000);
            }
        });
    };

    function initMapFn(data, lineData) {
        var option = {
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(50,50,50,0.7)',
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
                center: [121.80, 29.60],
                zoom: 3,
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
                        areaColor: '#224560',
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
                data: data
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
                },
                data: lineData
            }]
        };
        myChart.setOption(option);
        myChart.on('click', function (e) {
            if (!e.data || !e.data.id) {
                return;
            };
            var data = e.data;
            var siteId = data.id;
            var url = store.filterUrl('layHome') + "?id=" + siteId;
            layer.closeAll(function () {
                layer.open({
                    type: 2,
                    title: data.site,
                    shade: 0.8,
                    resize: !1,
                    moveOut: 1,
                    skin: "home_layer",
                    area: ['400px', '300px'],
                    content: url
                });
            });
        });
    };
    // 退出
    $("#outBtn").click(function () {
        store.logOut();
    });
    window.routerTo = function (url) {
        store.toRouter(url);
    };
    // 判断权限
    function isNoFn() {
        var grade = layui.sessionData('grade').key;
        grade.indexOf(utils.grade.duty) > -1 ? $("#menuBtn").show() : $("#menuBtn").hide();
    };
    // isNoFn();
    e("map", {})
});