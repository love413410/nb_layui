layui.define(["http", "tabList"], function (e) {
    var store = layui.store;

    var http = layui.http,
        urls = layui.urls,
        tabList = layui.tabList;

    var $ = layui.$,
        form = layui.form,
        table = layui.table;

    var retrType = '', page = 1;
    function getGradeFn() {
        http({
            url: urls.grade,
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    if (i == 0) {
                        str += '<option value="' + data[i].pk + '" selected>' + data[i].fields.grade + '</option>';
                    } else {
                        str += '<option value="' + data[i].pk + '">' + data[i].fields.grade + '</option>';
                    };
                };
                $("#type").html(str);
                form.render();
                retrType = data.length > 0 ? data[0].pk : "";
                getListFn();
            }
        });
    };
    getGradeFn();
    form.on('select(retrType)', function (data) {
        retrType = data.value;
        getListFn();
    });

    var tableIns, page = 1;
    function getListFn() {
        tableIns = tabList.render({
            url: urls.userList,
            where: { grade: retrType },
            cols: [[
                { title: '用户名', templet: function (item) { return item.fields.userName } },
                { title: '用户级别', templet: function (item) { return item.fields.grade; } },
                { title: '创建日期', templet: function (item) { return item.fields.createTime; } },
                { title: '姓名', templet: function (item) { return item.fields.Name; } },
                { title: '手机号', templet: function (item) { return item.fields.mobile; } },
                { title: '值班签名', minWidth: 100, templet: function (item) { return html = '<p class="sign"> <img src="' + item.fields.imgSrc + '"><p/>'; } },
                { fixed: 'right', align: "center", title: '操作', toolbar: '#toolbar' }
            ]],
            page: 1,
            done: function (data, curr) { page = curr; }
        })
    };

    window.ReLoadFn = function () {
        layer.closeAll(function () {
            tableIns.reload({
                page: { curr: page }
            });
        });
    };

    form.on('submit(addBtn)', function (data) {
        var title = "添加用户", url = store.filterUrl("systemLimitsAdd");
        layer.open({
            type: 2,
            title: title,
            resize: !1,
            skin: "layui_layer",
            id: "id",
            area: ["600px", "500px"],
            offset: "50px",
            content: url
        });
    });

    var clickMethod = {
        delete: deleFn
    };
    // 操作
    var dataId;
    table.on('tool(table)', function (data) {
        var event = data.event;
        dataId = data.data.pk;
        clickMethod[event]();
    });
    // 删除
    function deleFn() {
        layer.msg('此操作将永久删除该数据, 是否继续?', {
            time: 5000,
            shade: 0.5,
            btn: ['确定', '取消'],
            yes: function () {
                http({
                    url: urls.userDelete,
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

    e("systemLimits", {});
});
