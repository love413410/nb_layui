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

    var id;
    function getPidFn() {
        http({
            url: urls.personnelLog,
            success: function (res) {
                var data = res.data;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
                };
                $("#pid").html(str);
                form.render();
                id = data.length > 0 ? data[0].id : "";
                getListFn();
            }
        });
    };
    getPidFn();

    function getListFn() {
        tabList.render({
            url: urls.personnelLog,
            method: 'post',
            where: {
                startTime: startTime,
                endTime: endTime,
                id: id
            },
            cols: [
                [{
                    title: '日期',
                    templet: function (item) {
                        return item.fields.actionTime;
                    }
                }, {
                    title: '操作',
                    templet: function (item) {
                        return item.fields.userAction;
                    }
                }]
            ],
            page: true,
            done: function (data, curr) { page = curr; }
        });
    };

    // 查询按钮
    form.on('submit(subBtn)', function (data) {
        data = data.field;
        var date = data.date;
        var idx = date.indexOf("~");
        startTime = date.substring(0, idx).trim();
        endTime = date.substring(idx + 1).trim();
        id = data.id;
        getListFn();
    });
    e("dutyMonitor", {});
});
