layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var form = layui.form;

    var date = '', time = '';
    function getTime() {
        http({
            url: urls.getRecord,
            success: function (res) {
                console.log(res)
                var data = res.data, option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i] + '">' + data[i] + '</option>';
                };
                $("#time").html(option);
                date = time = data[0];
                form.render();
                getDataFn();
            }
        });
    };
    getTime();

    // 查询
    form.on('select(timeSelect)', function (data) {
        time = data.value;
        getDataFn();
    });

    function getDataFn() {
        http({
            url: urls.record,
            data: {
                time: time
            },
            success: function (res) {
                var html = res.data;
                setTableHtml(html);
                if (time == date) {
                    indexList();
                };
            }
        });
    };
    // 给table赋值
    function setTableHtml(html) {
        $("#tableBox").html(html);
        var insideWidth = $("#inside").width();
        $("#table").css('minWidth', insideWidth + 'px');

        var dutyWidth = $("#dutyInside").width();
        $("#duty").css('minWidth', dutyWidth + 'px');
    };

    // 打印
    var baseUrl = urls.baseFileUrl;
    var layuiCss = baseUrl + "/assets/lib/layui/css/layui.css",
        dutyTable = baseUrl + "/assets/css/dutyTable.css";
    jQuery(function ($) {
        'use strict';
        try {
            var original = document.getElementById('canvasExample');
            original.getContext('2d').fillRect(20, 20, 120, 120);
        } catch (err) {
            console.warn(err)
        }
        $("#print").on('click', function () {
            $("#tableBox").print({
                stylesheet: [layuiCss, dutyTable],
                deferred: $.Deferred().done(function () { console.log('Printing done', arguments); })
            });
        });
    });

    // 左侧
    var elementList = [
        { id: "wl", charts: null, title: "潮位" },
        { id: "ws", charts: null, title: "风速" },
        { id: "wd", charts: null, title: "风向" },
        { id: "at", charts: null, title: "气温" },
        { id: "bp", charts: null, title: "气压" },
        { id: "hu", charts: null, title: "湿度" },
        { id: "sl", charts: null, title: "盐度" },
        { id: "wt", charts: null, title: "水温" },
        { id: "vb", charts: null, title: "能见度" },
        { id: "rn", charts: null, title: "降水" }
    ];

    var str = '';
    for (var i = 0; i < elementList.length; i++) {
        var dataItem = elementList[i];
        var id = dataItem.id;
        str += '<div class="line" id="' + id + '"></div>';
    };
    $("#chartsBox").html(str);

    var siteId = '';
    function indexList() {
        http({
            url: urls.indexList,
            success: function (res) {
                var data = res.data, arr = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    arr.push('<option value=' + dataItem.id + '>' + dataItem.name + '</option>');
                };
                $("#site").html(arr.join(','));
                form.render();
                siteId = data.length > 0 ? data[0].id : ""
                getLineFn();
            }
        });
    };

    form.on('select(selectFilter)', function (data) {
        siteId = data.value;
        getLineFn();
    });

    function getLineFn() {
        var content = '';
        if (time == date) {
            content = $("#tableBox").formhtml();
        };
        http({
            url: urls.dutyCurve,
            type: "post",
            data: {
                id: siteId,
                content: content
            },
            success: function (res) {
                var data = res.data, time = res.time, unit = res.unit;
                for (var i = 0; i < elementList.length; i++) {
                    var dataItem = elementList[i];
                    var id = dataItem.id;
                    dataItem.charts = echarts.init(document.getElementById(id)).dispose();
                    dataItem.charts = echarts.init(document.getElementById(id));
                    var option = initLineFn(dataItem.title, data[id], time, unit[id]);
                    dataItem.charts.setOption(option);
                };
                var html = res.content;
                setTableHtml(html);
            },
            error: function () {
                $("#tableBox").empty();
                for (var i = 0; i < elementList.length; i++) {
                    var dataItem = elementList[i];
                    dataItem.charts = echarts.init(document.getElementById(id)).dispose();
                }
            }
        });
    };

    function initLineFn(title, data, time, unit) {
        var title = title + "(" + data[data.length - 1] + unit + ")"
        var option = {
            title: {
                text: title
            },
            grid: {
                top: 40,
                bottom: 60,
                left: 50,
                right: 10
            },
            tooltip: {
                trigger: "axis",
                formatter: function (item) {
                    var item = item[0];
                    var html = item.marker + "<span>" + item.name + "</span>" + "<p>" + item.value + "</p>";
                    return html;
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
                axisLabel: {
                    interval: "auto",
                    showMinLabel: 1,
                    showMaxLabel: 1,
                    textStyle: {
                        color: "#227BA6"
                    },
                    fontSize: 12,
                    margin: 15,
                    rotate: 45
                },
                data: time
            },
            yAxis: {
                nameTextStyle: {
                    fontSize: 16
                },
                axisLine: {
                    show: true
                },
                axisTick: {
                    show: true
                }
            },
            series: [{
                type: 'line',
                smooth: true,
                data: data,
                symbolSize: 1,
                symbol: 'circle',
            }]
            // xAxis: [{
            //     type: 'category',
            //     data: time,
            //     axisLine: {
            //         onZero: false,
            //         lineStyle: {
            //             color: "#227BA6"
            //         }
            //     },
            //     axisLabel: {
            //         interval: "auto",
            //         showMinLabel: 1,
            //         showMaxLabel: 1,
            //         textStyle: {
            //             color: "#227BA6"
            //         },
            //         fontSize: 12,
            //         margin: 15,
            //         rotate: 45
            //     },
            //     splitLine: {
            //         show: true,
            //         lineStyle: {
            //             color: '#227BA6'
            //         },
            //     },
            //     axisPointer: {
            //         label: {
            //             padding: [0, 0, 10, 0],
            //             margin: 15,
            //             fontSize: 12
            //         }
            //     },
            //     boundaryGap: false
            // }],
            // yAxis: [{
            //     nameTextStyle: {
            //         fontSize: 16
            //     },
            //     type: 'value',
            //     axisTick: {
            //         show: false
            //     },
            //     axisLine: {
            //         show: true,
            //         lineStyle: {
            //             color: "#227BA6"
            //         }
            //     },
            //     axisLabel: {
            //         textStyle: {
            //             color: "#227BA6"
            //         }
            //     },
            //     splitLine: {
            //         lineStyle: {
            //             color: '#227BA6'
            //         },
            //     }
            // }],
            // series: [{
            //     type: 'line',
            //     data: data,
            //     symbolSize: 1,
            //     symbol: 'circle',
            //     smooth: true,
            //     yAxisIndex: 0,
            //     showSymbol: false,
            //     lineStyle: {
            //         normal: {
            //             color: "#07a6ff"
            //         }
            //     }
            // }]
        };
        return option;
    };

    // 封装一个
    var oldHTML = $.fn.html;
    $.fn.formhtml = function () {
        if (arguments.length) return oldHTML.apply(this, arguments);
        // $("input,textarea,button", this).each(function () {
        //     this.setAttribute('value', this.value);
        // });
        $("input,button", this).each(function () {
            this.setAttribute('value', this.value);
        });
        $("textarea", this).each(function () {
            this.innerHTML = this.value;
        });
        $(":radio,:checkbox", this).each(function () {
            if (this.checked) this.setAttribute('checked', 'checked');
            else this.removeAttribute('checked');
        });
        $("option", this).each(function () {
            if (this.selected) this.setAttribute('selected', 'selected');
            else this.removeAttribute('selected');
        });
        return oldHTML.apply(this);
    };

    e("dutyTable", {})
});
