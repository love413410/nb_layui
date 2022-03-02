layui.define(["http", "tabList"], function (e) {
    var store = layui.store,
        utils = layui.utils;

    var urls = layui.urls,
        http = layui.http,
        tabList = layui.tabList;

    var $ = layui.$,
        form = layui.form,
        table = layui.table;

    var grade = utils.grade,
        action = utils.locaStr("action");
    var result = utils.differ(store.getSessionData("grade"), grade[action]);

    var cols = [
        { title: '站点名', templet: function (item) { return item.fields.stationName; } },
        { title: '站点类型', templet: function (item) { return item.fields.Type; } },
        { title: '所属类型:', templet: function (item) { return item.fields.ofType; } },
        { title: '所在区域', templet: function (item) { return item.fields.ofArea; } },
        { title: '站名代码', templet: function (item) { return item.fields.stationNumCode; } },
        { title: '经度', templet: function (item) { return item.fields.Lon; } },
        { title: '纬度', templet: function (item) { return item.fields.Lat; } },
        { title: 'IP地址', templet: function (item) { return item.fields.ip; } },
        { title: '应到文件', templet: function (item) { return item.fields.handleTime; } },
        { title: '延时时间', templet: function (item) { return item.fields.delayTime; } },
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

    var tableIns, ofType = 0, ofArea = 0, page = 1;

    window.getListFn = function () {
        tableIns = tabList.render({
            url: urls.siteList,
            where: {
                ofType: ofType,
                ofArea: ofArea
            },
            cols: [cols],
            page: true,
            done: function (data, curr) { page = curr; }
        });
    };
    function getTypeFn() {
        http({
            url: urls.siteStyle,
            success: function (res) {
                var data = res.data, str = '<option value="0">全部</option>';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.Name + '</option>';
                };
                $("#oftype").html(str);
                form.render();
            }
        });
        http({
            url: urls.siteStyle,
            type: "post",
            success: function (res) {
                var data = res.data, str = '<option value="0">全部</option>';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.Name + '</option>';
                };
                $("#ofarea").html(str);
                form.render();
            }
        });
        getListFn();
    };
    getTypeFn();

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
        ofType = data.field.ofType;
        ofArea = data.field.ofArea;
        getListFn();
    });
    //添加按钮
    form.on('submit(addBtn)', function (data) {
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
                    url: urls.siteDelete,
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
            area: ["650px", "750px"],
            offset: "50px",
            content: url
        });
    };

    var clickMethod = {
        add: function () {
            var title = "添加站点", url = store.filterUrl("systemSiteAdd");
            layAlertFn(title, url);
        },
        edit: function () {
            var title = "修改站点", url = store.filterUrl("systemSiteChange") + "?id=" + dataId + "";
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
    e("systemSite", {})
});
