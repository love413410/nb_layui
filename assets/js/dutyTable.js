layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var form = layui.form;

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

    var date = '', time = '';
    function getTime() {
        http({
            url: urls.getRecord,
            success: function (res) {
                var data = res.data, option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i] + '">' + data[i] + '</option>';
                };
                $("#time").html(option);
                date = time = data[0];
                form.render();
                indexList();
            }
        });
    };
    getTime();

    // 查询
    form.on('select(timeSelect)', function (data) {
        time = data.value;
        // getDataFn();
        indexList();
    });

    var timeList = [
        17, 18, 19, 20, 21, 22, 23, 0,
        1, 2, 3, 4, 5, 6, 7, 8,
        9, 10, 11, 12, 13, 14, 15, 16
    ];

    // 给table赋值
    function setTableHtml(data) {
        $("#tableDate").html(data.date);
        $("#onNight").attr('src', data.onNight);
        $("#onDay").attr('src', data.onDay);
        $("#desc").html(data.desc);
        // 处理表一
        var tableSite = JSON.parse(data.site);
        var length = tableSite.length;
        var tempWidth = 61 * (length + 2);
        var insideWidth = $("#inside").width();
        var width = tempWidth < insideWidth ? insideWidth : tempWidth;
        var thead = ' <td>时间</td><td>测点</td>';
        for (var a = 0; a < tableSite.length; a++) {
            var dataItem = tableSite[a];
            thead += '<td>' + dataItem.name + '</td>';
        };
        thead = '<tbody class="thead"><tr>' + thead + '<tr></tbody>';
        var tbody = '';
        for (var b = 0; b < timeList.length; b++) {
            var z = timeList[b];
            var wl = '', ws = '';
            for (var c = 0; c < tableSite.length; c++) {
                var y = tableSite[c];
                wl += '<td id="wl_' + z + '_' + y.id + '"></td>';
                ws += '<td id="ws_' + z + '_' + y.id + '"></td>';
            };
            var t = z < 10 ? '0' + z : z;
            tbody += '<tr>' +
                '<td rowspan="2">' + t + '时</td>' +
                '<td>潮位</td>' + wl +
                ' </tr>' +
                '<tr>' +
                '<td>风速</td>' + ws +
                '</tr>';
        };
        tbody = '<tbody class="tbody"><tr>' + tbody + '<tr></tbody>';
        var table = '<table cellspacing="0" cellpadding="0" border="0" style="min-width:' + width + 'px">' + thead + tbody + '</table>';
        $("#inside").html(table);

        var tableData = JSON.parse(data.content1);
        for (var c = 0; c < timeList.length; c++) {
            var val = timeList[c];
            for (var key in tableData) {
                var tableItem = tableData[key];
                var idx = key.indexOf('_');
                var str = key.substring(idx + 1);
                var wl_val = tableItem['time_' + val].wl;
                $("#wl_" + val + '_' + str).text(wl_val);
                var ws_val = tableItem['time_' + val].ws;
                $("#ws_" + val + '_' + str).text(ws_val);
            };
        };

        $("#dutyInside").html(data.content2);
        var dutyWidth = $("#dutyInside").width();
        var size = Number(data.size + 8);
        var actualWidth = 61 * size;
        var dutyMinWidth = actualWidth < dutyWidth ? dutyWidth : actualWidth;
        $("#duty").css('minWidth', dutyMinWidth + 'px');
    };

    var siteId = '';
    function indexList() {
        var id = '';
        http({
            url: urls.indexList,
            success: function (res) {
                var data = res.data, arr = [];
                id = data.length ? data[0].id : "";
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    if (siteId == dataItem.id) {
                        arr.push('<option value=' + dataItem.id + ' selected>' + dataItem.name + '</option>');
                        id = dataItem.id;
                    } else {
                        arr.push('<option value=' + dataItem.id + '>' + dataItem.name + '</option>');
                    };
                };
                $("#site").html(arr.join(','));
                form.render();
                siteId = id;
                getLineFn();
            }
        });
    };

    form.on('select(selectFilter)', function (data) {
        siteId = data.value;
        getLineFn();
    });

    function getLineFn() {
        var duty = '', desc = '';
        if (time == date) {
            duty = $("#dutyInside").formhtml();
            desc = $("#desc").val();
        };
        http({
            url: urls.dutyCurves,
            type: "post",
            data: {
                time: time,
                id: siteId,
                desc: desc,
                content2: duty
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
                setTableHtml(res.datas);
            },
            error: function () {
                for (var i = 0; i < elementList.length; i++) {
                    var dataItem = elementList[i];
                    var id = dataItem.id;
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
        };
        return option;
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
