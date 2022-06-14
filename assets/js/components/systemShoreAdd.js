layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var form = layui.form;

    form.on('submit(subbtn)', function (data) {
        var data = data.field;
        http({
            url: urls.sectionAdd,
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
    });

    e("systemShoreAdd", {})
});
