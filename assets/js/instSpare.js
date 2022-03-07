layui.define(["http", "tabList"], function (e) {
    var store = layui.store,
        utils = layui.utils;

    var http = layui.http,
        urls = layui.urls,
        tabList = layui.tabList;

    var $ = layui.$,
        form = layui.form,
        table = layui.table;

    var grade = utils.grade,
        action = utils.locaStr("action");
    var result = utils.differ(grade[action]);

    var cols = [
        { title: '名称', templet: function (item) { return item.fields.deviceName; } },
        { title: '采购时间', templet: function (item) { return item.fields.stockTime; } },
        { title: '类型', templet: function (item) { return item.fields.Type; } },
        { title: '供应商', templet: function (item) { return item.fields.supplier; } },
        { title: '型号', templet: function (item) { return item.fields.pattern; } },
        { title: '数量', templet: function (item) { return item.fields.totalNum; } },
        { title: '存放位置', templet: function (item) { return item.fields.savePath; } }
    ];
    if (result) {
        cols.push({
            fixed: 'right',
            align: "center",
            title: '操作',
            minWidth: 150,
            toolbar: '#toolbar'
        });
        $("[name=ctrBtn]").show();
    }

    var tableIns, type = $("#type").val(), retrName = '', page = 1;
    function getListFn() {
        tableIns = tabList.render({
            url: urls.deviceList,
            where: {
                type: type,
                name: retrName
            },
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
        type = data.field.type;
        retrName = data.field.retrName;
        getListFn();
    });

    // 添加按钮
    form.on('submit(addBtn)', function () {
        var title = "添加备品备件", url = store.filterUrl("instSpareAdd");
        layAlertFn(title, url, "680px", "520px");
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
        edit: function (id) {
            var url = store.filterUrl("instSpareChange") + "?id=" + id + "";
            layAlertFn("修改备品备件", url, "680px", "520px");
        },
        delete: deleFn
    };

    table.on('tool(table)', function (data) {
        var event = data.event;
        var id = data.data.pk;
        clickMethod[event](id);
    });

    /*@@删除*/
    function deleFn(id) {
        layer.msg('此操作将永久删除该数据, 是否继续?', {
            time: 5000,
            shade: 0.5,
            btn: ['确定', '取消'],
            yes: function () {
                http({
                    url: urls.deviceDelete,
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
    e("instSpare", {})
});

