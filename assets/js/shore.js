layui.define(["http", "tabList"], function (e) {
    var store = layui.store;

    var urls = layui.urls,
        http = layui.http,
        tabList = layui.tabList;

    var $ = layui.$,
        form = layui.form,
        table = layui.table;

    window.getListFn = function () {
        tableIns = tabList.render({
            url: urls.sectionList,
            cols: [[
                { title: '岸段名', templet: function (item) { return item.fields.section; } },
                { fixed: 'right', align: "center", title: '操作', minWidth: 150, toolbar: '#toolbar' }
            ]],
            page: true,
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
    form.on('submit(subBtn)', function () {
        getListFn();
    });
    //添加按钮
    form.on('submit(addBtn)', function () {
        clickMethod['add']();
    });
    /*@@删除*/
    function deleFn() {
        layer.msg('此操作将永久删除该数据, 是否继续?', {
            time: 5000,
            shade: 0.5,
            btn: ['确定', '取消'],
            yes: function () {
                http({
                    url: urls.sectionDelete,
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
    function layAlertFn(title, url) {
        layer.open({
            type: 2,
            title: title,
            resize: !1,
            skin: "layui_layer",
            id: "id",
            area: ["650px", "200px"],
            offset: "50px",
            content: url
        });
    };

    var clickMethod = {
        add: function () {
            var title = "添加岸段", url = store.filterUrl("systemShoreAdd");
            layAlertFn(title, url);
        },
        edit: function () {
            var title = "修改岸段", url = store.filterUrl("systemShoreChange") + "?id=" + dataId + "&section=" + dataName;
            layAlertFn(title, url);
        },
        delete: deleFn
    };
    var dataId = '', dataName = '';
    table.on('tool(table)', function (data) {
        dataId = data.data.pk;
        dataName = data.data.fields.section;
        var event = data.event;
        clickMethod[event]();
    });
    e("shore", {})
});
