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

    var typeId, style = $("#style").val();
    function getTypeFn() {
        http({
            url: urls.siteType,
            success: function (res) {
                var data = res.data;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.Type + '</option>';
                };
                $("#sitetype").html(str);
                form.render();
                typeId = data.length > 0 ? data[0].pk : "";
                getListFn();
            }
        });
    };
    getTypeFn();

    var tableIns, page = 1;
    function getListFn() {
        tableIns = tabList.render({
            url: urls.dataRate,
            method: "get",
            where: {
                type: typeId,
                style: style,
                startTime: startTime,
                endTime: endTime
            },
            cols: [
                [{
                    fixed: 'left',
                    field: 'station',
                    title: '站点',
                    totalRow: true
                }, {
                    field: 'total',
                    title: '应到条数',
                    totalRow: true
                }, {
                    field: 'relay',
                    title: '实到条数',
                    totalRow: true
                }, {
                    field: 'yet',
                    title: '未到条数',
                    totalRow: true
                }, {
                    field: 'obtain',
                    title: '到报率(%)',
                    totalRow: true
                }, {
                    field: 'totalEl',
                    title: '应到要素',
                    totalRow: true
                }, {
                    field: 'relayEl',
                    title: '实到要素',
                    totalRow: true
                }, {
                    field: 'yetEl',
                    title: '未到要素',
                    totalRow: true
                }, {
                    field: 'obtainEl',
                    title: '有效率(%)',
                    totalRow: true
                }]
            ],
            page: 1,
            totalRow: true
        });
    };
    // 查询按钮调取站点列表接口
    form.on('submit(subBtn)', function (data) {
        data = data.field;
        typeId = data.sitetype;
        style = data.style;
        var date = data.date;
        var idx = date.indexOf("~");
        startTime = date.substring(0, idx).trim();
        endTime = date.substring(idx + 1).trim();
        getListFn();
    });
    e("queryCensus", {})
});