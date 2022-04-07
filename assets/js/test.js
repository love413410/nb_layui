layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var $ = layui.$,
        form = layui.form;

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
    form.on('submit(preview)', function () {
        var siteIdList = siteXm.getValue();
        var bouyList = buoyXm.getValue();
        generateSite(siteIdList, bouyList);
    });

    var time = [
        17, 18, 19, 20, 21, 22, 23, 0,
        1, 2, 3, 4, 5, 6, 7, 8,
        9, 10, 11, 12, 13, 14
    ];

    function getHtmlFn() {
        var site = [];
        var data = {};
        for (var i = 0; i < 100; i++) {
            site.push({
                name: '测试站点' + i,
                id: i
            });
            data[i] = {};
            for (var j = 0; j < 24; j++) {
                data[i][j] = {
                    wl: 10,
                    ws: 11
                };
            };
        };
        data = JSON.stringify(data)

        var datas = {
            table: {
                site: site,
                data: data,
                date: '<span>2022</span>年<span>3</span>月<span>20</span>日至<span>2022</span>年<span>3</span>月<span>21</span>日',
                desc: "测试",
                onNight: '',
                onDay: ''
            },
            duty: {
                size: 4,
                data: []
            }
        };
        var table = datas.table;
        var duty = datas.duty;
        testTable(table, duty);
    };

    getHtmlFn();


    // 时间列表
    var tableSite;
    function testTable(data, duty) {

        console.log(data.data)
        $("#tableDate").html(data.date);
        $("#textarea").html(data.desc);

        tableSite = data.site;
        var length = tableSite.length;
        var tempWidth = 61 * (length + 2);
        var insideWidth = $("#inside").width();
        var width = tempWidth < insideWidth ? insideWidth : tempWidth;

        var size = duty.size;
        var dutyTempWidth = 61 * (size + 7);
        console.log(dutyTempWidth)
        var dutyInsideWidth = $("#dutyInside").width();
        var dutyWidth = dutyTempWidth < dutyInsideWidth ? dutyInsideWidth : dutyTempWidth;
        $("#duty").css('minWidth', dutyWidth + 'px');



        var thead = ' <td>时间</td><td>测点</td>';
        for (var a = 0; a < tableSite.length; a++) {
            var dataItem = tableSite[a];
            thead += '<td>' + dataItem.name + '</td>';
        };
        thead = '<tbody class="thead"><tr>' + thead + '<tr></tbody>';

        var tbody = '';
        for (var b = 0; b < time.length; b++) {
            var z = time[b];
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

        // var realData = data.data;
        var realData = JSON.parse(data.data);
        for (var d = 0; d < time.length; d++) {
            var x = time[d];
            for (var key in realData) {
                var wl_val = realData[key][x].wl;
                $("#wl_" + x + '_' + key).text(wl_val);
                var ws_val = realData[key][x].ws;
                $("#ws_" + x + '_' + key).text(ws_val);
            }
        };
    };

    form.on('submit(setup)', function () {
        var data = {};
        for (var c = 0; c < tableSite.length; c++) {
            var n = tableSite[c].id;
            data[n] = {};
            for (var d = 0; d < time.length; d++) {
                var t = time[d];
                var wl = $("#wl_" + t + '_' + n).text();
                var ws = $("#ws_" + t + '_' + n).text();
                data[n][t] = {
                    wl: wl,
                    ws: ws
                }
            };
        };
        console.log(data)
    });


    function generateSite(siteData, buoyData) {
        var length = siteData.length;
        var tempWidth = 61 * (length + 2);
        var insideWidth = $("#inside").width();
        var width = tempWidth < insideWidth ? insideWidth : tempWidth;
        $("#table").css('minWidth', width + 'px');
        // 添加表头
        // var thead = ' <th>时间</th><th>测点</th>';
        // for (var k = 0; k < siteData.length; k++) {
        //     var dataItem = siteData[k];
        //     thead += '<th id="' + dataItem.value + '">' + dataItem.title + '</th>';
        // };
        var thead = ' <td>时间</td><td>测点</th>';
        for (var k = 0; k < siteData.length; k++) {
            var dataItem = siteData[k];
            thead += '<td id="' + dataItem.value + '">' + dataItem.title + '</td>';
        };
        $("#thead").html('<tr>' + thead + '</tr>');

        var tbody = '';
        for (var t = 0; t < timeList.length; t++) {
            var timeItem = timeList[t];
            var wl_td = '', ws_td = '';
            for (var k = 0; k < siteData.length; k++) {
                var dataItem = siteData[k];
                // for (var k = 0; k < 99; k++) {
                //     var dataItem = siteData[0];
                wl_td += '<td id="wl_' + timeItem + '_' + dataItem.value + '"></td>';
                ws_td += '<td id="ws_' + timeItem + '_' + dataItem.value + '"></td>';
            };

            tbody += '<tr>' +
                '<td rowspan="2">' + timeItem + '时</td>' +
                '<td>潮位</td>' + wl_td +
                ' </tr>' +
                '<tr>' +
                '<td>风速</td>' + ws_td +
                '</tr>';
        };
        $("#tbody").html(tbody);


        // 表二
        var bouyLength = buoyData.length;
        var dutyTempWidth = 61 * (length + 7);
        var dutyInsideWidth = $("#dutyInside").width();
        var dutyWidth = dutyTempWidth < dutyInsideWidth ? dutyInsideWidth : dutyTempWidth;
        $("#duty").css('minWidth', dutyWidth + 'px');

        // var dutyThead = '<tr><th rowspan="2">时间</th>' +
        //     '<th rowspan="2" id="shipin">视频</th>' +
        //     '<th rowspan="2" id="leida">地波雷达</th>' +
        //     '<th rowspan="2" id="gnss" >GNSS</th>' +
        //     '<th colspan="2" id="zhiyuanchuan">志愿船</th>' +
        //     '<th colspan="' + bouyLength + '">浮标</th>' +
        //     '<th rowspan="2" colspan="2">机房环控</th>' +
        //     '<th rowspan="2" colspan="3">其他说明</th></tr>';
        var dutyThead = '<tr><td rowspan="2">时间</td>' +
            '<td rowspan="2" id="shipin">视频</td>' +
            '<td rowspan="2" id="leida">地波雷达</td>' +
            '<td rowspan="2" id="gnss" >GNSS</td>' +
            '<td colspan="2" id="zhiyuanchuan">志愿船</td>' +
            '<td colspan="' + bouyLength + '">浮标</td>' +
            '<td rowspan="2" colspan="2">机房环控</td>' +
            '<td rowspan="2" colspan="3">其他说明</td></tr>';
        var th = '<td>近岸</td><td>远洋</td>';
        // var th = '<th>近岸</th><th>远洋</th>';
        for (var i = 0; i < buoyData.length; i++) {
            var bouyItem = buoyData[i];
            th += '<td id="' + bouyItem.value + '">' + bouyItem.title + '</td>';
            // th += '<th id="' + bouyItem.value + '">' + bouyItem.title + '</th>';
        };
        dutyThead += '<tr>' + th + '</tr>';
        $("#dutyThead").html(dutyThead);

        var dutyTbody = '';
        for (var m = 0; m < timeList.length; m++) {
            var timeItem = timeList[m];

            var dutyTbodyTr = '<td id="shipin_' + timeItem + '"></td>' +
                '<td id="leida_' + timeItem + '"></td>' +
                '<td id="gnss_' + timeItem + '"></td>' +
                '<td id="jinan_' + timeItem + '"></td>' +
                '<td id="yuanyang_' + timeItem + '"></td>';

            var dutyTemp = '<td colspan="3" contenteditable></td>';
            if (m % 4 == 0) {
                dutyTemp = '<td rowspan="4" colspan="2">' +
                    '<div class="dutyType">' +
                    '<p>温度:</p>' +
                    '<p contenteditable></p>' +
                    '<p>湿度:</p>' +
                    '<p contenteditable></p>' +
                    '</div>' +
                    '</td>' +
                    '<td colspan="3" contenteditable></td>';
            };

            var dutyTd = '';
            for (var n = 0; n < buoyData.length; n++) {
                var buoyItem = buoyData[n];
                dutyTd += '<td id="duty_' + timeItem + '_' + buoyItem.value + '"></td>';
            };
            dutyTbody += '<tr><td>' + timeItem + '时</td>' + dutyTbodyTr + dutyTd + dutyTemp + '</tr>';
        };
        $("#dutyTbody").html(dutyTbody);
    };

    e("test", {})
});
