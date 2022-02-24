layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var $ = layui.$,
        form = layui.form;
        
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
                var data = res.data,str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.Name + '</option>';
                };
                $("#oftype").html(str);
                form.render();
            }
        });
        http({
            url: urls.siteStyle,
            type:"post",
            success: function (res) {
                var data = res.data,str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.Name + '</option>';
                };
                $("#ofarea").html(str);
                form.render();
            }
        });
    };
    getTypeFn();

    form.on('select(sitetype)', function (data) {
        typeId = data.value;
        getElementFn();
    });

    function getElementFn() {
        $("#checkbox").empty();
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
            url: urls.siteAdd,
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

    e("systemSiteAdd", {})
});
