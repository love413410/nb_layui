layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var form = layui.form;

    // 左侧
    var lineExample = {
        wl: { charts: null, title: "潮位" },
        ws: { charts: null, title: "风速" },
        wd: { charts: null, title: "风向" },

        at: { charts: null, title: "气温" },
        bp: { charts: null, title: "气压" },
        hu: { charts: null, title: "湿度" },

        sl: { charts: null, title: "盐度" },
        wt: { charts: null, title: "水温" },
        vb: { charts: null, title: "能见度" },
        rn: { charts: null, title: "降水" },
        ybg: { charts: null, title: "有效波高" },
    };
    // 初始化折线图
    var initLineFn = function (title, data, time, unit) {
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

    // 获取折线图数据
    var siteId = '';
    var getLineFn = function () {
        http({
            url: urls.dutyCurves,
            type: "post",
            data: {
                id: siteId
            },
            success: function (res) {
                var data = res.data, time = res.time; unit = res.unit;
                for (var item in data) {
                    var dataItem = lineExample[item];
                    $("#" + item).show();
                    dataItem.charts = echarts.init(document.getElementById(item)).dispose();
                    dataItem.charts = echarts.init(document.getElementById(item));
                    var option = initLineFn(dataItem.title, data[item], time, unit[item]);
                    dataItem.charts.setOption(option);
                };
            },
            error: function () {
                for (var item in data) {
                    var dataItem = lineExample[item];
                    if (dataItem.charts) {
                        dataItem.charts = echarts.init(document.getElementById(item)).dispose();
                    }
                }
            }
        });
    };
    // 获取站点列表
    var indexList = function () {
        http({
            url: urls.indexList,
            success: function (res) {
                var data = res.data, arr = [];
                siteId = data.length ? data[0].id : "";
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    arr.push('<option value=' + dataItem.id + '>' + dataItem.name + '</option>');
                };
                $("#site").html(arr.join(','));
                form.render();
                getLineFn();
            }
        });
    };
    indexList();
    form.on('select(selectFilter)', function (data) {
        siteId = data.value;
        getLineFn();
    });
    // 右侧
    var cols = [17, 18, 19, 20, "break", "08", "09", 10, 11, 12, 13, 14, 15, 16];
    var thead = null;
    var getTable = function () {
        http({
            url: urls.dutyRecord,
            data: {
                Type: grade_type,
                time: date
            },
            success: function (res) {
                var data = res.data;
                thead = data.thead;
                var lth = thead.length;

                var thead_str = '<td>时间</td><td>测点</td>';
                for (var i = 0; i < thead.length; i++) {
                    thead_str += '<td>' + thead[i].site + '</td>';
                };
                $("#thead").html(thead_str);

                var col_tr = '';
                for (var j = 0; j < cols.length; j++) {
                    if (cols[j] == 'break') {
                        var colspan = lth - 1;
                        col_tr += '<tr>' +
                            '<td>21-07时</td>' +
                            '<td colspan="2">正常<input type="checkbox" id="abnormal">不正常<input type="checkbox" id="normal"></td>' +
                            '<td colspan="' + colspan + '">' +
                            '<input type="text" id="remarks" class="layui-input">' +
                            '</td>' +
                            '</tr>';
                    } else {
                        var wl = '<td rowspan="2">' + cols[j] + '时</td><td>潮位</td>';
                        var ws = '<td>风速</td>';
                        for (var k = 0; k < thead.length; k++) {
                            wl += '<td><input type="text" class="layui-input" id="wl_' + cols[j] + '_' + thead[k].id + '"></td>';
                            ws += '<td><input type="text" class="layui-input" id="ws_' + cols[j] + '_' + thead[k].id + '"></td>';
                        };
                        col_tr += '<tr>' + wl + '</tr><tr>' + ws + '<tr>';
                    };
                };
                $("#tbody").html(col_tr);

                var tbody = data.tbody;
                for (var item in tbody) {
                    $("#" + item).val(tbody[item])
                };
                var checked = data.checked;
                if (checked == 1) {
                    $("#abnormal").attr("checked", true)
                }
                if (checked == 2) {
                    $("#normal").attr("checked", true)
                }
                if (checked == 3) {
                    $("#abnormal").attr("checked", true)
                    $("#normal").attr("checked", true)
                }
                var recordTime = data.recordTime;
                $("#recordTime").html(recordTime);

                var desc = data.desc;
                $("#desc").val(desc);

                var onNight = data.onNight;
                var onNight_str = "";
                for (var o = 0; o < onNight.length; o++) {
                    onNight_str += '<p>' +
                        '<img src="' + onNight[o] + '">' +
                        '</p>'
                };
                $("#onNight").html(onNight_str);

                var onDay = data.onDay;
                var onDay_str = "";
                for (var y = 0; y < onDay.length; y++) {
                    onDay_str += '<p>' +
                        '<img src="' + onDay[y] + '">' +
                        '</p>'
                };
                $("#onDay").html(onDay_str);
            }
        });
    };
    // 表二
    var theads = null;
    var getDuty = function () {
        var duty = [
            { time: "17时", type: "text", text: "温度:", border: "none", code: "site_17" },
            { time: "18时", type: "input", border: "none", id: "at_1", code: "site_18" },
            { time: "19时", type: "text", text: "湿度:", border: "none", code: "site_19" },
            { time: "20时", type: "input", id: "hu_1", code: "site_20" },
            { time: "21-07时", type: "checkbox", code: "site_21" },
            { time: "08时", type: null, code: "site_08" },
            { time: "09时", type: "text", text: "温度:", border: "none", code: "site_09" },
            { time: "10时", type: "input", border: "none", id: "at_2", code: "site_10" },
            { time: "11时", type: "text", text: "湿度:", border: "none", code: "site_11" },
            { time: "12时", type: "input", id: "hu_2", code: "site_12" },
            { time: "13时", type: "text", text: "温度:", border: "none", code: "site_13" },
            { time: "14时", type: "input", border: "none", id: "at_3", code: "site_14" },
            { time: "15时", type: "text", text: "湿度:", border: "none", code: "site_15" },
            { time: "16时", type: "input", id: "hu_3", code: "site_16" },
        ];

        var dutyTheader = [
            { title: "时间", rowspan: 2 },
            { title: "视频", rowspan: 2 },
            { title: "地波雷达", rowspan: 2 },
            { title: "GNSS", rowspan: 2 },
            { title: "志愿船", colspan: 2 },
            { title: "浮标", colspan: 2, id: "buoy" },
            { title: "机房环控", rowspan: 4 },
            { title: "其他说明", rowspan: 2 }
        ];
        var shipu = [
            { title: "时间", rowspan: 2 },
            { title: "视频", rowspan: 2 },
            { title: "地波雷达", rowspan: 2 },
            { title: "X波段雷达", rowspan: 2 },
            { title: "GNSS", rowspan: 2 },
            { title: "预警台", rowspan: 2 },
            { title: "机房环控", rowspan: 4 },
            { title: "其他说明", rowspan: 2 }
        ];
        var zhenhai = [
            { title: "时间", rowspan: 2 },
            { title: "视频", rowspan: 2 },
            { title: "GNSS", rowspan: 2 },
            { title: "志愿船", colspan: 2 },
            { title: "浮标", colspan: 2, id: "buoy" },
            { title: "机房环控", rowspan: 4 },
            { title: "其他说明", rowspan: 2 }
        ];

        dutyTheader = grade_type == 4 ? zhenhai : grade_type == 5 ? shipu : dutyTheader;
        var str_theader = "";
        for (var h = 0; h < dutyTheader.length; h++) {
            var theaderItem = dutyTheader[h];
            var rowspan = theaderItem.rowspan ? theaderItem.rowspan : 1,
                colspan = theaderItem.colspan ? theaderItem.colspan : 1,
                title = theaderItem.title;

            var id = theaderItem.id;
            if (id) {
                str_theader += '<th rowspan="' + rowspan + '" colspan="' + colspan + '" id="' + id + '"><div class="duty_cell">' + title + '</div></th>';
            } else {
                str_theader += '<th rowspan="' + rowspan + '" colspan="' + colspan + '"><div class="duty_cell">' + title + '</div></th>';
            };
        };
        $("#dutyTheader").html(str_theader);

        http({
            url: urls.dutyRecords,
            data: {
                Type: grade_type,
                time: date
            },
            success: function (res) {
                var data = res.data;
                theads = data.thead;
                var size = theads.length;
                if (size == 0) {
                    $("#buoy").hide();
                } else {
                    $("#buoy").show();
                    $("#buoy").attr("colspan", size);
                };
                var buoy_th = grade_type != 4 ? '<th><div class="duty_cell">近岸</div></th><th><div class="duty_cell">远洋</div></th>' : "";
                // var buoy_th = '<th><div class="duty_cell">近岸</div></th><th><div class="duty_cell">远洋</div></th>';
                for (var i = 0; i < theads.length; i++) {
                    buoy_th += '<th><div class="duty_cell">' + theads[i].site + '</div></th>';
                };
                $("#dutyThead").html(buoy_th);

                var colspan = size + 9;
                var tr = '';
                for (var j = 0; j < duty.length; j++) {
                    var dutyItem = duty[j];
                    var time = dutyItem.time;
                    var code = dutyItem.code;

                    var str_td = '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_shipin"></div></td>' +
                        '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_leida"></div></td>' +
                        '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_gnss"></div></td>' +
                        '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_jinan"></div></td>' +
                        '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_yuanyang"></div></td>';

                    var shipu_td = '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_shipin"></div></td>' +
                        '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_leida"></div></td>' +
                        '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_boduanleida"></div></td>' +
                        '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_gnss"></div></td>' +
                        '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_yujingtai"></div></td>';

                    var zhenhai_td = '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_shipin"></div></td>' +
                        '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_gnss"></div></td>' +
                        '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_jinan"></div></td>' +
                        '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_yuanyang"></div></td>';


                    var td = grade_type == 4 ? shipu_td : grade_type == 5 ? zhenhai_td : str_td;
                    td = '<td><div class="duty_cell">' + time + '</div></td>' + td;

                    for (var k = 0; k < theads.length; k++) {
                        var id = theads[k].id;
                        td += '<td><div class="duty_cell"><input type="text" id="' + code + '_' + id + '" class="layui-input"></div></td>';
                    };

                    if (dutyItem.type == "text") {
                        if (dutyItem.border == 'none') {
                            td += '<td class="none"><div class="duty_cell">' + dutyItem.text + '</div></div></td>';
                        } else {
                            td += '<td><div class="duty_cell">' + dutyItem.text + '</div></div></td>';
                        };
                        tr += '<tr>' + td + '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_other"></div></td></tr>';
                    }
                    if (dutyItem.type == "input") {
                        var id = dutyItem.id;
                        if (dutyItem.border == 'none') {
                            td += '<td class="none"><div class="duty_cell"><input type="text" class="layui-input" id="' + id + '"></div></td>';
                        } else {
                            td += '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + id + '"></div></td>';
                        };
                        tr += '<tr>' + td + '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_other"></div></td></tr>';
                    }
                    if (dutyItem.type == "checkbox") {
                        td = '<td><div class="duty_cell">21-07时</div></td>' +
                            '<td colspan="2">正常<input type="checkbox" id="dutyAbnormal">不正常<input type="checkbox"  id="dutynormal"></td>' +
                            '<td colspan="' + colspan + '"><div class="duty_cell"><input type="text" class="layui-input" id="dutyRemarks"></div></td>';
                        tr += '<tr>' + td + '</tr>';
                    }

                    if (dutyItem.type == null) {
                        td += '<td><div class="duty_cell">— —</div></td>';
                        tr += '<tr>' + td + '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_other"></div></td></tr>';
                    };
                };
                $("#dutyTbody").html(tr);

                var tbody = data.tbody;
                for (var item in tbody) {
                    $("#" + item).val(tbody[item]);
                };

                var checked = data.checked;
                if (checked == 1) {
                    $("#dutyAbnormal").attr("checked", true)
                }
                if (checked == 2) {
                    $("#dutynormal").attr("checked", true)
                }
                if (checked == 3) {
                    $("#dutyAbnormal").attr("checked", true)
                    $("#dutynormal").attr("checked", true)
                }

                var dutyDesc = data.dutyDesc;
                $("#dutyDesc").val(dutyDesc);
            }
        });
    };

    var grade_type = "", date = '';
    var getTime = function () {
        http({
            url: urls.getRecord,
            data: {
                Type: grade_type
            },
            success: function (res) {
                var data = res.data, option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i] + '">' + data[i] + '</option>';
                };
                $("#time").html(option);
                date = data.length ? data[0] : "";

                getTable();
                getDuty();
                form.render();
            }
        });
    };
    var personnelCenter = function () {
        http({
            url: urls.personnelCenter,
            success: function (res) {
                var data = res.data, option = '';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i].fields;
                    option += '<option value="' + data[i].pk + '">' + dataItem.section + '</option>';
                };
                $("#grade").html(option);
                grade_type = data.length ? data[0].pk : "";
                form.render();
                getTime();
            }
        });
    };
    personnelCenter();
    //下拉框
    form.on('select(grade)', function (data) {
        grade_type = data.value;
        getTime();
    });

    // 点击查询
    form.on('submit(querybtn)', function (data) {
        date = data.field.time;
        getTable();
        getDuty();
    });
    // 保存表1
    var submitTable = function () {
        var tbody = {};
        for (var j = 0; j < cols.length; j++) {
            for (var k = 0; k < thead.length; k++) {
                var wl_key = "wl_" + cols[j] + "_" + thead[k].id;
                var ws_key = "ws_" + cols[j] + "_" + thead[k].id;
                tbody[wl_key] = $("#" + wl_key).val();
                tbody[ws_key] = $("#" + ws_key).val();
            };
        };
        tbody = JSON.stringify(tbody);

        var checked = 0;
        if ($("#abnormal").is(":checked")) {
            checked = 1;
        }
        if ($("#normal").is(":checked")) {
            checked = 2;
        }
        if ($("#abnormal").is(":checked") && $("#normal").is(":checked")) {
            checked = 3;
        }
        var recordTime = $("#recordTime").html();
        var remarks = $("#remarks").val();
        var desc = $("#desc").val();
        var onNight = $("#onNight").attr("src");
        var onDay = $("#onDay").attr("src");

        var head = JSON.stringify(thead);
        var data = {
            Type: grade_type,
            time: date,
            thead: head,
            tbody: tbody,
            recordTime: recordTime,
            remarks: remarks,
            checked: checked,
            onNight: onNight,
            onDay: onDay,
            desc: desc
        };
        http({
            url: urls.dutyRecord,
            type: "post",
            data: data,
            success: function (res) {
                // layer.msg(res.msg)
            }
        });
    };
    // 保存表2
    var submitDuty = function () {
        var tbody = {};
        $("#dutyTbody .layui-input").each(function () {
            var key = $(this).attr("id"),
                val = $(this).val();
            tbody[key] = val;
        });
        tbody = JSON.stringify(tbody);
        var head = JSON.stringify(theads);

        var checked = 0;
        if ($("#dutyAbnormal").is(":checked")) {
            checked = 1;
        }
        if ($("#dutynormal").is(":checked")) {
            checked = 2;
        }
        if ($("#dutyAbnormal").is(":checked") && $("#dutynormal").is(":checked")) {
            checked = 3;
        }
        var dutyDesc = $("#dutyDesc").val();
        var data = {
            Type: grade_type,
            time: date,
            thead: head,
            tbody: tbody,
            checked: checked,
            dutyDesc: dutyDesc
        };
        http({
            url: urls.dutyRecords,
            type: "post",
            data: data,
            success: function (res) {
                // layer.msg(res.msg)
            }
        });
    };
    form.on('submit(subbtn)', function () {
        submitTable();
        submitDuty();
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
