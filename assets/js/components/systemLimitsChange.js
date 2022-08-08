layui.define(['http', 'getFn'], function (e) {
    var urls = layui.urls,
        http = layui.http,
        getFn = layui.getFn;

    var $ = layui.$,
        form = layui.form,
        upload = layui.upload;

    var id = getFn.locaStr('id');

    function getGradeFn() {
        http({
            url: urls.grade,
            async: false,
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var key = dataItem.pk,
                        value = dataItem.fields.grade;
                    str += '<input type="radio" name="grade" value="' + key + '" title="' + value + '"></input>';
                };
                $("#limit").html(str);
                form.render();
            }
        });
        http({
            url: urls.userSection,
            type: "post",
            async: false,
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var key = dataItem.pk,
                        value = dataItem.fields.section;
                    str += '<input type="radio" name="ofSection" value="' + key + '" title="' + value + '"></input>';
                };
                $("#ofSection").html(str);
                form.render();
            }
        });
        http({
            url: urls.userChange,
            data: { id: id },
            async: false,
            success: function (res) {
                var data = res.data.fields;
                form.val('example', {
                    "id": id,
                    "userName": data.userName,
                    "Name": data.Name,
                    "mobile": data.mobile,
                    "grade": data.grade,
                    "ofSection": data.ofSection
                });
                $("#sign").attr("src", data.imgSrc);
            }
        });
    };
    getGradeFn();

    var isUpload = false, token = layui.sessionData('token').key || '';
    var uploadInst = upload.render({
        elem: '#upload',
        url: urls.signUpload,
        headers: { 'token': token },
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
            change(res.data)
        }
    });
    function change(url) {
        var data = form.val('example');
        delete data.file;
        if (!data.passWord) {
            delete data.passWord
        };
        url ? data.imgSrc = url : "";
        console.log(data)

        http({
            url: urls.userChange,
            type: 'post',
            data: data,
            success: function (res) {
                layer.msg(res.msg, {
                    time: 1500
                }, function () {
                    parent.ReLoadFn();
                });
            }
        });
    };

    // 修改
    var btnClick = true;
    form.on('submit(subbtn)', function (data) {
        if (!btnClick) {
            layer.msg("点太快了!");
            return false;
        };
        btnClick = false;
        setTimeout(function () {
            btnClick = true;
        }, 5 * 1000);

        isUpload ? $("#uploadBtn").click() : change();
    });
    form.verify({
        password: function (val) {
            if (getFn.trimFn(val) && !getFn.password(val)) {
                return '请输入8至16位的密码,字母开头并包含数字和特殊字符';
            }
        },
        newPass: function (val) {
            var pass = $('#pass').val();
            if (pass != '' && val !== pass) {
                return '两次输入密码不一致';
            }
        }
    })
    e("systemLimitsChange", {});
});
