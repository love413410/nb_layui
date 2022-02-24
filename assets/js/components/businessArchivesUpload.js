
layui.define(["http"], function (e) {
    var urls = layui.urls;
    var upload = layui.upload;
    upload.render({
        elem: '#upload',
        url: urls.workUpload,
        accept: "file",
        acceptMime: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        exts: 'doc|docx',
        headers: {
            token: sessionStorage.token
        },
        before: function () {
            layer.load();
        },
        done: function (res) {
            layer.msg(res.msg);
            layer.closeAll('loading');
        },
        error: function () {
            layer.closeAll('loading');
        }
    });
    e("businessArchivesUpload", {})
});
