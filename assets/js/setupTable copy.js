layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var $ = layui.$,
        form = layui.form,
        transfer = layui.transfer;

    var time = '1995-02-10';
    function getDataFn() {
        http({
            url: urls.record,
            data: {
                time: time
            },
            success: function (res) {
                var data = res.data;
                $("#tableBox").html(data);
                var insideWidth = $("#inside").width();
                $("#table").css('minWidth', insideWidth + 'px');

                var dutyWidth = $("#dutyInside").width();
                $("#duty").css('minWidth', dutyWidth + 'px');
            }
        });
    };
    getDataFn();

    var siteXm, buoyXm;
    function getXmselectFn() {
        http({
            url: urls.dutySite,
            success: function (res) {
                var siteData = res.data;
                var initValue = res.ids.length > 0 ? res.ids.split(',') : [];
                siteXm = xmSelect.render({
                    el: '#xmSite',
                    content: "<div id='transfer'></div>",
                    height: 'auto',
                    data: siteData,
                    initValue: initValue,
                    prop: { name: 'title' },
                    model: {
                        label: {
                            type: 'xmselect',
                            xmselect: {
                                template: function (data, sels) {
                                    return "选中 " + sels.length + "项"
                                }
                            }
                        }
                    },
                    on: function (data) {
                        if (!data.isAdd) {
                            transfer.reload('transfer', {
                                value: siteXm.getValue('value')
                            })
                        }
                    }
                });
                transfer.render({
                    id: 'transfer',
                    elem: '#transfer',
                    title: ['未选', '已选'],
                    data: siteData,
                    value: initValue,
                    onchange: function (data, index) {
                        if (index == 0) {
                            siteXm.append(data)
                        } else {
                            siteXm.delete(data)
                        }
                    }
                });
            }
        });
        http({
            url: urls.dutyBuoy,
            success: function (res) {
                var buoyData = res.data;
                var buoyInitValue = res.ids.length > 0 ? res.ids.split(',') : [];
                buoyXm = xmSelect.render({
                    el: '#xmBouy',
                    content: "<div id='transfers'></div>",
                    height: 'auto',
                    data: buoyData,
                    initValue: buoyInitValue,
                    prop: { name: 'title' },
                    model: {
                        label: {
                            type: 'xmselect',
                            xmselect: {
                                template: function (data, sels) {
                                    return "选中 " + sels.length + "项"
                                }
                            }
                        }
                    },
                    on: function (data) {
                        if (!data.isAdd) {
                            transfer.reload('transfers', {
                                value: buoyXm.getValue('value')
                            })
                        }
                    }
                });
                transfer.render({
                    id: 'transfers',
                    elem: '#transfers',
                    title: ['未选', '已选'],
                    data: buoyData,
                    value: buoyInitValue,
                    onchange: function (data, index) {
                        if (index == 0) {
                            buoyXm.append(data)
                        } else {
                            buoyXm.delete(data)
                        }
                    }
                });
            }
        });
    };
    getXmselectFn();

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
    var timeList = [
        '17', '18', '19', '20', '21', '22',
        '23', '00', '01', '02', '03', '04',
        '05', '06', '07', '08', '09', '10',
        '11', '12', '13', '14', '15', '16'
    ];
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
    // 生成
    form.on('submit(setup)', function () {
        var html = $("#tableBox").html();
        var stationId = siteXm.getValue('valueStr');
        var buoyId = buoyXm.getValue('valueStr');
        http({
            url: urls.dutySite,
            type: "post",
            data: {
                stationId: stationId,
                buoyId: buoyId,
                content: html
            },
            success: function (res) {
                layer.msg(res.msg)
            }
        });
    });

    e("setupTable", {})
});
