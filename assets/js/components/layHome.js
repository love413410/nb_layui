layui.define(["http"], function (e) {
    var utils = layui.utils;

    var http = layui.http,
        urls = layui.urls;

    var form = layui.form;

    var id = utils.locaStr('id');
    
    function getTypeFn() {
        http({
            url: urls.indexClock,
            data: { id: id },
            success: function (res) {
                var data = res.data;
                form.val('layForm', {
                    "stationName": data.stationName,
                    "seat": data.lat + ',' + data.lon,
                    "newTime": data.newTime
                });
            }
        });
    };
    getTypeFn();

    e("layHome", {});
});
