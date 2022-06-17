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

    var gradeId;
    function getGradeFn() {
        http({
            url: urls.logs,
            success: function (res) {
                var data = res.data;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.grade + '</option>';
                };
                $("#limit").html(str);
                form.render();
                gradeId = data.length > 0 ? data[0].pk : "";
                getUserFn();
            }
        });
    };
    getGradeFn();

    form.on('select(limit)', function (data) {
        gradeId = data.value;
        getUserFn();
    });

    function getUserFn() {
        http({
            url: urls.log,
            data: { id: gradeId },
            success: function (res) {
                var data = res.data;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.Name + '</option>';
                };
                $("#user").html(str);
                form.render();
            }
        });
    };
    var id;
    function getListFn() {
        tabList.render({
            url: urls.log,
            method: 'post',
            where: {
                id: id,
                startTime: startTime,
                endTime: endTime,
            },
            cols: [
                [{
                    title: '操作日期',
                    templet: function (item) {
                        return item.fields.actionTime;
                    }
                }, {
                    title: '操作模块',
                    templet: function (item) {
                        return item.fields.actionModel;
                    }
                }, {
                    title: '操作内容',
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
        id = data.id;
        var date = data.date;
        var idx = date.indexOf("~");
        startTime = date.substring(0, idx).trim();
        endTime = date.substring(idx + 1).trim();
        getListFn();
    });
    e("systemLog", {});
});
