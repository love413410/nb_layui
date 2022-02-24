layui.define(["http", "getFn"], function (e) {
    var http = layui.http,
        urls = layui.urls,
        getFn = layui.getFn;

    var form = layui.form;

    var id = getFn.locaStr('id');
    function getDetaFn() {
        http({
            url: urls.parameterDeta,
            data: { id: id },
            success: function (res) {
                var data = res.data.fields;
                form.val('changeForm', {
                    "id": res.data.pk,
                    "element": data.element,
                    "up": data.up,
                    "down": data.down,
                    "wave": data.wave
                });
            }
        });
    };
    getDetaFn();
    form.on('submit(subbtn)', function (data) {
        var data = data.field;
        http({
            url: urls.parameterChange,
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
    e("systemCallChange", {});
});
