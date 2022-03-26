layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var laydate = layui.laydate;

    laydate.render({
        elem: "#stockTime",
        type: 'datetime',
        trigger: 'click',
        max: 0
    });
    function getToolType() {
        var getInstNameData = function () {
            http({
                url: urls.toolType,
                success: function (res) {
                    var data = res.data;
                    data.length > 0 ? data[0].selected = true : "";
                    xmSelect.render({
                        el: '#instrumentName',
                        radio: true,
                        clickClose: true,
                        filterable: true,
                        tips: "请选择或输入名称",
                        name: "instrumentName",
                        layVerify: 'required',
                        layVerType: 'msg',
                        layReqText: '请选择或输入名称',
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
                                    name: '添加新名称-' + val,
                                    value: val
                                }
                            }
                        }
                    });
                }
            });
        };
        var getSavePathData = function () {
            http({
                url: urls.toolType,
                type: "post",
                success: function (res) {
                    var data = res.data;
                    data.length > 0 ? data[0].selected = true : "";

                    xmSelect.render({
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
                }
            });
        };
        var getStateData = function () {
            http({
                url: urls.toolState,
                success: function (res) {
                    var data = res.data;
                    data.length > 0 ? data[0].selected = true : "";
                    xmSelect.render({
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
                }
            });
        };
        getInstNameData();
        getSavePathData();
        getStateData();
    };
    getToolType();

    e("instSpareInit", {})
});
