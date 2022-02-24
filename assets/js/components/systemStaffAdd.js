layui.define(["http", "utils"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var $ = layui.$,
        form = layui.form;

    var staffXmList = layui.utils.staffXmList;

    var xm = xmSelect.render({
        el: '#siteList',
        tips: '请至少选择一个值班日期',
        name: 'onDuty',
        layVerify: 'required',
        layReqText: '请至少选择一个值班日期!',
        prop: {
            name: 'name',
            value: 'id'
        },
        model: {
            label: {
                type: 'xmselect',
                xmselect: {
                    template: function (data, sels) {
                        return "选中 " + sels.length + " 项, 共 " + data.length + " 项"
                    }
                }
            }
        },
        toolbar: {
            show: true,
            showIcon: false
        },
        filterable: true,
        data: staffXmList
    });

    function getListFn() {
        http({
            url: urls.personnelUser,
            success: function (res) {
                var data = res.data;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].id + '">' + data[i].userName + '</option>';
                };
                $("#ofUser").html(str);
                form.render();
            }
        });
    };
    getListFn();
    //添加
    form.on('submit(subbtn)', function (data) {
        var data = data.field;
        if (data.ofUser == '') {
            layer.msg("请选择归属账号", {
                icon: 2, shift: 6,
            });
            return false;
        };
        var onDuty = data.onDuty.split(",");
        for (var i = 0; i < onDuty.length; i++) {
            onDuty[i] = Number(onDuty[i]);
        };
        onDuty.sort(function (a, b) {
            return a - b;
        });
        data.onDuty = onDuty.join(',');
        http({
            url: urls.personnelAdd,
            type: "post",
            data: data,
            success: function (res) {
                layer.msg(res.msg, {
                    time: 1500
                }, function () {
                    parent.ReLoadFn();
                });
            }
        });
        return false;
    });
    e("systemStaffAdd", {})
});
