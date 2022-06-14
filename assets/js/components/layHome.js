layui.define(["http"], function (e) {
    var utils = layui.utils;

    var http = layui.http,
        urls = layui.urls;

    var $ = layui.$,
        form = layui.form;

    var id = utils.locaStr('id');

    var getDetaFn = function () {
        http({
            url: urls.indexClock,
            data: { id: id },
            success: function (res) {
                var data = res.data;
                form.val('layForm', {
                    "Type": data.Type,
                    "ofType": data.ofType,
                    "ofArea": data.ofArea,
                    "section": data.section,

                    "stationName": data.stationName,
                    "stationNumCode": data.stationNumCode,
                    "Lon": data.Lon,
                    "Lat": data.Lat,
                    "buildTime": data.buildTime,
                    "enableTime": data.enableTime
                });

                var img = data.img, str = '';
                for (var i = 0; i < img.length; i++) {
                    str += '<div class="swiper-slide">' +
                        '<img src="' + img[i] + '" title="点击全屏查看" class="img" index="' + i + '">' +
                        '</div>';
                };
                $("#imgListBox").html(str);

                var el = data.el, arr = [];
                for (var j = 0; j < el.length; j++) {
                    arr.push('<div class="layui-form-item">' +
                        '<label class="layui-form-label">' + el[j].key + '</label>' +
                        '<div class="layui-input-block">' +
                        '<input type="text" value="' + el[j].value + '" disabled class="layui-input" />' +
                        '</div>' +
                        '</div>')
                };
                $("#form").append(arr.join(''));
            }
        });
    };
    // 全屏查看图片
    $("#imgListBox").on('click', 'img', function () {
        var index = $(this).attr("id");
        parent.layerImg(id, index);
    });

    var sectionList = {};
    var getTypeFn = function () {
        http({
            url: urls.sectionList,
            data: {
                pageNum: "",
                pageSize: ""
            },
            success: function (res) {
                var data = res.data;
                for (var i = 0; i < data.length; i++) {
                    var key = data[i].pk, value = data[i].fields.section;
                    sectionList[key] = value;
                };
                getDetaFn();
            }
        });
    };
    getTypeFn();
    e("layHome", {});
});
