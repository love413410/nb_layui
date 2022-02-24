layui.define(["http", "getFn", "tabList"], function (e) {
    var urls = layui.urls,
        getFn = layui.getFn,
        tabList = layui.tabList;

    var id = getFn.locaStr('id');

    function getListFn() {
        tabList.render({
            url: urls.usePart,
            where: { id: id },
            cols: [
                [{
                    title: '更换日期',
                    templet: function (item) {
                        console.log(item)
                        return item.fields.Time;
                    }
                }, {
                    title: '更换人',
                    templet: function (item) {
                        return item.fields.checkUser;
                    }
                }, {
                    title: '更换内容',
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

    e("instPartList", {})
});
