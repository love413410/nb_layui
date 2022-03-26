layui.define(["http", "utils"], function (e) {
    var utils = layui.utils;

    var http = layui.http,
        urls = layui.urls;

    var form = layui.form;

    function getTime() {
        http({
            url: urls.getRecord,
            data: {
                type: "content1"
            },
            success: function (res) {
                // var data = res.data, option = '<option value="">默认</option>';
                var data = res.data, option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i] + '">' + data[i] + '</option>';
                };
                $("#time").html(option);
                form.render();
            }
        });
    };
    // getTime();

    var time = '';//表1
    function getDataFn() {
        http({
            url: urls.record,
            data: {
                type: 'content1',
                time: time
            },
            success: function (res) {
                var data = res.data;
                console.log(data)
                $("#printContents").html(data);
            }
        });
    };
    // getDataFn();

    // 查询
    form.on('submit(lookup)', function (data) {
        time = data.field.time;
        getDataFn();
    });

    // 保存
    form.on('submit(saveBtn)', function (data) {
        var content = $("#printContents").formhtml();
        http({
            url: urls.record,
            type: 'post',
            data: {
                type: 'content1',
                content: content
            },
            success: function (res) {
                layer.msg(res.msg);
            }
        });
    });

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
            $("#printContents").print({
                stylesheet: [layuiCss, dutyTable],
                deferred: $.Deferred().done(function () { console.log('Printing done', arguments); })
            });
        });
    });

    var siteId = '', type = 'minute';
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
    indexList();

    form.on('submit(lineBtn)', function (data) {
        siteId = data.field.id;
        type = data.field.type
        getLineFn();
    });

    var title = {
        wl: "潮位",
        at: "气温",
        bp: "气压",
        hu: "湿度",
        ws: "风",
        vb: "能见度",
        sl: "盐度",
        wt: "水温",
        rn: "降水",
    };
    var charts = {}, list = ['wl', 'at', 'bp', 'hu', 'ws', 'vb', 'sl', 'wt', 'rn'];

    function repeat() {
        $("#charts .line").each(function () {
            var id = $(this).attr("id");
            charts[id] = echarts.init(document.getElementById(id));
        });
    };
    repeat();

    function getLineFn() {
        http({
            url: urls.dutyCurve,
            data: {
                id: siteId,
                type: type
            },
            success: function (res) {
                var data = res.data, time = res.time, unit = res.unit;
                for (var i = 0; i < list.length; i++) {
                    var el = list[i];
                    var option = initLineFn(title[el], data[el], time, unit[el]);
                    charts[el].setOption(option);
                };
            },
            error: function () {
                for (var item in charts) {
                    charts[item].dispose();
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
                    var html = item.marker + "<span>" + item.name + "</span>" + "<p>" + title + "</p>";
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
        $("input,textarea,button", this).each(function () {
            this.setAttribute('value', this.value);
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

    e("test", {})
});
