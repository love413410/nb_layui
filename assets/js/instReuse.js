layui.define(["http", "tabList"], function (e) {
    var store = layui.store;

    var http = layui.http,
        urls = layui.urls,
        tabList = layui.tabList;

    var $ = layui.$,
        form = layui.form,
        table = layui.table;

    var retrType = '', retrSite = 0;
    function getRetrFn() {
        http({
            url: urls.toolType,
            async: false,
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    str += '<option value="' + dataItem.value + '">' + dataItem.name + '</option>';
                };
                retrType = data.length > 0 ? data[0].value : "";
                $("#type").html(str);
                getUseSite();
            }
        });

    };
    getRetrFn();
    form.on('select(retrType)', function (data) {
        retrType = data.value;
        getUseSite();
    });

    function getUseSite() {
        http({
            url: urls.useSite,
            data: { id: retrType },
            success: function (res) {
                var data = res.data, str = '<option value="' + retrSite + '">全部</option>';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    str += '<option value="' + dataItem.value + '">' + dataItem.name + '</option>';
                };
                $("#station").html(str);
                form.render("select");
                getListFn();
            }
        });
    };
    form.on('select(retrSite)', function (data) {
        retrSite = data.value;
        getListFn();
    });

    var tableIns, page = 1;
    function getListFn() {
        tableIns = tabList.render({
            url: urls.useList,
            method: "post",
            where: { type: retrType, station: retrSite },
            cols: [[
                { title: '站点', templet: function (item) { return item.fields.ofStation; } },
                { title: '启用日期', templet: function (item) { return item.fields.outTime; } },
                { title: '到期日期', templet: function (item) { return item.fields.expireTime; } },
                { title: '供应商', templet: function (item) { return item.fields.supplier; } },
                { title: '型号', templet: function (item) { return item.fields.Type; } },
                { title: '编号', templet: function (item) { return item.fields.serialNumber; } },
                { title: '更换人员', templet: function (item) { return item.fields.outPeople; } },
                { title: '备注', templet: function (item) { return item.fields.usRemark; } },
                { fixed: 'right', align: "center", title: '操作', minWidth: 120, toolbar: '#toolbar' }
            ]],
            page: 1,
            done: function (data, curr) { page = curr; }
        });
    };
    // 重载当前页面
    window.ReLoadFn = function () {
        layer.closeAll(function () {
            tableIns.reload({
                page: { curr: page }
            });
        });
    };

    function layAlertFn(title, content, width, height) {
        width = width || "680px", height = height || "530px";
        layer.open({
            type: 2,
            title: title,
            resize: !1,
            skin: "layui_layer",
            id: "instObs",
            area: [width, height],
            offset: "50px",
            content: content
        });
    };

    var clickMethod = {
        // check: function (id) {
        //     var url = store.filterUrl("instReuseCheck") + "?id=" + id;
        //     layAlertFn("校验信息", url);
        // },
        // contrast: function (id) {
        //     var url = store.filterUrl("instReuseContrast") + "?id=" + id;
        //     layAlertFn("对比信息", url);
        // },
        // replace: function (id) {
        //     var url = store.filterUrl("instReusePart") + "?id=" + id;
        //     layAlertFn("更换零部件", url, "680px", "430px");
        // },

        // checkList: function (id) {
        //     var url = store.filterUrl("instCheckList") + "?id=" + id;
        //     layAlertFn("校验记录", url, "680px", "575px");
        // },
        // contrastList: function (id) {
        //     var url = store.filterUrl("instContrastList") + "?id=" + id;
        //     layAlertFn("对比记录", url, '680px', '575px');
        // },
        // partList: function (id) {
        //     var url = store.filterUrl("instPartList") + "?id=" + id;
        //     layAlertFn("更换零部件记录", url, '680px', '575px');
        // },
    };
    var dataId, initValue;
    table.on('tool(table)', function (data) {
        var event = data.event;
        dataId = data.data.pk;
        initValue = [data.data.fields.savePath];
        if (event == 'entr') {
            layer.open({
                type: 1,
                title: "归还",
                resize: !1,
                skin: "layui_layer",
                id: "out",
                offset: "50px",
                content: $("#instReuseEnter"),
                success: function () {
                    getPathFn();
                }
            });
        }
        if (event == 'edit') {
            var url = store.filterUrl("instReuseChange") + "?id=" + dataId + "";
            layAlertFn("修改在用设备", url, "680px", "550px");
        }
    });

    function getPathFn() {
        http({
            url: urls.useType,
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    if (i == 0) {
                        str += '<input type="radio" name="state" value="' + dataItem.id + '" title="' + dataItem.title + '" checked>';
                    } else {
                        str += '<input type="radio" name="state" value="' + dataItem.id + '" title="' + dataItem.title + '">';
                    };
                };
                $("#state").html(str);
                form.render("radio");
            }
        });
        http({
            url: urls.toolType,
            type: "post",
            success: function (res) {
                var data = res.data;

                xmSelect.render({
                    el: '#savePath',
                    radio: true,
                    clickClose: true,
                    filterable: true,
                    initValue: initValue,
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

    form.on('submit(subbtn)', function (data) {
        var data = data.field;
        data.id = dataId;
        http({
            url: urls.useEnter,
            type: "post",
            data: data,
            success: function (res) {
                layer.msg(res.msg, {
                    time: 1500
                }, function () {
                    ReLoadFn();
                });
            }
        });
        return false;
    });
    e("instReuse", {})
});
