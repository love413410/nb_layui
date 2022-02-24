layui.define(["http", "utils", "tabList"], function (e) {
    var store = layui.store,
        utils = layui.utils;

    var http = layui.http,
        urls = layui.urls,
        tabList = layui.tabList;

    var $ = layui.$,
        form = layui.form,
        table = layui.table,
        dropdown = layui.dropdown;

    var instObsState = utils.instObsState;

    var grade = utils.grade,
        action = utils.locaStr("action");
    var result = utils.differ(store.getSessionData("grade"), grade[action]);

    var cols = [{
        title: '仪器状态',
        templet: function (item) {
            var state = item.fields.state;
            var html = '<span style="color:' + instObsState[state].color + '">' + instObsState[state].title + '</span>';
            return html;
        }
    },
    { title: '采购时间', templet: function (item) { return item.fields.stockTime; } },
    { title: '供应商', templet: function (item) { return item.fields.supplier; } },
    { title: '价格', templet: function (item) { return item.fields.price; } },
    { title: '型号', templet: function (item) { return item.fields.instrumentModel; } },
    { title: '序列号', templet: function (item) { return item.fields.instrumentNumber; } },
    { title: '内部编号', templet: function (item) { return item.fields.internalNum; } },
    { title: '存放位置', templet: function (item) { return item.fields.savePath; } },
    { title: '备注', templet: function (item) { return item.fields.remark; } }];
    if (result) {
        cols.push({
            fixed: 'right',
            align: "center",
            title: '操作',
            minWidth: 220,
            toolbar: '#toolbar'
        });
        $("[name=ctrBtn]").show();
    }

    var tableIns, retrName = '0', page = 1;

    function instType() {
        http({
            url: urls.instType,
            success: function (res) {
                var data = res.data, str = '<option value="0">全部</option>';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
                };
                $("#insttype").html(str);
                form.render();
                getListFn();
            }
        });
    };
    instType();

    function getListFn() {
        tableIns = tabList.render({
            url: urls.instList,
            where: { type: retrName },
            cols: [cols],
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
    // 查询按钮
    form.on('submit(subBtn)', function (data) {
        type = data.field.type;
        retrName = data.field.retrName;
        getListFn();
    });
    // 添加按钮
    form.on('submit(addBtn)', function () {
        var title = "添加仪器", url = store.filterUrl("instObsAdd");
        layAlertFn(title, url, "680px", "640px");
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
        del: deleFn,

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
    };

    table.on('tool(table)', function (data) {
        var event = data.event;
        var id = data.data.pk;

        if (event == 'edit') {
            var title = "修改仪器", url = store.filterUrl("instObsChange") + "?id=" + id + "";
            layAlertFn(title, url, "680px", "640px");
        }
        if (event == 'query') {
            dropdown.render({
                elem: this,
                show: true,
                data: [
                    { title: '校验记录', id: 'checkList' },
                    { title: '对比记录', id: 'contrastList' },
                    { title: '更换零部件记录', id: 'partList' }
                ],
                click: function (menudata) {
                    clickMethod[menudata.id](id);
                }
            })

        }
        if (event == 'more') {
            dropdown.render({
                elem: this,
                show: true,
                data: [
                    { title: '出库', id: 'out' },
                    { title: '记录表', id: 'record' },
                    { title: '删除', id: 'del' }
                ],
                click: function (menudata) {
                    clickMethod[menudata.id](id);
                }
            })
        }
    });

    /*删除*/
    function deleFn(id) {
        layer.msg('此操作将永久删除该数据, 是否继续?', {
            time: 5000,
            shade: 0.5,
            btn: ['确定', '取消'],
            yes: function () {
                http({
                    url: urls.instDelete,
                    type: 'post',
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
            btn2: function () {
                layer.msg('已取消删除。');
            }
        });
    };
    e("instObs", {})
});
