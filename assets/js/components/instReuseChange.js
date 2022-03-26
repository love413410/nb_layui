layui.define(["http"], function (e) {

    var utils = layui.utils;

    var http = layui.http,
        urls = layui.urls;

    var $ = layui.$,
        form = layui.form,
        laydate = layui.laydate;

    var id = utils.locaStr('id');

    var typeId, siteId;
    function getTypeFn() {
        http({
            url: urls.siteType,
            success: function (res) {
                var data = res.data;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.Type + '</option>';
                };
                $("#sitetype").html(str);
                form.render();
                getDetaFn();
            }
        });
    };
    getTypeFn();

    function getDetaFn() {
        http({
            url: urls.useDetail,
            data: { id: id },
            success: function (res) {
                var data = res.data.fields;
                typeId = data.stationType, siteId = data.ofStation;
                form.val('example', {
                    "id": id,
                    "sitetype": data.stationType,
                    "outTime": data.outTime,
                    "supplier": data.supplier,
                    "Type": data.Type,
                    "serialNumber": data.serialNumber,
                    "outPeople": data.outPeople,
                    "usRemark": data.usRemark
                });
                laydate.render({
                    elem: "#expireTime",
                    trigger: 'click',
                    min: data.outTime
                });
                getSiteFn();
            }
        });
    };

    form.on('select(siteType)', function (data) {
        typeId = data.value;
        siteId = "";
        getSiteFn();
    });
    function getSiteFn() {
        http({
            url: urls.dataList,
            data: { type: typeId },
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    if (siteId == data[i].pk) {
                        str += '<option value="' + data[i].pk + '" selected>' + data[i].fields.stationName + '</option>';
                    } else {
                        str += '<option value="' + data[i].pk + '">' + data[i].fields.stationName + '</option>';
                    };
                };
                $("#site").html(str);
                form.render();
            }
        });
    };

    form.on('submit(subbtn)', function (data) {
        var data = data.field;
        http({
            url: urls.useChange,
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
    e("instReuseChange", {})
});
