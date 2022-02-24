layui.define(["http", "tabList"], function (e) {
    var http = layui.http,
        urls = layui.urls,
        tabList = layui.tabList;

    var $ = layui.$,
        form = layui.form;

    var tableIns, alarmType = 0;

    function getTypeFn() {
        http({
            url: urls.alarmType,
            success: function (res) {
                var data = res.data;
                var str = '<option value="0">全部</option>';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.Type + '</option>';
                };
                $("#alarmtype").html(str);
                form.render();
                getListFn();
            }
        });
    };
    getTypeFn();

    function getListFn() {
        tableIns = tabList.render({
            url: urls.alarmList,
            method: "post",
            where: { type: alarmType },
            cols: [
                [{
                    title: '站点名',
                    templet: function (item) {
                        return item.fields.stationName;
                    }
                }, {
                    title: '故障类型',
                    templet: function (item) {
                        return item.fields.alarmType;
                    }
                }, {
                    title: '缺失开始时间',
                    templet: function (item) {
                        return item.fields.startTime;
                    }
                }, {
                    title: '缺失结束时间',
                    templet: function (item) {
                        return item.fields.endTime;
                    }
                }, {
                    title: '持续时间',
                    templet: function (item) {
                        return item.fields.duryTime;
                    }
                }, {
                    title: '描述',
                    templet: function (item) {
                        return item.fields.description;
                    }
                }]
            ],
            page: 1,
        });
    };
    // 查询按钮调取站点列表接口
    form.on('submit(subBtn)', function (data) {
        alarmType = data.field.type;
        getListFn();
    });
    e("queryCall", {})
});