layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls,
        getFn = layui.getFn;

    var $ = layui.$,
        form = layui.form;

    var id = getFn.locaStr('id');

    var typeId;
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
                typeId = data.length > 0 ? data[0].pk : "";
                getElementFn();
            }
        });

        http({
            url: urls.siteStyle,
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.Name + '</option>';
                };
                $("#oftype").html(str);
                form.render();
            }
        });
        http({
            url: urls.siteStyle,
            type: "post",
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.Name + '</option>';
                };
                $("#ofarea").html(str);
                form.render();
            }
        });

        function getElementFn() {
            http({
                url: urls.siteEl,
                data: { type: typeId },
                success: function (res) {
                    var data = res.data;
                    var str = '';
                    for (var i = 0; i < data.length; i++) {
                        var dataItem = data[i].fields;
                        str += '<input type="checkbox" class="like" lay-skin="primary" value="' + dataItem.el + '" title="' + dataItem.Name + '"></input>';
                    };
                    $("#checkbox").html(str);
                    form.render();
                    getDetaFn();
                }
            });
        };
    };
    getTypeFn();


    //获取详情
    function getDetaFn() {
        http({
            url: urls.siteChange,
            data: { id: id },
            success: function (res) {
                var data = res.data.fields;
                form.val('changeForm', {
                    "id": res.data.pk,
                    "Type": data.Type,
                    "ofType": data.ofType,
                    "ofArea": data.ofArea,
                    
                    "stationName": data.stationName,
                    "stationNumCode": data.stationNumCode,
                    "ip": data.ip,
                    "handleTime": data.handleTime,
                    "delayTime": data.delayTime,
                    "Lon": data.Lon,
                    "Lat": data.Lat,
                    "description": data.description
                });
                var element = data.element.split(',');
                var checkbox = $('.like');

                for (var j = 0; j < element.length; j++) {
                    for (var k = 0; k < checkbox.length; k++) {
                        if (element[j] == checkbox[k].value) {
                            checkbox[k].checked = true;
                        }
                    }
                };
                form.render('checkbox');
            }
        });
    };

    form.on('submit(subbtn)', function (data) {
        var data = data.field;
        var arr = [];
        $('#checkbox .like').each(function () {
            var is = $(this).is(":checked");
            is ? arr.push($(this).val()) : "";
        });
        data.element = arr.join(',');
        http({
            url: urls.siteChange,
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

    e("systemSiteChange", {})
});
