layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls,
        getFn = layui.getFn;

    var $ = layui.$,
        form = layui.form,
        laydate = layui.laydate;

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
                    str += '<option value="' + data[i].pk + '">' + data[i].fields.section + '</option>';
                };
                $("#section").html(str);
                form.render();
            }
        });
    };

    form.on('submit(subbtn)', function (data) {
        data = data.field;
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
    });

    e("systemSiteAdd", {})
});
