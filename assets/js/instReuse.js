layui.define(["http", "tabList"], function (e) {
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
    { title: '备注', templet: function (item) { return item.fields.remark; } }
    ];
    if (result) {
        cols.push({
            fixed: 'right',
            align: "center",
            title: '操作',
            minWidth: 200,
            toolbar: '#toolbar'
        });
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
            url: urls.useList,
            where: { type: retrName },
            cols: [cols],
            page: 1,
            done: function (data, curr) { page = curr; }
        });
    };
    getListFn();
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
        retrName = data.field.retrName;
        getListFn();
    });

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
        entr: function (id) {
            var url = store.filterUrl("instEntr") + "?id=" + id;
            layAlertFn("归还设备", url, "680px", "300px");
        },
        check: function (id) {
            var url = store.filterUrl("instReuseCheck") + "?id=" + id;
            layAlertFn("校验信息", url);
        },
        contrast: function (id) {
            var url = store.filterUrl("instReuseContrast") + "?id=" + id;
            layAlertFn("对比信息", url);
        },
        replace: function (id) {
            var url = store.filterUrl("instReusePart") + "?id=" + id;
            layAlertFn("更换零部件", url, "680px", "430px");
        }
    };

    table.on('tool(table)', function (data) {
        var event = data.event;
        var id = data.data.pk;
        if (event == 'entr') {
            dropdown.render({
                elem: this,
                show: true,
                data: instObsState,
                click: function (menudata) {
                    var state = menudata.id;
                    layer.msg('是否确认归还?', {
                        time: 5000,
                        shade: 0.5,
                        btn: ['确定', '取消'],
                        yes: function () {
                            http({
                                url: urls.useRecede,
                                type: 'post',
                                data: {
                                    id: id,
                                    state: state
                                },
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
                            layer.msg('已取消归还。');
                        }
                    })
                }
            });
        }
        if (event == 'more') {
            dropdown.render({
                elem: this,
                show: true,
                data: [
                    { title: '校验', id: 'check' },
                    { title: '对比', id: 'contrast' },
                    { title: '更换零部件', id: 'replace' }
                ],
                click: function (menudata) {
                    clickMethod[menudata.id](id);
                }
            });
        }
    });
    e("instReuse", {})
});
