layui.define(["http", "utils"], function (e) {
    var http = layui.http,
        urls = layui.urls,
        getFn = layui.getFn;

    var form = layui.form;

    var staffXmList = layui.utils.staffXmList;

    var id = getFn.locaStr('id');

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

    //获取详情
    function getDetaFn() {
        http({
            url: urls.personnelChange,
            data: { id: id },
            success: function (res) {
                var data = res.data.fields;
                var duty = data.onDuty.split(",");
                xm.setValue(duty);
                form.val('example', {
                    "id": res.data.pk,
                    "personnel": data.personnel,
                    "mobile": data.mobile,
                    "Type": data.Type,
                    "ofUser": data.ofUser,
                });
            }
        });
    };
    getDetaFn();


    //修改
    form.on('submit(subbtn)', function (data) {
        var data = data.field;
        var onDuty = data.onDuty.split(",");
        for (var i = 0; i < onDuty.length; i++) {
            onDuty[i] = Number(onDuty[i]);
        };
        onDuty.sort(function (a, b) {
            return a - b;
        });
        data.onDuty = onDuty.join(',');
        http({
            url: urls.personnelChange,
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

    e("systemStaffChange", {})
});
