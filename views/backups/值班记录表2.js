layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var form = layui.form;

    var grade = sessionStorage.grade;

    if (grade == 4) {
        $("#saveBtn").css("display", "inline-block");
    } else {
        $(".readonly").css("display", "inline-block");
    };

    function getTime() {
        http({
            url: urls.getRecord,
            data: {
                type: "content2"
            },
            success: function (res) {
                var data = res.data, option = '<option value="">默认</option>';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i] + '">' + data[i] + '</option>';
                };
                $("#time").html(option);
                form.render();
            }
        });
    };
    getTime();

    var time = '';
    function getDataFn() {
        http({
            url: urls.record,
            data: {
                type: "content2",
                time: time
            },
            success: function (res) {
                var data = res.data;
                $("#table").html(data);
            }
        });
    };
    getDataFn();
    // 查询
    form.on('submit(lookup)', function (data) {
        time = data.field.time;
        getDataFn();
    });
    // 保存
    form.on('submit(saveBtn)', function (data) {
        var content = $("#table").html();
        var normal = $("#normal").is(':checked'),
            abnormal = $("#abnormal").is(':checked');
        var html = $("#textarea").val();

        content = normal ? content.replace('id="normal"', 'id="normal" checked') : content;
        content = abnormal ? content.replace('id="abnormal"', 'id="normal" checked') : content;
        content = html.length > 0 ? content.replace('<textarea class="layui-textarea" id="textarea"></textarea>', '<textarea class="layui-textarea" id="textarea">' + html + '</textarea>') : content;
        http({
            url: urls.record,
            type: 'post',
            data: {
                type: "content2",
                content: content
            },
            success: function (res) {
                layer.msg(res.msg);
            }
        });
    });
    // 打印
    var baseUrl = sessionStorage.baseFileUrl;
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
            $("#table").print({
                stylesheet: [layuiCss, dutyTable],
                deferred: $.Deferred().done(function () {
                    // console.log('Printing done', arguments); 
                })
            });
        });
    });
    e("duty", {})
});
