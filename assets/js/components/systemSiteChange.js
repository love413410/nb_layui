layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls,
        getFn = layui.getFn;

    var $ = layui.$,
        form = layui.form,
        upload = layui.upload,
        laydate = layui.laydate;

    var id = getFn.locaStr('id');

    laydate.render({
        elem: "#buildTime",
        value: getFn.initDate(),
        max: 0,
        btns: ['now', 'confirm']
    });
    laydate.render({
        elem: "#enableTime",
        value: getFn.initDate(),
        max: 0,
        btns: ['now', 'confirm']
    });

    var typeId;

    var deta;
    // 获取各种类型
    function getTypeFn() {
        // 站点类型
        http({
            url: urls.siteType,
            async: false,
            success: function (res) {
                var data = res.data;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.Type + '</option>';
                };
                $("#sitetype").html(str);
                form.render();
            }
        });
        // 所属类型
        http({
            url: urls.siteStyle,
            async: false,
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.Name + '</option>';
                };
                $("#oftype").html(str);
                form.render();
            }
        });
        // 所在区域
        http({
            url: urls.siteStyle,
            type: "post",
            async: false,
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.Name + '</option>';
                };
                $("#ofarea").html(str);
                form.render();
            }
        });
        // 所属岸段
        http({
            url: urls.sectionList,
            data: {
                pageNum: "",//空查全部
                pageSize: "" //空查全部
            },
            async: false,
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    var key = data[i].pk,
                        value = data[i].fields.section;
                    str += '<option value="' + key + '">' + value + '</option>';
                };
                $("#section").html(str);
                form.render();
            }
        });
        // 要素
        http({
            url: urls.siteEl,
            data: { type: typeId },
            async: false,
            success: function (res) {
                var data = res.data;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i].fields;
                    str += '<input type="checkbox" class="like" lay-skin="primary" value="' + dataItem.el + '" title="' + dataItem.Name + '"></input>';
                };
                $("#checkbox").html(str);
                form.render();
            }
        });
        // 站点图片
        http({
            url: urls.siteImageList,
            data: { id: id },
            async: false,
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    var id = data[i].pk, url = data[i].fields.imgSrc;
                    str += '<div class="swiper-slide img_item" id="' + id + '" >' +
                        '<img src="' + url + '" title="点击全屏查看" class="img">' +
                        '<i class="layui-icon" title="删除该图片">&#x1006;</i>' +
                        '</div>';
                };
                $("#imgListBox").html(str);
            }
        });
        var data = deta.fields;
        form.val('changeForm', {
            "id": deta.pk,
            "Type": data.Type,
            "ofType": data.ofType,
            "ofArea": data.ofArea,
            "section": data.section,

            "stationName": data.stationName,
            "stationNumCode": data.stationNumCode,
            "ip": data.ip,
            "handleTime": data.handleTime,
            "delayTime": data.delayTime,
            "Lon": data.Lon,
            "Lat": data.Lat,
            "buildTime": data.buildTime,
            "enableTime": data.enableTime,
            "state": data.state,
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
    };

    form.on('select(sitetype)', function (data) {
        var type = data.value;
        http({
            url: urls.siteEl,
            data: { type: type },
            async: false,
            success: function (res) {
                var data = res.data, str = '';
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i].fields;
                    str += '<input type="checkbox" class="like" lay-skin="primary" value="' + dataItem.el + '" title="' + dataItem.Name + '"></input>';
                };
                $("#checkbox").html(str);
                form.render('checkbox');

                var element = deta.fields.element.split(',');
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
    });
    //获取详情
    var getDetaFn = function () {
        http({
            url: urls.siteChange,
            data: { id: id },
            success: function (res) {
                deta = res.data;
                typeId = deta.fields.Type;
                getTypeFn();
            }
        });
    };
    getDetaFn();
    var token = layui.sessionData('token').key || '';
    var uploadInst = upload.render({
        elem: '#upload',
        url: urls.siteImage,
        headers: {
            'token': token
        },
        data: { id: id },
        accept: 'file',
        acceptMime: 'image/jpeg,image/png',
        exts: 'jpg|png',
        size: 2048,
        multiple: true,
        number: 0,
        done: function (res) {
            var id = res.id, url = res.url;
            var str = '<div class="swiper-slide img_item" id="' + id + '" >' +
                '<img src="' + url + '" title="点击全屏查看" class="img">' +
                '<i class="layui-icon" title="删除该图片">&#x1006;</i>' +
                '</div>';
            $("#imgListBox").append(str);
        }
    });
    // 删除图片
    $("#imgListBox").on('click', 'i', function () {
        var id = $(this).parent().attr("id");
        var _this = $(this);
        layer.msg('此操作将永久删除该数据, 是否继续?', {
            time: 5000,
            shade: 0,
            btn: ['确定', '取消'],
            yes: function () {
                http({
                    url: urls.siteImageDelete,
                    type: "post",
                    data: { id: id },
                    success: function (res) {
                        layer.msg(res.msg, {
                            time: 1500
                        }, function () {
                            _this.parent().remove();
                        });
                    }
                });
            },
            btn2: function () {
                layer.msg('已取消删除。');
            }
        })
    });
    // 全屏查看图片
    $("#imgListBox").on('click', 'img', function () {
        var id = $(this).parent().attr("id");
        parent.layerImg(id);
    });

    form.on('submit(subbtn)', function (data) {
        var data = data.field;
        var arr = [];
        $('#checkbox .like').each(function () {
            var is = $(this).is(":checked");
            is ? arr.push($(this).val()) : "";
        });
        data.element = arr.join(',');
        var section = data.section;
        if (!section) {
            layer.msg("请选择所属岸段", {
                anim: 6,
                icon: 5
            });
            return;
        };
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
    });

    e("systemSiteChange", {})
});
