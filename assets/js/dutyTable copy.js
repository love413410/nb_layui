layui.define(["http", "utils"], function (e) {
    var store = layui.store,
        utils = layui.utils;

    var http = layui.http,
        urls = layui.urls;

    var form = layui.form;

    var grade = store.getSessionData("grade");

    var grade = utils.grade,
        action = utils.locaStr("action");
    var result = utils.differ(store.getSessionData("grade"), grade[action]);

    if (result) {
        $("#saveBtn").css("display", "inline-block");
    } else {
        $(".readonly").css("display", "inline-block");
    };
    function getTime() {
        http({
            url: urls.getRecord,
            data: {
                type: "content1"
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
                $("#printContents").html(data);
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

    e("dutyTable", {})
});
