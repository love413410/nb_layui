
layui.define(["http"], function (e) {
    var store = layui.store;

    var urls = layui.urls;
    var upload = layui.upload;

    var token = store.getSessionData("token") || '';

    upload.render({
        elem: '#upload',
        url: urls.workUpload,
        accept: "file",
        acceptMime: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        exts: 'doc|docx',
        headers: {
            token: token
        },
        before: function () {
            layer.load();
        },
        done: function (res) {
            layer.msg(res.msg);
            layer.closeAll('loading');
            parent.ReLoadFn();
        },
        error: function () {
            layer.closeAll('loading');
        }
    });
    e("businessArchivesUpload", {})
});
