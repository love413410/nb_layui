
layui.define(["http", "tabList"], function (e) {
    var store = layui.store;

    var urls = layui.urls,
        tabList = layui.tabList;

    var table = layui.table;

    var tableIns;
    function getListFn() {
        tableIns = tabList.render({
            url: urls.parameterList,
            cols: [[
                { title: '要素名', templet: function (item) { return item.fields.element; } },
                { title: '最大值', templet: function (item) { return item.fields.up; } },
                { title: '最小值', templet: function (item) { return item.fields.down; } },
                { title: '波动值', templet: function (item) { return item.fields.wave; } },
                { fixed: 'right', align: "center", title: '操作', toolbar: '#toolbar' }
            ]],
            limit: 100,
            page: !1,
        });
    };
    getListFn();
    // 重载
    window.ReLoadFn = function () {
        layer.closeAll(function () {
            tableIns.reload();
        });
    };
    table.on('tool(table)', function (data) {
        var dataId = data.data.pk;
        var title = "修改要素值", url = store.filterUrl("systemCallChange") + "?id=" + dataId + "";
        layer.open({
            type: 2,
            title: title,
            resize: !1,
            skin: "layui_layer",
            id: "id",
            area: ["580px", "310px"],
            offset: "50px",
            content: url
        });
    });
    e("systemCall", {})
});
