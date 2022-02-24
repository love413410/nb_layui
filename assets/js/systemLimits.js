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
    var result = utils.differ(store.getSessionData("grade"), grade[action]);

    var cols = [
        { title: '用户名', templet: function (item) { return item.fields.userName } },
        { title: '级别', templet: function (item) { return item.fields.grade; } },
        { title: '创建日期', templet: function (item) { return item.fields.createTime; } },
        { title: '姓名', templet: function (item) { return item.fields.Name; } },
        { title: '值班签名', minWidth: 100, templet: function (item) { return html = '<p class="sign"> <img src="' + item.fields.imgSrc + '"><p/>'; } }
    ];
    if (result) {
        cols.push({
            fixed: 'right',
            align: "center",
            title: '操作',
            toolbar: '#toolbar'
        });
        $("[name=ctrBtn]").show();
    }

    var tableIns, retrName = '', page = 1;
    function getListFn() {
        tableIns = tabList.render({
            url: urls.userList,
            where: { userName: retrName },
            cols: [cols],
            page: 1,
            done: function (data, curr) { page = curr; }
        })
    };
    getListFn();

    window.ReLoadFn = function () {
        layer.closeAll(function () {
            tableIns.reload({
                page: { curr: page }
            });
        });
    };
    // 查询
    form.on('submit(subBtn)', function (data) {
        retrName = data.field.retrName;
        getListFn();
    });

    form.on('submit(addBtn)', function (data) {
        var title = "添加用户", url = store.filterUrl("systemLimitsAdd");
        layer.open({
            type: 2,
            title: title,
            resize: !1,
            skin: "layui_layer",
            id: "id",
            area: ["600px", "420px"],
            offset: "50px",
            content: url
        });
    });

    // 操作
    table.on('tool(table)', function (data) {
        var id = data.data.pk;
        deleFn(id);
    });
    // 删除
    function deleFn(id) {
        layer.msg('此操作将永久删除该数据, 是否继续?', {
            time: 5000,
            shade: 0.5,
            btn: ['确定', '取消'],
            yes: function () {
                http({
                    url: urls.userDelete,
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

    e("systemLimits", {});
});
