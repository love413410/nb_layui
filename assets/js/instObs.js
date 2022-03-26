layui.define(["http", "utils", "tabList"], function (e) {
    var store = layui.store;

    var http = layui.http,
        urls = layui.urls,
        tabList = layui.tabList;

    var $ = layui.$,
        form = layui.form,
        table = layui.table,
        dropdown = layui.dropdown;

    var retrType = '';
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
            url: urls.testList,
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
                { fixed: 'right', align: "center", title: '操作', minWidth: 120, toolbar: '#toolbar' }
            ]],
            page: 1,
            done: function (data, curr) { page = curr; }
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
    window.ReLoadFn = function () {
        layer.closeAll(function () {
            getRetrType();
        });
    };
    // 添加按钮
    form.on('submit(addBtn)', function () {
        var title = "修改比测仪器", url = store.filterUrl("instObsAdd");
        layAlertFn(title, url, "680px", "550px");
    });

    function layAlertFn(title, url, width, height) {
        layer.open({
            type: 2,
            title: title,
            resize: !1,
            skin: "layui_layer",
            id: "instObs",
            area: [width, height],
            offset: "50px",
            content: url
        });
    };
    var clickMethod = {
        out: function (id) {
            http({
                url: urls.toolStock,
                data: { id: id },
                success: function (res) {
                    layer.msg(res.msg, {
                        time: 1500
                    }, function () {
                        ReLoadFn();
                    });
                }
            });
        },
        record: function (id) {
            var url = store.filterUrl("instObsRecord") + "?id=" + id + "";
            layAlertFn("出入库记录", url, "700px", "595px");
        },
        checkList: function (id) {
            var url = store.filterUrl("instCheckList") + "?id=" + id;
            layAlertFn("校验记录", url, "680px", "575px");
        },
        contrastList: function (id) {
            var url = store.filterUrl("instContrastList") + "?id=" + id;
            layAlertFn("对比记录", url, '680px', '575px');
        },
        partList: function (id) {
            var url = store.filterUrl("instPartList") + "?id=" + id;
            layAlertFn("更换零部件记录", url, '680px', '575px');
        },

        edit:function(){
            var title = "修改比测仪器", url = store.filterUrl("instObsChange") + "?id=" + dataId + "";
            layAlertFn(title, url, "680px", "550px");
        },
        delete: deleFn,
    };
    var dataId;
    table.on('tool(table)', function (data) {
        var event = data.event;
        dataId = data.data.pk;
        clickMethod[event]();
        // if (event == 'query') {
        //     dropdown.render({
        //         elem: this,
        //         show: true,
        //         data: [
        //             { title: '校验记录', id: 'checkList' },
        //             { title: '对比记录', id: 'contrastList' },
        //             { title: '更换零部件记录', id: 'partList' }
        //         ],
        //         click: function (menudata) {
        //             clickMethod[menudata.id](id);
        //         }
        //     })
        // }
        // if (event == 'more') {
        //     dropdown.render({
        //         elem: this,
        //         show: true,
        //         data: [
        //             { title: '出库', id: 'out' },
        //             { title: '删除', id: 'del' }
        //         ],
        //         click: function (menudata) {
        //             clickMethod[menudata.id](id);
        //         }
        //     })
        // }
    });

    /*删除*/
    function deleFn() {
        layer.msg('此操作将永久删除该数据, 是否继续?', {
            time: 5000,
            shade: 0.5,
            btn: ['确定', '取消'],
            yes: function () {
                http({
                    url: urls.testDelete,
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
    e("instObs", {})
});
