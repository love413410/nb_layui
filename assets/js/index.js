layui.define(["http", "store"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var store = layui.store;

    var form = layui.form;

    form.on('submit(subBtn)', function (data) {
        var data = data.field;
        http({
            url: urls.login,
            type: 'post',
            data: data,
            success: function (res) {
                store.setSessionData("grade", res.grade);
                store.setSessionData("token", res.token);
                store.setSessionData("userName", data.userName);
                store.toRouter('map');

            }
        });
        return false;
    });
    e("index", {})
});