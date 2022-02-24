// layui.define(["http"], function (e) {
//     var store = layui.store;

//     var $ = layui.$,
//         element = layui.element;

//     var pagesList = store.pagesList;
//     var tabFilter = 'home';

//     var tabsList = [];
//     function menuForFn() {
//         var list = '';
//         for (var i = 0; i < pagesList.length; i++) {
//             var dataItem = pagesList[i];
//             var isChildren = dataItem.meta.isChildren;
//             list += isChildren ? children(dataItem) : parent(dataItem);
//         };
//         function parent(data) {
//             var icon = data.meta.icon;
//             var str = '<li class="layui-nav-item">' +
//                 '<a name="laynav" lay-id="' + data.id + '" lay-url="' + data.name + '">' +
//                 '<i class="layui-icon ' + icon + ' layui_icon"></i>  ' +
//                 '<cite>' + data.title + '</cite>' +
//                 '</a>' +
//                 '</li>';
//             return str;
//         };
//         function children(data) {
//             var children = data.children, childrenStr = '';
//             for (var i = 0; i < children.length; i++) {
//                 var childrenItem = children[i];
//                 childrenStr += '<dd>' +
//                     '<a name="laynav" lay-id="' + childrenItem.id + '" lay-url="' + childrenItem.name + '">' +
//                     '<cite>' + childrenItem.title + '</cite>' +
//                     '</a>' +
//                     '</dd>';
//             };
//             var icon = data.meta.icon;
//             var str = '<li class="layui-nav-item">' +
//                 '<a>' +
//                 '<i class="layui-icon ' + icon + ' layui_icon"></i>  ' +
//                 '<cite>' + data.title + '</cite>' +
//                 '</a>' +
//                 '<dl class="layui-nav-child">' + childrenStr + '</dl>' +
//                 '</li>';
//             return str;
//         };
//         $("#sideMenu").html(list);
//         element.init();
//         $("#sideMenu .layui-nav-item").eq(0).addClass("layui-this");
//         console.log(pagesList)
//         var item = pagesList[0];
//         var title = item.title, id = item.id, url = item.name;
//         tabsList.push(url);
//         elementAdd(title, id, url);
//         element.tabChange(tabFilter, id);
//     };
//     menuForFn();


//     $("[name=laynav]").click(function () {
//         var title = $(this).text();
//         var id = $(this).attr("lay-id");
//         var url = $(this).attr("lay-url");
//         var index = tabsList.indexOf(url);
//         if (index < 0) {
//             tabsList.push(url);
//             elementAdd(title, id, url);
//         };
//         element.tabChange(tabFilter, id);
//     });

//     function elementAdd(title, id, url) {
//         var src = store.filterUrl(url);
//         var content = '<iframe src="' + src + '" frameborder="0" class="iframe"></iframe>';
//         element.tabAdd(tabFilter, {
//             title: title,
//             content: content,
//             id: id,
//             url: url
//         });
//     };
//     element.on('tab(' + tabFilter + ')', function (elem) {
//         console.log("111")
//         var id = $(this).attr('lay-id');
//         var dom = $("#sideMenu [lay-id=" + id + "]");
//         $("#sideMenu *").removeClass("layui-this");
//         $(dom).addClass("layui-this");
//         $(dom).parent().addClass("layui-this");
//         $(".layui-nav-item").siblings().removeClass("layui-nav-itemed");
//         $(dom).parents(".layui-nav-item").addClass("layui-nav-itemed");
//     });
//     element.on('tabDelete(' + tabFilter + ')', function (elem) {
//         var url = $(this).parent().attr("lay-url");
//         tabsList.splice(tabsList.indexOf(url), 1);
//     });
//     $(".layui-nav-item").click(function () {
//         $(this).siblings().removeClass("layui-nav-itemed");
//     });
//     e("test", {})
// });

layui.define(["http"], function (e) {
    var store = layui.store;

    var $ = layui.$,
        element = layui.element,
        dropdown = layui.dropdown

    var pagesList = store.pagesList;
    var tabFilter = 'home';

    var tabsList = [];
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
        var title = item.title, id = item.id, url = item.name, index = 0;
        tabsList.push(url);

        breadcrumbAdd(title, index);
        elementAdd(title, id, url, index);
        element.tabChange(tabFilter, id);

        element.init();
    };
    menuForFn();

    $("[name=laynav]").click(function () {
        var title = $(this).text();
        var id = $(this).attr("lay-id");
        var url = $(this).attr("lay-url");
        var idx = $(this).attr("lay-idx");
        console.log(idx)

        var index = tabsList.indexOf(url);
        if (index < 0) {
            tabsList.push(url);
            elementAdd(title, id, url, idx);
        };
        element.tabChange(tabFilter, id);
    });

    // 添加tabs
    function elementAdd(title, id, url, idx) {
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
        var url = $(this).parent().attr("lay-url");
        tabsList.splice(tabsList.indexOf(url), 1);
    });
    $(".layui-nav-item").click(function () {
        $(this).siblings().removeClass("layui-nav-itemed");
    });

    var clickMethod = {
        change: function () {
            var title = "修改密码", url = store.filterUrl('userChange');
            console.log(url)
            layer.closeAll(function () {
                layer.open({
                    type: 2,
                    title: title,
                    shade: 0.8,
                    resize: !1,
                    skin: "layui_layer",
                    area: ['400px', '400px'],
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
        click: function (data) {
            clickMethod[data.id]();
        }
    });
    e("test", {})
});
