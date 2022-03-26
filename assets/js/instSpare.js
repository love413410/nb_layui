layui.define(["http", "tabList"], function (e) {
    var store = layui.store;

    var http = layui.http,
        urls = layui.urls,
        tabList = layui.tabList;

    var $ = layui.$,
        form = layui.form,
        table = layui.table;

    var retrType = "";
    function getRetrType() {
        http({
            url: urls.toolType,
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    str += '<option value="' + dataItem.value + '">' + dataItem.name + '</option>';
                };
                retrType = data.length > 0 ? data[0].value : "";
                $("#type").html(str);
                form.render('select');
                getListFn();
            }
        });
    };
    getRetrType();
    // 选择下拉之后发起查询
    form.on('select(retrSelect)', function (data) {
        retrType = data.value;
        getListFn();
    });
    var tableIns, page = 1;
    function getListFn() {
        tableIns = tabList.render({
            url: urls.toolList,
            where: { type: retrType },
            cols: [[
                { title: '名称', templet: function (item) { return item.fields.instrumentName; } },
                { title: '状态', templet: function (item) { return item.fields.state; } },
                { title: '采购日期', templet: function (item) { return item.fields.stockTime; } },
                { title: '供应商', templet: function (item) { return item.fields.supplier; } },
                { title: '型号', templet: function (item) { return item.fields.Type; } },
                { title: '编号', templet: function (item) { return item.fields.serialNumber; } },
                { title: '存放位置', templet: function (item) { return item.fields.savePath; } },
                { title: '备注', templet: function (item) { return item.fields.remark; } },
                { fixed: 'right', align: "center", title: '操作', minWidth: 260, toolbar: '#toolbar' }
            ]],
            page: 1,
            done: function (data, curr) { page = curr; }
        });
    };
    // 重新加载
    window.ReLoadFn = function () {
        layer.closeAll(function () {
            getRetrType();
        });
    };

    // 重载当前页面
    // window.ReLoadFn = function () {
    //     layer.closeAll(function () {
    //         tableIns.reload({
    //             page: { curr: page }
    //         });
    //     });
    // };


    // 添加按钮
    form.on('submit(addBtn)', function () {
        var title = "添加备品备件", url = store.filterUrl("instSpareAdd");
        layAlertFn(title, url, "680px", "550px");
    });

    function layAlertFn(title, url, width, height) {
        layer.open({
            type: 2,
            title: title,
            resize: !1,
            skin: "layui_layer",
            id: "id",
            area: [width, height],
            offset: "50px",
            content: url
        });
    };

    var clickMethod = {
        edit: function () {
            var url = store.filterUrl("instSpareChange") + "?id=" + dataId + "";
            layAlertFn("修改备品备件", url, "680px", "550px");
        },
        record: function () {
            var url = store.filterUrl("instSpareRecord") + "?id=" + dataId + "";
            layAlertFn("流转记录", url, "680px", "575px");
        },
        out: function () {
            layer.open({
                type: 1,
                title: "出库",
                resize: !1,
                skin: "layui_layer",
                id: "out",
                offset: "50px",
                content: $("#instSpareOut")
            });
        },
        delete: deleFn
    };

    var dataId;
    table.on('tool(table)', function (data) {
        var event = data.event;
        dataId = data.data.pk;
        clickMethod[event]();
    });

    /*@@删除*/
    function deleFn() {
        layer.msg('此操作将永久删除该数据, 是否继续?', {
            time: 5000,
            shade: 0.5,
            btn: ['确定', '取消'],
            yes: function () {
                http({
                    url: urls.toolDelete,
                    type: 'post',
                    data: { id: dataId },
                    success: function (res) {
                        layer.msg(res.msg, {
                            time: 1500
                        }, function () {
                            ReLoadFn();
                        });
                    }
                });
            },
            btn2: function () {
                layer.msg('已取消删除。');
            }
        });
    };


    // 出库部分
    var typeId;
    function getTypeFn() {
        http({
            url: urls.siteType,
            success: function (res) {
                var data = res.data;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.Type + '</option>';
                };
                $("#sitetype").html(str);
                form.render();
                typeId = data.length > 0 ? data[0].pk : "";
                getSiteFn();
            }
        });
    };
    getTypeFn();
    form.on('select(siteType)', function (data) {
        typeId = data.value;
        getSiteFn();
    });
    function getSiteFn() {
        http({
            url: urls.dataList,
            data: { type: typeId },
            success: function (res) {
                var data = res.data;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.stationName + '</option>';
                };
                $("#site").html(str);
                form.render();
            }
        });
    };
    form.on('submit(subbtn)', function (data) {
        var data = data.field;
        data.id = dataId;
        http({
            url: urls.toolStock,
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
    e("instSpare", {})
});

