layui.define(["http", "getFn", "tabList"], function (e) {
    var store = layui.store;

    var http = layui.http,
        urls = layui.urls,
        getFn = layui.getFn,
        tabList = layui.tabList;

    var form = layui.form,
        table = layui.table,
        laydate = layui.laydate;


    var startTime = getFn.initDate(),
        endTime = getFn.initDate();

    laydate.render({
        elem: '#date',
        range: "~",
        value: startTime + "\xa0" + "~" + "\xa0" + endTime,
        max: 0,
        btns: ['now', 'confirm'],
    });

    var tableIns, page = 1;
    window.getListFn = function () {
        tableIns = tabList.render({
            url: urls.workList,
            where: {
                startTime: startTime,
                endTime: endTime
            },
            cols: [
                [{
                    title: '上传时间',
                    width: 180,
                    templet: function (item) {
                        return item.fields.Time;
                    }
                }, {
                    title: 'DOC路径',
                    templet: function (item) {
                        return item.fields.srcFile;
                    }
                }, {
                    title: 'PDF路径',
                    templet: function (item) {
                        return item.fields.pdfFile;
                    }
                }, {
                    fixed: 'right',
                    align: "center",
                    title: '操作',
                    toolbar: '#toolbar',
                    width: 180
                }]
            ],
            page: 1,
            done: function (data, curr) { page = curr; }
        });
    };
    getListFn();
    // 查询按钮
    form.on('submit(subBtn)', function (data) {
        var date = data.field.date;
        var idx = date.indexOf("~");
        startTime = date.substring(0, idx).trim();
        endTime = date.substring(idx + 1).trim();
        getListFn();
    });
    // 上传按钮
    form.on('submit(addBtn)', function () {
        var title = "上传文档", url = store.filterUrl("businessArchivesUpload");
        layer.open({
            type: 2,
            title: title,
            resize: !1,
            skin: "layui_layer",
            id: "id",
            area: ["630px", "340px"],
            content: url
        });
    });
    // 重载当前页面
    window.ReLoadFn = function () {
        layer.closeAll(function () {
            tableIns.reload({
                page: { curr: page }
            });
        });
    };

    var clickMethod = {
        look: function (params) {
            params = params.fields;
            var fileUrl = params.url + params.pdfFile + '';
            window.top.open(fileUrl);
        },
        load: function (params) {
            params = params.fields;
            var fileUrl = params.url + params.srcFile + '';
            window.top.location.href = fileUrl;
        },
        del: function (params) {
            layer.msg('此操作将永久删除该数据, 是否继续?', {
                time: 5000,
                shade: 0.5,
                btn: ['确定', '取消'],
                yes: function () {
                    http({
                        url: urls.workDlete,
                        type: 'post',
                        data: { id: params.pk },
                        success: function (res) {
                            layer.msg(res.msg, {
                                time: 1500
                            }, function () {
                                ReLoadFn();
                            });
                        }
                    });
                },
                btn2: function () {
                    layer.msg('已取消删除。');
                }
            });
        }
    };
    table.on('tool(table)', function (data) {
        var event = data.event;
        clickMethod[event](data.data);
    });
    e("businessArchives", {})
});
