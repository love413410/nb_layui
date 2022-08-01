layui.define(['http', 'getFn'], function (e) {
    var urls = layui.urls,
        http = layui.http,
        getFn = layui.getFn;

    var $ = layui.$,
        form = layui.form;

    var id = getFn.locaStr('id'),
        userName = getFn.locaStr('name'),
        grade = getFn.locaStr('grade'),
        ofSection = getFn.locaStr('ofSection');

    $("#username").val(userName);

    function getGradeFn() {
        http({
            url: urls.grade,
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var key = dataItem.pk,
                        value = dataItem.fields.grade;
                    if (key == grade) {
                        str += '<input type="radio" name="grade" value="' + key + '" title="' + value + '" checked></input>';
                    } else {
                        str += '<input type="radio" name="grade" value="' + key + '" title="' + value + '"></input>';
                    };
                };
                $("#limit").html(str);
                form.render();
            }
        });
    };
    getGradeFn();

    var userSection = function () {
        http({
            url: urls.userSection,
            type: "post",
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var key = dataItem.pk,
                        value = dataItem.fields.section;
                    if (key == ofSection) {
                        str += '<input type="radio" name="ofSection" value="' + key + '" title="' + value + '" checked></input>';
                    } else {
                        str += '<input type="radio" name="ofSection" value="' + key + '" title="' + value + '"></input>';
                    };
                };
                $("#ofSection").html(str);
                form.render();
            }
        });
    };
    userSection();

    // 修改
    form.on('submit(subbtn)', function (data) {
        data = data.field;
        data.id = id;
        if (!data.password) {
            delete data.password
        };
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
