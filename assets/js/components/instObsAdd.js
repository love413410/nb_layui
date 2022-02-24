layui.define(["http", "utils"], function (e) {
    var http = layui.http,
        urls = layui.urls,
        utils = layui.utils;

    var $ = layui.$,
        form = layui.form,
        laydate = layui.laydate;

    var instObsState = utils.instObsState;

    //初始化日期框
    laydate.render({
        elem: "#purchaseTime",
        type: 'datetime',
        trigger: 'click',
        max: 0,
        btns: ['now', 'confirm']
    });

    function instType() {
        http({
            url: urls.instType,
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
                };
                $("#insttype").html(str);
                form.render();
            }
        });
    };
    instType();

    form.on('submit(subbtn)', function (data) {
        var data = data.field;
        data.state = instObsState[0].id;
        http({
            url: urls.instAdd,
            type: "post",
            data: data,
            success: function (res) {
                layer.msg(res.msg, {
                    time: 1500
                }, function () {
                    parent.ReLoadFn();
                });
            }
        });
        return false;
    });

    e("instObsAdd", {})
});
