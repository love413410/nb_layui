layui.define(["http", "getFn", "tabList"], function (e) {
    var urls = layui.urls,
        getFn = layui.getFn,
        tabList = layui.tabList;

    var table = layui.table;

    var id = getFn.locaStr('id');

    function getListFn() {
        tabList.render({
            url: urls.useCompare,
            where: { id: id },
            cols: [
                [{
                    title: '对比日期',
                    templet: function (item) {
                        return item.fields.Time;
                    }
                }, {
                    title: '下次对比',
                    templet: function (item) {
                        return item.fields.nextTime;
                    }
                }, {
                    title: '有效期',
                    templet: function (item) {
                        return item.fields.validTime;
                    }
                }, {
                    title: '对比人',
                    templet: function (item) {
                        return item.fields.checkUser;
                    }
                }, {
                    title: '附件路径',
                    templet: function (item) {
                        return item.fields.srcFile;
                    }
                }, {
                    fixed: 'right',
                    align: "center",
                    title: '操作',
                    toolbar: '#toolbar'
                }]
            ],
            height: 'full-20',
            page: 1,
        });
    };
    getListFn();

    table.on('tool(table)', function (data) {
        var baseUrl = data.data.fields.url, pdfFile = data.data.fields.pdfFile;
        var url = baseUrl + pdfFile;
        window.top.open(url);
    });
    e("instContrastList", {})
});
