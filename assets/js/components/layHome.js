layui.define(["http", "getFn"], function (e) {
    var http = layui.http,
        urls = layui.urls,
        getFn = layui.getFn;

    var form = layui.form;

    var id = getFn.locaStr('id');
    
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
