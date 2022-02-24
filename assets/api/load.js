// layui.define(["http"], function (e) {
//     var http = layui.http;
//     var isClick = true;

//     function load(url, type, data, succFn) {
//         var type = type || "post";
//         if (!isClick) {
//             layer.msg("点太快了,休息一下吧!");
//             return false;
//         };
//         isClick = false;
//         http({
//             url: url,
//             type: type,
//             data: data,
//             success: function (res) {
//                 var url = res.url;
//                 window.location.href = url;
//                 succFn ? succFn() : "";
//             },
//             complete: function (r) {
//                 setTimeout(function () {
//                     isClick = true;
//                 }, 5000);
//             }
//         });
//     };
//     e('load', load);
// });
layui.define(["http"], function (e) {
    var http = layui.http;
    var loading, isClick = true;
    function load(url, type, data, index) {
        var type = type || "post";
        if (!isClick) {
            layer.msg("点太快了,休息一下吧!");
            return false;
        };
        isClick = false;
        http({
            url: url,
            type: type,
            data: data,
            beforeSend: function (bef) {
                loading = layer.load(1, {
                    shade: [0.5, '#fff']
                });
            },
            success: function (res) {
                var url = res.url;
                window.location.href = url;
                if (!index) {
                    return false;
                };
                var isArray = index.__proto__ === Array.prototype;
                if (isArray) {
                    for (var i = 0; i < index.length; i++) {
                        layer.close(index[i]);
                    };
                    return false;
                };
                layer.close(index);
            },
            complete: function (r) {
                setTimeout(function () {
                    isClick = true;
                }, 5000);
                layer.close(loading);
            }
        });
    };
    e('load', load);
});
