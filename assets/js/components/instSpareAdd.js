layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var form = layui.form,
        laydate = layui.laydate;
        
    laydate.render({
        elem: "#stockTime",
        type: 'datetime',
        trigger: 'click',
        max: 0,
        btns: ['now', 'confirm']
    });

    form.on('submit(subbtn)', function (data) {
        var data = data.field;
        http({
            url: urls.deviceRegister,
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

    e("instSpareAdd", {})
});
