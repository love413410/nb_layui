
layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var $ = layui.$,
        form = layui.form,
        layer = layui.layer;

    var time = '1995-02-10';
    function getTime() {
        http({
            url: urls.getInspection,
            success: function (res) {
                var data = res.data, option = '<option value="1995-02-10">默认</option>';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i] + '">' + data[i] + '</option>';
                };
                $("#time").html(option);
                form.val('example', {
                    time: time
                });
                form.render();
                getDataFn();
            }
        });
    };
    getTime();
    function getDataFn() {
        http({
            url: urls.inspection,
            data: { time: time },
            success: function (res) {
                $("#table").html(res.data);
            }
        });
    };
    // 查询
    form.on('submit(query)', function (data) {
        time = data.field.time;
        layer.msg('查询后内容会覆盖当前模版,请谨慎操作', {
            time: 5000,
            shade: 0.5,
            btn: ['查询', '取消'],
            yes: function () {
                layer.close(layer.index);
                getDataFn();
            }
        });
    });
    // 保存
    form.on('submit(subbtn)', function () {
        var content = $("#table").formhtml();
        http({
            url: urls.inspection,
            type: "post",
            data: { content: content },
            success: function (res) {
                time = res.time;
                getTime();
                layer.msg(res.msg);
            }
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
    e("facility", {});
});

