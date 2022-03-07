layui.define(["http", "getFn"], function (e) {
    var http = layui.http,
        urls = layui.urls,
        getFn = layui.getFn;

    var $ = layui.$,
        form = layui.form,
        upload = layui.upload,
        laydate = layui.laydate;

    var token = layui.sessionData('token').key;
    var id = getFn.locaStr('id');

    var date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    var value = date.toJSON().substr(0, 19).replace(/T/g, ' ');

    laydate.render({
        elem: "#time",
        type: 'datetime',
        trigger: 'click',
        value: value,
        btns: ['now', 'confirm']
    });
    laydate.render({
        elem: "#nextTime",
        type: 'datetime',
        trigger: 'click',
        value: value,
        min: 0,
        btns: ['now', 'confirm']
    });


    var isUpload = false;
    upload.render({
        elem: '#upload',
        url: urls.fileUpload,
        accept: "file",
        acceptMime: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        exts: 'doc|docx',
        // multiple: true,
        auto: false,
        headers: {
            token: token
        },
        bindAction: '#uploadBtn',
        choose: function (obj) {
            files = this.files = obj.pushFile();
            obj.preview(preview);
        },
        done: function (res) {
            if (res.code == 209) {
                layer.msg(res.msg);
                return false;
            };
            var data = form.val('example');
            data.srcFile = res.srcFile;
            data.pdfFile = res.pdfFile;
            data.id = id;
            delete data.file;

            http({
                url: urls.useCompare,
                type: 'post',
                data: data,
                success: function (res) {
                    isUpload = false;
                    layer.msg(res.msg, {
                        time: 1500
                    }, function () {
                        parent.ReLoadFn();
                    });
                }
            });
        }
    });

    var files, listView = $('#fileTbody');
    function preview(index, file, result) {
        isUpload = true;

        var fileName = file.name;
        // var fileIndex = fileName.lastIndexOf(".");
        // var fileType = fileName.substring(fileIndex + 1);
        var fileSize = (file.size / 1024).toFixed(1);
        var maxSize = 50, fileText = "文件";
        // if (fileType == "jpg" || fileType == "png") {
        //     maxSize = 5;
        //     fileText = "图片";
        // } else {
        //     maxSize = 50;
        //     fileText = "文件";
        // };
        var fileMaxSize = maxSize * 1024;
        if (fileMaxSize < fileSize) {
            layer.msg(fileText + "最大" + maxSize + "M", {
                icon: 2, shift: 6,
            });
            delete files[index];
            return false;
        };

        var item = $([
            '<div class="layui-file-item" id="upload-' + index + '">',
            '<p>' + fileName + '</p>',
            '<p>' + fileSize + 'kb</p>',
            '<p>等待上传</p>',
            '<p>',
            '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>',
            '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>',
            '</p>',
            '</div>'
        ].join(''));

        item.find('.demo-delete').on('click', function () {
            delete files[index];
            item.remove();
            uploadListIns.config.elem.next()[0].value = '';
            isUpload = false;
        });
        listView.append(item);
    };
    // 提交
    form.on('submit(addBtn)', function (data) {
        if (!isUpload) {
            layer.msg("请上传附件", {
                icon: 2, shift: 6,
            });
            return;
        };
        $("#uploadBtn").click();
    });
    e("instReuseContrast", {})
});
