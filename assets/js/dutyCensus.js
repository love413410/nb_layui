layui.define(["http", "getFn", "tabList"], function (e) {
    var urls = layui.urls,
        getFn = layui.getFn,
        tabList = layui.tabList;

    var form = layui.form,
        laydate = layui.laydate;

    var startTime = getFn.initDate(),
        endTime = getFn.initDate();

    laydate.render({
        elem: '#date',
        range: "~",
        value: startTime + "\xa0" + "~" + "\xa0" + endTime,
        max: 0,
        btns: ['now', 'confirm']
    });
    function getListFn() {
        tabList.render({
            url: urls.personnelCount,
            where: {
                startTime: startTime,
                endTime: endTime
            },
            cols: [
                [{
                    title: '值班人',
                    field: 'name'
                }, {
                    title: '白班天数',
                    field: 'onDay'
                }, {
                    title: '夜班天数',
                    field: 'onNight'
                }]
            ],
            page: 1,
            done: function (data, curr) { page = curr; }
        });
    };
    getListFn();
    // 查询按钮
    form.on('submit(subBtn)', function (data) {
        data = data.field;
        var date = data.date;
        var idx = date.indexOf("~");
        startTime = date.substring(0, idx).trim();
        endTime = date.substring(idx + 1).trim();
        getListFn();
    });
    e("dutyCensus", {});
});
