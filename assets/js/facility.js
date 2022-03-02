
layui.define(["http"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var $ = layui.$,
        form = layui.form,
        layer = layui.layer;

    tinymce.init({
        selector: '#content',
        auto_focus: true,
        // width: 1030,
        language: 'zh_CN',
        // skin: 'oxide-dark',
        resize: false,
        statusbar: false,
        autosave_ask_before_unload: false,
        plugins: 'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave',
        toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
        styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
        table image media charmap emoticons hr pagebreak insertdatetime print preview ',

        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',

        // images_upload_handler: function (blobInfo, succFun, failFun) {
        //     var file = blobInfo.blob();
        //     formData = new FormData();
        //     formData.append('file', file, file.name);
        //     $.ajax({
        //         url: urls.signUpload,
        //         type: 'post',
        //         headers: { 'token': sessionStorage.token },
        //         processData: false,
        //         contentType: false,
        //         data: formData,
        //         success: function (res, text, xhr) {
        //             succFun(res.data);
        //         }
        //     })
        // },
        setup: function (ed) {
            ed.on('init', function (e) {
                $(ed.getBody()).on("change", ":checkbox", function (el) {
                    if (el.target.checked) {
                        $(el.target).attr('checked', 'checked');
                    } else {
                        $(el.target).removeAttr('checked');
                    }
                });
            });
            $(ed.getBody()).on("change", "input:radio", function (el) {
                var name = 'input:radio[name="' + el.target.name + '"]';
                $(ed.getBody()).find(name).removeAttr('checked');
                $(el.target).attr('checked', 'checked');
                $(el.target).prop('checked', true);
            });
            $(ed.getBody()).on("change", "select", function (el) {
                $(el.target).children('option').each(function (index) {
                    if (this.selected) {
                        $(this).attr('selected', 'selected');
                    } else {
                        $(this).removeAttr('selected');
                    }
                });
            });
        },
        init_instance_callback: function () {
            getDataFn();
        }
    });

    var time = '1995-02-10';
    function getTime() {
        http({
            url: urls.getInspection,
            success: function (res) {
                var data = res.data, option = '<option value="1995-02-10">默认</option>';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i] + '">' + data[i] + '</option>';
                };
                $("#time").html(option);
                form.val('example', {
                    time: time
                });
                form.render();
                getDataFn();
            }
        });
    };
    function getDataFn() {
        http({
            url: urls.inspection,
            data: { time: time },
            success: function (res) {
                tinyMCE.editors['content'].setContent(res.data);
            }
        });
    };
    // 查询
    form.on('submit(query)', function (data) {
        time = data.field.time;
        layer.msg('查询后内容会覆盖当前模版,请谨慎操作', {
            time: 5000,
            shade: 0.5,
            btn: ['查询', '取消'],
            yes: function () {
                layer.close(layer.index);
                getDataFn();
            }
        });
    });
    // 保存
    form.on('submit(subbtn)', function () {
        var content = tinyMCE.editors['content'].getContent();
        content.length <= 0 ? layer.msg("内容不可为空") : http({
            url: urls.inspection,
            type: "post",
            data: { content: content },
            success: function (res) {
                time = res.time;
                getTime();
                layer.msg(res.msg);
            }
        });
    });
    e("facility", {});
});

