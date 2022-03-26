layui.define(['http'], function (e) {
    var http = layui.http,
        urls = layui.urls;
    var $ = layui.$,
        form = layui.form,
        upload = layui.upload;

    function getDetaFn() {
        http({
            url: urls.userPass,
            success: function (res) {
                var data = res.data.fields;
                $("#sign").attr("src", data.imgSrc);
                form.val('changeForm', {
                    "userName": data.userName,
                    "Name": data.Name,
                    "mobile": data.mobile,
                });
            }
        });
    };
    getDetaFn();

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
            };
            setData.imgSrc = res.data;
            changeFn();
        }
    });

    var btnClick = true, setData;

    form.on('submit(subbtn)', function (data) {
        setData = data.field;
        delete setData.file;
        if (!btnClick) {
            layer.msg("点太快了!");
            return false;
        };
        btnClick = false;
        setTimeout(function () {
            btnClick = true;
        }, 5*1000);
        !isUpload ? changeFn() : $("#uploadBtn").click();
        return false;
    });

    function changeFn() {
        http({
            url: urls.userPass,
            type: 'post',
            data: setData,
            success: function (res) {
                isUpload = false;
                layer.msg(res.msg);
            }
        });
    };
    e("change", {});
});
