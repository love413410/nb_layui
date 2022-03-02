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

    var first = true;

    var cols = [
        { title: '监控名', templet: function (item) { return item.fields.videoName; } },
        { title: '所属站点', templet: function (item) { return item.fields.ofStation; } },
        { title: '监控IP', templet: function (item) { return item.fields.ip; } },
        { title: '经度', templet: function (item) { return item.fields.Lon; } },
        { title: '纬度', templet: function (item) { return item.fields.Lat; } },
        { title: '备注', templet: function (item) { return item.fields.description; } }
    ];
    if (result) {
        cols.push({
            fixed: 'right',
            align: "center",
            title: '操作',
            toolbar: '#toolbar'
        });
        $("[name=ctrBtn]").show();
    };

    //乱七八糟的在最下面,监听按钮,验证等
    var tableIns, page = 1;
    function getListFn() {
        tableIns = tabList.render({
            url: urls.videoList,
            method: "post",
            where: { id: typeId },
            cols: [cols],
            page: true,
            done: function (data, curr) { page = curr; first = false; }
        });
    };
    // 重载当前页面
    function ReLoadFn() {
        layer.closeAll(function () {
            tableIns.reload({
                page: { curr: page }
            });
        });
    };

    var typeId;
    window.getSiteFn = function () {
        http({
            url: urls.videoIndex,
            success: function (res) {
                var data = res.data;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.stationName + '</option>';
                };
                $("#site").html(str);

                typeId = typeId || data[0].pk;
                form.val('example', {
                    id: typeId
                });
                form.render();
                first ? getListFn() : ReLoadFn();
            }
        });
    };
    getSiteFn();

    // 查询按钮
    form.on('submit(subBtn)', function (data) {
        typeId = data.field.id;
        getListFn();
    });
    // 添加按钮
    form.on('submit(addBtn)', function () {
        clickMethod['add']();
    });

    function layAlertFn(title, url) {
        layer.open({
            type: 2,
            title: title,
            resize: !1,
            skin: "layui_layer",
            id: "id",
            area: ["580px", "550px"],
            offset: "50px",
            content: url
        });
    };
    var clickMethod = {
        add: function () {
            var title = "添加监控", url = store.filterUrl("systemVideoAdd");
            layAlertFn(title, url);
        },
        delete: deleFn
    };
    var dataId = '';
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
                    url: urls.videoDelete,
                    type: 'post',
                    data: { id: dataId },
                    success: function (res) {
                        layer.msg(res.msg, {
                            time: 1500
                        }, function () {
                            getSiteFn();
                        });
                    }
                });
            },
            btn2: function () {
                layer.msg('已取消删除。');
            }
        });
    };
    e("systemVideo", {})
});
