layui.define(["store"], function (e) {
    var store = layui.store;

    var layer = layui.layer,
        table = layui.table;

    var token = layui.sessionData('token').key;
    function tabListFn(data) {
        var tableIns = table.render({
            elem: data.elem || '#table',
            url: data.url || "",
            method: data.method || 'get',
            headers: { token: token },
            where: data.where || {},
            request: {
                pageName: 'pageNum',
                limitName: 'pageSize'
            },
            text: {
                none: "暂无相关数据"
            },
            parseData: function (res) {
                if (res.code == 209 && res.msg != "") {
                    layer.msg(res.msg)
                };
            },
            response: {
                statusCode: 200
            },
            cols: data.cols,
            id: 'tabReload',
            height: data.height || 'full-100',
            cellMinWidth: 80,
            page: data.page,
            limit: data.limit || 10,
            totalRow: data.totalRow || false,
            done: function (res, curr) { data.done && data.done(res, curr) },
            error: function (err) {
                if (err.status == 502) {
                    var data = err.responseJSON;
                    store.logOut(data.msg);
                }
            }
        });
        return tableIns;
    };
    e("tabList", {
        render: tabListFn
    })
});