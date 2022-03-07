
layui.define(["http"], function (e) {
    
    var urls = layui.urls;
    var upload = layui.upload;

    var token = layui.sessionData('token').key || '';

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
            layer.closeAll('loading');
            if (res.code == 209) {
                layer.msg(res.msg);
                return false;
            };
            parent.ReLoadFn();
        },
        error: function () {
            layer.closeAll('loading');
        }
    });
    e("businessArchivesUpload", {})
});
