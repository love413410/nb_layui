
layui.define(["http", "getFn"], function (e) {

    var http = layui.http,
        urls = layui.urls,
        getFn = layui.getFn;

    var form = layui.form,
        laydate = layui.laydate;

    var id = getFn.locaStr('id');

    var date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    var value = date.toJSON().substr(0, 19).replace(/T/g, ' ');

    laydate.render({
        elem: "#time",
        type: 'datetime',
        trigger: 'click',
        value: value,
        btns: ['now', 'confirm']
    });

    // 提交
    form.on('submit(addBtn)', function (data) {
        data = data.field;
        data.id = id;
        http({
            url: urls.usePart,
            type: 'post',
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
    e("instReusePart", {})
});
