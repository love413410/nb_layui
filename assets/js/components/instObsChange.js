layui.define(["http", "utils", "getFn"], function (e) {
    var http = layui.http,
        urls = layui.urls,
        utils = layui.utils,
        getFn = layui.getFn;

    var $ = layui.$,
        form = layui.form,
        laydate = layui.laydate;

    var instObsState = utils.instObsState;

    var id = getFn.locaStr('id');

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
                var state = '';
                for (var j = 0; j < instObsState.length; j++) {
                    state += '<option value="' + instObsState[j].id + '">' + instObsState[j].title + '</option>';
                };
                $("#state").html(state);
                form.render();
                getDetails();
            }
        });
        function getDetails() {
            http({
                url: urls.instChange,
                data: { id: id },
                success: function (res) {
                    var data = res.data.fields;
                    form.val('example', {
                        "id": res.data.pk,
                        "Type": data.Type,
                        "state": data.state,
                        "stockTime": data.stockTime,
                        "supplier": data.supplier,
                        "price": data.price,
                        "instrumentModel": data.instrumentModel,
                        "instrumentNumber": data.instrumentNumber,
                        "internalNum": data.internalNum,
                        "savePath": data.savePath,
                        "remark": data.remark,
                    });
                }
            });
        };
    };
    instType();

    form.on('submit(subbtn)', function (data) {
        var data = data.field;
        http({
            url: urls.instChange,
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

    e("instObsChange", {})
});
