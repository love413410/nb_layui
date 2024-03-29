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

    var type = "", userId = "";
    var getDutyFn = function () {
        http({
            url: urls.personnelUser,
            type: "post",
            data: { type: type },
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    str += '<option value="' + dataItem.pk + '">' + dataItem.fields.Name + '</option>';
                };
                $("#ofUser").html(str);
                form.render();
                userId = data.length > 0 ? data[0].pk : "";
                getListFn();
            }
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
                getDutyFn();
            }
        });
    };
    personnelCenter();
    form.on('select(section)', function (data) {
        type = data.value;
        getDutyFn();
    });

    function getListFn() {
        tabList.render({
            url: urls.signList,
            method: 'post',
            where: {
                id: userId,
                startTime: startTime,
                endTime: endTime
            },
            cols: [
                [{
                    title: '日期',
                    templet: function (item) { return item.fields.Time; }
                }, {
                    title: '白班',
                    templet: function (item) { return item.fields.onDay == 1 ? '<i class="layui-icon layui-icon-ok" style="color:#009688"></i>' : ""; }
                }, {
                    title: '夜班',
                    templet: function (item) { return item.fields.onNight == 1 ? '<i class="layui-icon layui-icon-ok" style="color:#009688"></i>' : ""; }
                }]
            ],
            page: 1,
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
        userId = data.id;
        getListFn();
    });
    e("dutyQuery", {});
});
