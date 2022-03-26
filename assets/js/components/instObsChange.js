layui.define(["http", "getFn"], function (e) {
    var http = layui.http,
        urls = layui.urls,
        getFn = layui.getFn;

    var form = layui.form,
        laydate = layui.laydate;

    var id = getFn.locaStr('id');

    laydate.render({
        elem: "#stockTime",
        trigger: 'click',
        max: 0
    });

    function getDetaFn() {
        http({
            url: urls.testDetail,
            data: { id: id },
            success: function (res) {
                var data = res.data.fields;
                form.val('example', {
                    "id": res.data.pk,
                    "stockTime": data.stockTime,
                    "supplier": data.supplier,
                    "Type": data.Type,
                    "serialNumber": data.serialNumber,
                    "remark": data.remark
                });
                getToolType(data.instrumentName, data.state, data.savePath);
            }
        });
    };
    getDetaFn();

    function getToolType(instrumentName, state, savePath) {
        http({
            url: urls.toolType,
            async: false,
            success: function (res) {
                var data = res.data;
                var xm1 = xmSelect.render({
                    el: '#instrumentName',
                    name: "instrumentName",
                    disabled: true,
                    model: {
                        icon: 'hidden',
                        label: {
                            type: 'text',
                        }
                    },
                    data: data
                });
                xm1.setValue([instrumentName]);
            }
        });
        http({
            url: urls.toolState,
            success: function (res) {
                var data = res.data;
                var xm2 = xmSelect.render({
                    el: '#state',
                    radio: true,
                    clickClose: true,
                    tips: "请选择仪器状态",
                    name: "state",
                    layVerify: 'required',
                    layVerType: 'msg',
                    layReqText: '请选择仪器状态',
                    model: {
                        icon: 'hidden',
                        label: {
                            type: 'text',
                        }
                    },
                    data: data
                });
                xm2.setValue([state]);
            }
        });
        http({
            url: urls.toolType,
            type: "post",
            success: function (res) {
                var data = res.data;
                var xm3 = xmSelect.render({
                    el: '#savePath',
                    radio: true,
                    clickClose: true,
                    filterable: true,
                    tips: "请选择或输入库房",
                    name: "savePath",
                    layVerify: 'required',
                    layVerType: 'msg',
                    layReqText: '请选择或输入库房',
                    model: {
                        icon: 'hidden',
                        label: {
                            type: 'text',
                        }
                    },
                    data: data,
                    create: function (val, arr) {
                        if (arr.length === 0) {
                            return {
                                name: '添加新库房-' + val,
                                value: val
                            }
                        }
                    }
                });
                xm3.setValue([savePath]);
            }
        });
    };

    form.on('submit(subbtn)', function (data) {
        var data = data.field;
        http({
            url: urls.testChange,
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
