layui.define(["http", "getFn"], function (e) {
    var http = layui.http,
        urls = layui.urls,
        getFn = layui.getFn;

    var form = layui.form,
        laydate = layui.laydate;

    var id = getFn.locaStr('id');

    laydate.render({
        elem: "#stockTime",
        type: 'datetime',
        trigger: 'click',
        max: 0,
        btns: ['now', 'confirm']
    });

    function getDetaFn() {
        http({
            url: urls.deviceDetail,
            data: { id: id },
            success: function (res) {
                var data = res.data.fields;
                form.val('example', {
                    "id": res.data.pk,
                    "deviceName": data.deviceName,
                    "stockTime": data.stockTime,
                    "Type": data.Type,
                    "supplier": data.supplier,
                    "pattern": data.pattern,
                    "totalNum": data.totalNum,
                    "savePath": data.savePath
                });
            }
        });
    };
    getDetaFn();

    form.on('submit(subbtn)', function (data) {
        var data = data.field;
        http({
            url: urls.deviceChange,
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

    e("instSpareChange", {})
});
