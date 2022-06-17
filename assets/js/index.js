layui.define(["http", "store"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var store = layui.store;

    var form = layui.form;

    form.on('submit(subBtn)', function (data) {
        var data = data.field;
        if (data.isSign != undefined) {
            http({
                url: urls.login,
                type: 'post',
                data: data,
                success: function (res) {
                    layui.sessionData('grade', {
                        key: 'key',
                        value: res.grade
                    });

                    layui.sessionData('token', {
                        key: 'key',
                        value: res.token
                    });
                    layui.sessionData('userName', {
                        key: 'key',
                        value: data.userName
                    });
                    store.toRouter('map');
                }
            });
        };
        if (data.isSign == undefined) {
            layer.msg("请选择是否为今日值班人员", {
                icon: 5,
                anim: 6
            })
        };
        return false;
    });

    e("index", {})
});