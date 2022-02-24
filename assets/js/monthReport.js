layui.define(["http", "load", "getFn"], function (e) {
    var store = layui.store;

    var http = layui.http,
        urls = layui.urls,
        load = layui.load,
        getFn = layui.getFn;

    var $ = layui.jquery,
        form = layui.form,
        layer = layui.layer,
        laydate = layui.laydate;

    function getSiteList() {
        http({
            url: urls.indexList,
            success: function (res) {
                var data = res.data, arr = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    arr.push('<option value=' + dataItem.id + '>' + dataItem.name + '</option>');
                };
                $("#siteList").html(arr.join(','));
                form.render();
            }
        });
    };
    getSiteList();

    laydate.render({
        elem: "#date",
        type: "month",
        value: getFn.initM(),
        max: 0,
        format: "yyyy-MM",
        btns: ['now', 'confirm']
    });

    var url = $('.tab-btn').eq(0).attr('code');
    $("#iframe").attr("src", store.filterUrl(url));

    $(".tab-btn").click(function () {
        $(".tab-btn").removeClass("tab-add");
        $(this).addClass("tab-add");
        var url = $(this).attr("code");
        $("#iframe").attr("src", store.filterUrl(url));
    });
    // 生成报表
    form.on('submit(subBtn)', function (data) {
        var data = data.field;
        var id = data.id;
        if (!id) {
            layer.msg("请选择站点");
            return false;
        };
        var date = data.date;
        window.frames["iframe"].getDataFn(id, date);
    });

    // 导出报表
    form.on('submit(exportBtn)', function (data) {
        var idx = url.lastIndexOf("_");
        var type = url.substring(0, idx) || url;
        var date = data.field.date;
        var id = data.field.id;
        load(urls.file, "post", {
            site: id,
            type: type,
            month: date
        });
    });

    // 批量导出
    laydate.render({
        elem: "#time",
        type: "month",
        value: getFn.initM(),
        max: 0,
        format: "yyyy-MM",
        btns: ['now', 'confirm']
    });
    var layExp;
    form.on('submit(batch)', function (data) {
        layExp = layer.open({
            type: 1,
            shade: 0.5,
            skin: 'batch',
            title: '批量导出',
            skin: "layui_layer",
            area: ['470px', '300px'],
            content: $('#mask')
        });
    });
    form.on('submit(conBtn)', function (data) {
        var data = data.field;
        var time = data.time;
        delete data.time;
        var key = Object.keys(data);
        var str = key.join(",");
        var id = $("#siteList").val();
        load(urls.file, "post", {
            site: id,
            type: str,
            month: time
        }, layExp);
    });
    e("monthReport", {})
});
