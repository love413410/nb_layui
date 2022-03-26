layui.define(["http", "tabList"], function (e) {
    var utils = layui.utils;

    var urls = layui.urls,
        tabList = layui.tabList;

    var id = utils.locaStr('id');

    function getListFn() {
        tabList.render({
            url: urls.toolRecord,
            where: { id: id },
            cols: [
                [{
                    title: '流转日期',
                    templet: function (item) {
                        return item.fields.recordTime;
                    }
                }, {
                    title: '流转内容',
                    templet: function (item) {
                        return item.fields.content;
                    }
                }]
            ],
            height: 'full-20',
            page: 1
        });
    };
    getListFn();
    
    e("instSpareRecord", {})
});