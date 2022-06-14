layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls,
        getFn = layui.getFn;

    var form = layui.form;

    var id = getFn.locaStr('id'),
        section = getFn.locaStr('section');

    form.val('changeForm', {
        "id": id,
        "section": section
    });

    form.on('submit(subbtn)', function (data) {
        var data = data.field;
        http({
            url: urls.sectionChange,
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

    e("systemShoreChange", {})
});
