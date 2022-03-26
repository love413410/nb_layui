layui.define(['http'], function (e) {
    var store = layui.store;

    var urls = layui.urls,
        http = layui.http;

    var $ = layui.$,
        form = layui.form,
        upload = layui.upload;

    function getGradeFn() {
        http({
            url: urls.grade,
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    if (i == 0) {
                        str += '<input type="radio" name="grade" value="' + data[i].pk + '" title="' + data[i].fields.grade + '" checked></input>';
                    } else {
                        str += '<input type="radio" name="grade" value="' + data[i].pk + '" title="' + data[i].fields.grade + '"></input>';
                    };
                };
                $("#limit").html(str);
                form.render();
            }
        });
    };
    getGradeFn();

    //常规使用 - 普通图片上传
    var isUpload = false, token = layui.sessionData('token').key || '';
    var uploadInst = upload.render({
        elem: '#upload',
        url: urls.signUpload,
        headers: {
            'token': token
        },
        accept: 'file',
        acceptMime: 'image/jpeg,image/png',
        exts: 'jpg|png',
        size: 2048,
        number: 1,
        auto: false,
        bindAction: '#uploadBtn',
        choose: function (obj) {
            obj.preview(function (index, file, result) {
                $('#sign').attr('src', result);
                isUpload = true;
            });
        },
        done: function (res) {
            if (res.code == 209) {
                layer.msg(res.msg);
                return false;
            }
            var data = form.val('example');
            data.imgSrc = res.data;
            delete data.file;
            http({
                url: urls.userAdd,
                type: 'post',
                data: data,
                success: function (res) {
                    isUpload = false;
                    layer.msg(res.msg, {
                        time: 1500
                    }, function () {
                        parent.ReLoadFn();
                    });
                }
            });
        }
    });

    // 添加
    var btnClick = true, arr = [];
    form.on('submit(subbtn)', function () {
        if (!btnClick) {
            layer.msg("点太快了!");
            return false;
        };
        btnClick = false;
        setTimeout(function () {
            btnClick = true;
        }, 5*1000);
        if (!isUpload) {
            layer.msg("请上传电子签名", {
                icon: 2, shift: 6,
            });
            return;
        };

        $("#uploadBtn").click();
    });
    e("systemLimitsAdd", {});
});
