layui.define(["http", "tabList"], function (e) {
    var store = layui.store;

    var http = layui.http,
        urls = layui.urls,
        tabList = layui.tabList;

    var form = layui.form,
        table = layui.table;

    var tableIns, retrName = '', page = 1;
    window.getListFn = function () {
        tableIns = tabList.render({
            url: urls.personnelList,
            where: { name: retrName },
            cols: [[
                { title: '姓名', templet: function (item) { return item.fields.personnel; } },
                {
                    title: '性别', templet: function (item) {
                        var gender = item.fields.gender;
                        return gender == 1 ? "男" : "女";
                    }
                },
                { title: '手机号', templet: function (item) { return item.fields.mobile; } },
                { title: '备注', templet: function (item) { return item.fields.remark; } },
                { fixed: 'right', align: "center", title: '操作', toolbar: '#toolbar' }
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
    form.on('submit(subBtn)', function (data) {
        retrName = data.field.retrName;
        getListFn();
    });
    form.on('submit(addBtn)', function (data) {
        clickMethod['add']();
    });

    function deleFn() {
        layer.msg('此操作将永久删除该数据, 是否继续?', {
            time: 5000,
            shade: 0.5,
            btn: ['确定', '取消'],
            yes: function () {
                http({
                    url: urls.personnelDelete,
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
            area: ["680px", "375px"],
            offset: "50px",
            content: url
        });
    };
    var clickMethod = {
        add: function () {
            var title = "添加人员", url = store.filterUrl("systemStaffAdd");
            layAlertFn(title, url);
        },
        edit: function () {
            var title = "修改人员信息", url = store.filterUrl("systemStaffChange") + "?id=" + dataId + "";
            layAlertFn(title, url);
        },
        delete: deleFn
    };

    var dataId = '';
    table.on('tool(table)', function (data) {
        dataId = data.data.pk;
        var event = data.event;
        clickMethod[event]();
    });
    /* @@删除*/


    e("systemStaff", {});
});
