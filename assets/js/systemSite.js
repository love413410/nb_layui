layui.define(["http", "tabList"], function (e) {
    var store = layui.store;

    var urls = layui.urls,
        http = layui.http,
        tabList = layui.tabList;

    var $ = layui.$,
        form = layui.form,
        table = layui.table;

    var tableIns, ofType = 0, ofArea = 0, page = 1;

    var section = {};//岸段集合
    var getSectionList = function () {
        http({
            url: urls.sectionList,
            data: {
                pageNum: "",//空查全部
                pageSize: "" //空查全部
            },
            async: false,
            success: function (res) {
                var data = res.data;
                for (var i = 0; i < data.length; i++) {
                    var key = data[i].pk,
                        value = data[i].fields.section;
                    section[key] = value;
                };
                getListFn();
            }
        });
    };

    window.getListFn = function () {
        tableIns = tabList.render({
            url: urls.siteList,
            where: {
                ofType: ofType,
                ofArea: ofArea
            },
            cols: [[
                { title: '站点名', templet: function (item) { return item.fields.stationName; } },
                { title: '站点类型', templet: function (item) { return item.fields.Type; } },
                { title: '所属类型:', templet: function (item) { return item.fields.ofType; } },
                { title: '所在区域', templet: function (item) { return item.fields.ofArea; } },
                {
                    title: '所属岸段', templet: function (item) {
                        var key = item.fields.section;
                        var value = section[key] ? section[key] : "";
                        return value;
                    }
                },

                { title: '站名代码', templet: function (item) { return item.fields.stationNumCode; } },
                { title: '经度', templet: function (item) { return item.fields.Lon; } },
                { title: '纬度', templet: function (item) { return item.fields.Lat; } },
                { title: '建站时间', templet: function (item) { return item.fields.buildTime; } },
                { title: '启用时间', templet: function (item) { return item.fields.enableTime; } },

                { title: 'IP地址', templet: function (item) { return item.fields.ip; } },
                { title: '应到文件', templet: function (item) { return item.fields.handleTime + '(个)'; } },
                { title: '延时时间', templet: function (item) { return item.fields.delayTime + '(分钟)'; } },
                { fixed: 'right', align: "center", title: '操作', minWidth: 150, toolbar: '#toolbar' }
            ]],
            page: true,
            done: function (data, curr) { page = curr; }
        });
    };
    var getTypeFn = function () {
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
        getSectionList();
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
    function layAlertFn(title, url, height) {
        height = height || "750px"
        layer.open({
            type: 2,
            title: title,
            resize: !1,
            skin: "layui_layer",
            id: "id",
            area: ["850px", height],
            // area: ["850px", "750px"],
            offset: "50px",
            content: url
        });
    };

    var clickMethod = {
        add: function () {
            var title = "添加站点", url = store.filterUrl("systemSiteAdd");
            layAlertFn(title, url, "610px");
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

    // 弹出图片,从修改页面传过来的
    window.layerImg = function (imgId) {
        var photosList = {
            "title": "图片列表",
            "id": 123,
            "start": 0,
            "data": [{ "alt": "图片名", "pid": 666, "src": "", "thumb": "" }]
        };
        http({
            url: urls.siteImageList,
            data: { id: dataId },
            async: false,
            success: function (res) {
                var data = res.data, list = [], index = 0;
                for (var i = 0; i < data.length; i++) {
                    var id = data[i].pk, url = data[i].fields.imgSrc;
                    if (id == imgId) { index = i };
                    list.push({
                        "alt": "站点图片",
                        "pid": id,
                        "src": url,
                        "thumb": url
                    });
                };
                if (!list.length) {
                    layer.msg("无图片");
                    return;
                };
                photosList.start = index;
                photosList.data = list;
                layer.photos({
                    photos: photosList,
                    anim: 5
                });
            }
        });
    };
    e("systemSite", {})
});
