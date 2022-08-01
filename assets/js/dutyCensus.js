layui.define(["http", "getFn", "tabList"], function (e) {
    var http = layui.http,
        urls = layui.urls,
        getFn = layui.getFn,
        tabList = layui.tabList;

    var $ = layui.$,
        form = layui.form,
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
    var type = '';
    var getListFn = function () {
        tabList.render({
            url: urls.personnelCount,
            where: {
                type: type,
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
    var personnelCenter = function () {
        http({
            url: urls.personnelCenter,
            success: function (res) {
                var data = res.data, option = '';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i].fields;
                    option += '<option value="' + data[i].pk + '">' + dataItem.section + '</option>';
                };
                $("#section").html(option);
                type = data.length ? data[0].pk : "";
                form.render();
                getListFn();
            }
        });
    };
    personnelCenter();
    // 查询按钮
    form.on('submit(subBtn)', function (data) {
        data = data.field;
        type = data.type;
        var date = data.date;
        var idx = date.indexOf("~");
        startTime = date.substring(0, idx).trim();
        endTime = date.substring(idx + 1).trim();
        getListFn();
    });
    e("dutyCensus", {});
});
