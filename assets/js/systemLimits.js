layui.define(["http", "tabList"], function (e) {
    var store = layui.store;

    var http = layui.http,
        urls = layui.urls,
        tabList = layui.tabList;

    var $ = layui.$,
        form = layui.form,
        table = layui.table;

    var retrType = '', page = 1;

    var gradeList = {};
    function getGradeFn() {
        http({
            url: urls.grade,
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var key = dataItem.pk,
                        value = dataItem.fields.grade;
                    gradeList[key] = value;
                    if (i == 0) {
                        str += '<option value="' + key + '" selected>' + value + '</option>';
                    } else {
                        str += '<option value="' + key + '">' + value + '</option>';
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

    var sectionList = {};
    var userSection = function () {
        http({
            url: urls.userSection,
            type: "post",
            success: function (res) {
                var data = res.data;
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var key = dataItem.pk,
                        value = dataItem.fields.section;
                    sectionList[key] = value;
                };
            }
        });
    };
    userSection();

    var tableIns, page = 1;
    function getListFn() {
        tableIns = tabList.render({
            url: urls.userList,
            where: { grade: retrType },
            cols: [[
                { title: '用户名', templet: function (item) { return item.fields.userName } },
                { title: '创建日期', templet: function (item) { return item.fields.createTime; } },
                { title: '用户级别', templet: function (item) { return gradeList[item.fields.grade]; } },
                { title: '所属部门', templet: function (item) { return sectionList[item.fields.ofSection]; } },
                { title: '姓名', templet: function (item) { return item.fields.Name; } },
                { title: '手机号', templet: function (item) { return item.fields.mobile; } },
                { title: '值班签名', minWidth: 100, templet: function (item) { return html = '<p class="sign"> <img src="' + item.fields.imgSrc + '"><p/>'; } },
                { fixed: 'right', align: "center", minWidth: 120, title: '操作', toolbar: '#toolbar' }
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

    function layAlertFn(title, url, height) {
        height = height || "550px"
        layer.open({
            type: 2,
            title: title,
            resize: !1,
            skin: "layui_layer",
            id: "id",
            area: ["600px", height],
            offset: "50px",
            content: url
        });
    };

    form.on('submit(addBtn)', function () {
        var title = "添加用户", url = store.filterUrl("systemLimitsAdd");
        layAlertFn(title, url);
    });

    var clickMethod = {
        delete: deleFn,
        edit: function () {
            var title = "修改用户信息", url = store.filterUrl("systemLimitsChange") + "?id=" + dataId;
            layAlertFn(title, url);
        }
    };
    // 操作
    var dataId, dataName, grade, ofSection;
    table.on('tool(table)', function (data) {
        var event = data.event;
        data = data.data;
        dataId = data.pk;
        dataName = data.fields.Name;
        grade = data.fields.grade;
        ofSection = data.fields.ofSection;
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
