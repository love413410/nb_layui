layui.define(["http"], function (e) {
    var store = layui.store;

    var $ = layui.$,
        element = layui.element,
        dropdown = layui.dropdown;

    var pagesList = store.pagesList;
    var tabFilter = 'home';

    var userName = layui.sessionData('userName').key;
    $("#user").html(userName);

    var tabsList = [], tabAddList = [];
    function menuForFn() {
        var list = '';
        for (var i = 0; i < pagesList.length; i++) {
            var dataItem = pagesList[i];
            var isChildren = dataItem.meta.isChildren;
            list += isChildren ? children(dataItem, i) : parent(dataItem, i);
        };
        function parent(data, idx) {
            var icon = data.meta.icon;
            var str = '<li class="layui-nav-item">' +
                '<a name="laynav" lay-idx="' + idx + '" id="' + data.id + '" lay-id="' + data.id + '" lay-url="' + data.name + '">' +
                '<i class="layui-icon ' + icon + ' layui_icon"></i>  ' +
                '<cite>' + data.title + '</cite>' +
                '</a>' +
                '</li>';
            return str;
        };
        function children(data, idx) {
            var children = data.children, childrenStr = '';
            for (var i = 0; i < children.length; i++) {
                var childrenItem = children[i];
                childrenStr += '<dd>' +
                    '<a name="laynav" lay-idx="' + idx + '" id="' + childrenItem.id + '" lay-id="' + childrenItem.id + '" lay-url="' + childrenItem.name + '">' +
                    '<cite>' + childrenItem.title + '</cite>' +
                    '</a>' +
                    '</dd>';
            };
            var icon = data.meta.icon;
            var str = '<li class="layui-nav-item">' +
                '<a>' +
                '<i class="layui-icon ' + icon + ' layui_icon"></i>  ' +
                '<cite>' + data.title + '</cite>' +
                '</a>' +
                '<dl class="layui-nav-child">' + childrenStr + '</dl>' +
                '</li>';
            return str;
        };
        $("#sideMenu").html(list);
        $("#sideMenu .layui-nav-item").eq(0).addClass("layui-this");
        var item = pagesList[0];
        var title = item.title, id = item.id, url = item.name, index = 0, action = item.action;
        // tabsList.push(url);
        tabAddList.push(id);

        var token = layui.sessionData('token').key;
        if (token) {
            breadcrumbAdd(title, index);
            elementAdd(title, id, url, index, action);
            element.tabChange(tabFilter, id);
        };
        element.init();
    };
    menuForFn();

    $("[name=laynav]").click(function () {
        var title = $(this).text();
        var idx = $(this).attr("lay-idx");
        var id = $(this).attr("lay-id");
        var url = $(this).attr("lay-url");

        var index = tabAddList.indexOf(id);
        if (index < 0) {
            tabAddList.push(id);
            elementAdd(title, id, url, idx);
        };
        element.tabChange(tabFilter, id);
    });

    // 添加tabs
    function elementAdd(title, id, url, idx) {
        // var src = store.filterUrl(url) + "?action=" + action;
        var src = store.filterUrl(url);
        var content = '<iframe src="' + src + '" frameborder="0" class="iframe"></iframe>';
        element.tabAdd(tabFilter, {
            title: title,
            content: content,
            id: id,
            url: url,
            idx: idx
        });
    };
    // 添加面包屑
    function breadcrumbAdd(title, idx) {
        var data = pagesList[idx];
        var str = ' <a>后台管理系统</a>';
        var isChildren = data.meta.isChildren;
        if (isChildren) {
            str += ' <a>' + data.title + '</a>' +
                '<a><cite>' + title + '</cite></a>';
        } else {
            str += '<a><cite>' + title + '</cite></a>';
        };
        $("#breadcrumb").html('<span class="layui-breadcrumb" lay-separator=">">' + str + '</span>');
        element.init();
    };

    element.on('tab(' + tabFilter + ')', function () {
        var title = $(this).text();
        var id = $(this).attr("lay-id");
        var idx = $(this).attr("lay-idx");
        $("#sideMenu *").removeClass("layui-this");
        $("#" + id).addClass("layui-this");
        $("#" + id).parent().addClass("layui-this");
        $(".layui-nav-item").siblings().removeClass("layui-nav-itemed");
        $("#" + id).parents(".layui-nav-item").addClass("layui-nav-itemed");
        breadcrumbAdd(title, idx);
    });
    element.on('tabDelete(' + tabFilter + ')', function (elem) {
        // var url = $(this).parent().attr("lay-url");
        // var id = $(this).parent().attr("lay-id");
        // tabsList.splice(tabsList.indexOf(url), 1);
        // tabAddList.splice(tabAddList.indexOf(id), 1);
        var id = $(this).parent().attr("lay-id");
        tabAddList.splice(tabAddList.indexOf(id), 1);
    });
    $(".layui-nav-item").click(function () {
        $(this).siblings().removeClass("layui-nav-itemed");
    });
    var clickMethod = {
        change: function () {
            var title = "修改密码", url = store.filterUrl('userChange');
            layer.closeAll(function () {
                layer.open({
                    type: 2,
                    title: title,
                    shade: 0.8,
                    resize: !1,
                    skin: "layui_layer",
                    area: ['680px', '460px'],
                    content: url
                });
            });
        },
        logOut: function () {
            store.logOut();
        }
    };
    dropdown.render({
        elem: "#user",
        data: [
            { title: "修改密码", id: "change" },
            { title: "退出登录", id: "logOut" }
        ],
        trigger: 'hover',
        click: function (data) {
            clickMethod[data.id]();
        }
    });

    // 全部的
    dropdown.render({
        elem: "#tabs",
        id: "tabs",
        trigger: "contextmenu",
        data: [
            { title: "关闭全部", id: "all" }
        ],
        click: function () {
            for (var i = tabAddList.length - 1; i >= 1; i--) {
                element.tabDelete(tabFilter, tabAddList[i]);
            };
        }
    });

    window.routerTo = function (url) {
        store.toRouter(url);
    };
    e("home", {})
});
