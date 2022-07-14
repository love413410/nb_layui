layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var $ = layui.$;

    // var date = new Date();
    // var hour = date.getHours();

    // var time = new Date().getTime();
    // time = hour >= 17 ? time + 24 * 60 * 60 * 1000 : time;

    // date = new Date(time);
    // var year = date.getFullYear();
    // var month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
    // var day = (date.getDate()) > 10 ? (date.getDate()) : '0' + (date.getDate());
    // date = year + '-' + month + '-' + day;
    // hour = hour < 10 ? "0" + hour : hour;
    // hour = 21;

    var onNight = [], onDay = [];
    var img_type = "onNight";

    var imgLayer = function () {
        layer.open({
            type: 1,
            title: "值班签名管理",
            resize: !1,
            skin: "layui_layer",
            area: ["300px", "400px"],
            offset: "50px",
            content: $("#img_layer"),
            success: function () {
                var data = img_type == "onNight" ? onNight : onDay;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<div class="layui-form-item">' +
                        '<div class="layui-inline img_box">' +
                        '<img src="' + data[i] + '" class="item_img" />' +
                        '</div>' +
                        '<div class="layui-inline"> <button class="layui-btn layui-btn-sm" index="' + i + '">删除</button></div>' +
                        '</div>';
                };
                $("#imgList").html(str);
            },
            cancel:function(){
                $("#img_layer").hide();
            }
        });
    };
    $("#imgList").on("click", ".layui-btn", function () {
        var _this = $(this);
        var index = _this.attr("index");
        layer.msg('是否删除此签名?', {
            time: 5000,
            shade: 0.5,
            btn: ['确定', '取消'],
            yes: function () {
                var data = img_type == "onNight" ? onNight : onDay;
                var removeImg = img_type == "onNight" ? $("#onNightImg" + index) : $("#onDayImg" + index);
                data.splice(index, 1);
                removeImg.remove();
                _this.parents(".layui-form-item").remove();
                layer.close(layer.index);
            },
            btn2: function () {
                layer.msg('已取消删除。');
            }
        });
    });

    var hour = '';

    // getTable();
    // 表二
    var duty = {
        "17": { time: "17时", code: "site_17", at: "at_1", hu: "hu_1" },
        "18": { time: "18时", code: "site_18", at: "at_1", hu: "hu_1" },
        "19": { time: "19时", code: "site_19", at: "at_1", hu: "hu_1" },
        "20": { time: "20时", code: "site_20", at: "at_1", hu: "hu_1" },
        "08": { time: "08时", code: "site_08", at: "at_2", hu: "hu_2" },
        "09": { time: "09时", code: "site_09", at: "at_2", hu: "hu_2" },
        "10": { time: "10时", code: "site_10", at: "at_2", hu: "hu_2" },
        "11": { time: "11时", code: "site_11", at: "at_2", hu: "hu_2" },
        "12": { time: "12时", code: "site_12", at: "at_2", hu: "hu_2" },
        "13": { time: "13时", code: "site_13", at: "at_3", hu: "hu_3" },
        "14": { time: "14时", code: "site_14", at: "at_3", hu: "hu_3" },
        "15": { time: "15时", code: "site_15", at: "at_3", hu: "hu_3" },
        "16": { time: "16时", code: "site_16", at: "at_3", hu: "hu_3" },
    };
    var theads = null;
    var getDuty = function () {
        http({
            url: urls.dutyRecords,
            data: { time: date },
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
                var buoy_th = '<th><div class="duty_cell">近岸</div></th><th><div class="duty_cell">远洋</div></th>';
                for (var i = 0; i < theads.length; i++) {
                    buoy_th += '<th><div class="duty_cell">' + theads[i].site + '</div></th>';
                };
                var dutyItem = duty[hour];
                if (dutyItem) {
                    if (dutyItem.at) {
                        buoy_th += '<th rowspan="2"><div class="duty_cell">温度</div></th><th rowspan="2"><div class="duty_cell">湿度</div></th>';
                    }
                }
                $("#dutyThead").html(buoy_th);

                var tr = '';
                var isIndex = cols.indexOf(hour);
                if (isIndex > -1) {
                    var time = dutyItem.time, code = dutyItem.code;
                    var td = '<td><div class="duty_cell">' + time + '</div></td>' +
                        '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_shipin"></div></td>' +
                        '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_leida"></div></td>' +
                        '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_gnss"></div></td>' +
                        '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_jinan"></div></td>' +
                        '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_yuanyang"></div></td>';

                    // var td = '<td><div class="duty_cell">' + time + '</div></td>' +
                    //     '<td><div class="duty_cell" id="' + code + '_shipin"></div></td>' +
                    //     '<td><div class="duty_cell" id="' + code + '_leida"></div></td>' +
                    //     '<td><div class="duty_cell" id="' + code + '_gnss"></div></td>' +
                    //     '<td><div class="duty_cell" id="' + code + '_jinan"></div></td>' +
                    //     '<td><div class="duty_cell" id="' + code + '_yuanyang"></div></td>';
                    for (var k = 0; k < theads.length; k++) {
                        var id = theads[k].id;
                        td += '<td><div class="duty_cell" id="' + code + '_' + id + '"></div></td>';
                    };
                    if (dutyItem.at) {
                        td += '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + dutyItem.at + '"></div></td>';
                        td += '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + dutyItem.hu + '"></div></td>';
                        $("#room").show();
                    } else {
                        $("#room").hide();
                    };
                    td += '<td><div class="duty_cell"><input type="text" class="layui-input" id="' + code + '_other"></div></td>';
                    tr += '<tr>' + td + '</tr>';
                    $("#explain").show();
                } else {
                    var colspan = size + 4;
                    var td = '<td><div class="duty_cell">21-07时</div></td>' +
                        '<td colspan="2">正常<input type="checkbox" id="dutyAbnormal">不正常<input type="checkbox"  id="dutynormal"></td>' +
                        '<td colspan="' + colspan + '"><div class="duty_cell"><input type="text" class="layui-input" id="dutyRemarks"></div></td>';
                    tr += '<tr>' + td + '</tr>';
                    $("#explain").hide();
                };
                $("#dutyTbody").html(tr);

                var tbody = data.tbody;
                for (var item in tbody) {
                    $("#" + item).val(tbody[item]);
                    $("#" + item).html(tbody[item]);
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
    // getDuty();
    // 表一
    var cols = "17,18,19,20,08,09,10,11,12,13,14,15,16";
    var thead = null;
    var getTable = function () {
        http({
            url: urls.dutyRecord,
            data: { time: date },
            success: function (res) {
                hour = res.nowHour;
                // hour = "22";
                var data = res.data;
                thead = data.thead;
                var lth = thead.length;
                var thead_str = '<td>时间</td><td>测点</td>';
                for (var i = 0; i < thead.length; i++) {
                    thead_str += '<td>' + thead[i].site + '</td>';
                };
                $("#thead").html(thead_str);
                var isIndex = cols.indexOf(hour);
                var col_tr = '';
                if (isIndex > -1) {
                    var wl = '<td rowspan="2">' + hour + '时</td><td>潮位</td>';
                    var ws = '<td>风速</td>';
                    for (var k = 0; k < thead.length; k++) {
                        wl += '<td><input type="text" id="wl_' + hour + '_' + thead[k].id + '" class="layui-input"></td>';
                        ws += '<td><input type="text" id="ws_' + hour + '_' + thead[k].id + '" class="layui-input"></td>';
                    }
                    // for (var k = 0; k < thead.length; k++) {
                    //     wl += '<td  id="wl_' + hour + '_' + thead[k].id + '"></td>';
                    //     ws += '<td  id="ws_' + hour + '_' + thead[k].id + '"></td>';
                    // };
                    col_tr += '<tr>' + wl + '</tr><tr>' + ws + '<tr>';
                } else {
                    var colspan = lth - 3;
                    col_tr += '<tr>' +
                        '<td>21-07时</td>' +
                        '<td colspan="2">正常<input type="checkbox" id="abnormal">不正常<input type="checkbox" id="normal"></td>' +
                        '<td colspan="' + colspan + '">' +
                        '<input type="text" id="remarks" class="layui-input">' +
                        '</td>' +
                        '</tr>';
                };
                $("#tbody").html(col_tr);

                var tbody = data.tbody;
                for (var item in tbody) {
                    $("#" + item).html(tbody[item]);
                    $("#" + item).val(tbody[item]);
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

                onNight = data.onNight;
                var onNight_str = "";
                // for (var o = 0; o < onNight.length; o++) {
                //     onNight_str += '<p>' +
                //         '<img src="' + onNight[o] + '">' +
                //         '<i class="layui-icon deleteImg" index="' + o + '">&#x1006;</i>' +
                //         '</p>'
                // };
                for (var o = 0; o < onNight.length; o++) {
                    onNight_str += '<p><img src="' + onNight[o] + '" id="onNightImg' + y + '"></p>'
                };
                $("#onNight").html(onNight_str);

                onDay = data.onDay;
                var onDay_str = "";
                // for (var y = 0; y < onDay.length; y++) {
                //     onDay_str += '<p>' +
                //         '<img src="' + onDay[y] + '">' +
                //         '<i class="layui-icon deleteImg" index="' + y + '">&#x1006;</i>' +
                //         '</p>'
                // };
                for (var y = 0; y < onDay.length; y++) {
                    onDay_str += '<p><img src="' + onDay[y] + '" id="onDayImg' + y + '"></p>'
                };
                $("#onDay").html(onDay_str);

                getDuty();//获取表2
            }
        });
    };

    var date = '';
    var getTime = function () {
        http({
            url: urls.getRecord,
            success: function (res) {
                var data = res.data;
                date = data.length ? data[0] : "";
                getTable();
            }
        });
    };
    getTime();
    
    $("#onNight").click(function () {
        img_type = "onNight";
        imgLayer();
    });
    $("#onDay").click(function () {
        img_type = "onDay";
        imgLayer();
    });

    // 保存表
    var submitTable = function () {
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

        var tbody = { remarks: remarks };
        for (var k = 0; k < thead.length; k++) {
            var key = 'ws_' + hour + '_' + thead[k].id;
            tbody[key] = $("#" + key).val();

            key = 'wl_' + hour + '_' + thead[k].id;
            tbody[key] = $("#" + key).val();
        };

        var tableData = {
            onDay: onDay,
            onNight: onNight,
            recordTime: recordTime,
            tbody: tbody,
            checked: checked,
            desc: desc
        };
        tbody = {};
        checked = 0;
        if ($("#dutyAbnormal").is(":checked")) {
            checked = 1;
        }
        if ($("#dutynormal").is(":checked")) {
            checked = 2;
        }
        if ($("#dutyAbnormal").is(":checked") && $("#dutynormal").is(":checked")) {
            checked = 3;
        }
        var dutyRemarks = $("#dutyRemarks").val();
        var dutyDesc = $("#dutyDesc").val();
        var dutyData = {
            checked: checked,
            dutyDesc: dutyDesc
        };
        var dutyItem = duty[hour];
        if (dutyItem) {
            var code = dutyItem.code;
            for (var i = 0; i < theads.length; i++) {
                var id = theads[i].id;
                var key = code + '_' + id;
                var val = $("#" + key).html();
                tbody[key] = val;

                key = code + '_other';
                val = $("#" + key).val();
                tbody[key] = val;
            };
            if (dutyItem.at) {
                key = dutyItem.at;
                val = $("#" + key).val();
                tbody[key] = val;
                key = dutyItem.hu;
                val = $("#" + key).val();
                tbody[key] = val;
            }
            var list = ["_shipin", "_leida", "_gnss", "_jinan", "_yuanyang"];
            for (var i = 0; i < list.length; i++) {
                var key = code + list[i];
                var val = $("#" + key).val();
                tbody[key] = val;
            };
        }
        tbody.dutyRemarks = dutyRemarks;
        dutyData.tbody = tbody;
        tableData = JSON.stringify(tableData);
        dutyData = JSON.stringify(dutyData);
        var data = {
            time: date,
            nowHour: hour,
            record1: tableData,
            record2: dutyData
        };

        http({
            url: urls.dutySign,
            type: "post",
            data: data,
            success: function () {
                getTable();
            }
        });
    };

    $("#sign").click(function () {
        submitTable();
    });
    e("step", {})
});
