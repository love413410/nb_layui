

layui.define(["http", "utils"], function (e) {

    var http = layui.http,
        urls = layui.urls;

    var form = layui.form;

    var live = layui.utils.live;

    function getTree() {
        http({
            url: urls.videoTree,
            success: function (res) {
                xmSelect.render({
                    el: '#siteList',
                    tips: '请选择视频',
                    name: 'id',
                    prop: {
                        name: 'title',
                        value: 'id'
                    },

                    tree: {
                        show: true,
                        strict: false,
                        expandedKeys: true,
                    },
                    radio: true,
                    clickClose: true,
                    model: { label: { type: 'text' } },
                    toolbar: {
                        show: true,
                        showIcon: false
                    },
                    filterable: true,
                    data: res.data
                })
            }
        });
    };
    getTree();

    var playUrl = urls.base + ":" + live.livePort + "/" + live.live + "?port=" + live.playPort + "&app=" + live.app + "&stream="
    // var url = "http://192.168.1.156:8080/live?port=1935&app=live&stream=" + stream;
    form.on('submit(subBtn)', function (data) {
        var id = data.field.id;
        http({
            url: urls.videoDeta,
            data: { id: id },
            success: function (res) {
                var data = res.data.fields;
                var stream = data.ip;
                var url = playUrl + stream;
                flvPlay(url);
            }
        });

        function flvPlay(url) {
            var player = document.getElementById('live');
            if (flvjs.isSupported()) {
                var flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    url: url,
                    "isLive": true,
                    hasAudio: false,
                    hasVideo: true,
                }, {
                    enableWorker: true,
                    enableStashBuffer: false,
                    lazyLoad: false,
                    lazyLoadMaxDuration: 0,
                    lazyLoadRecoverDuration: 0,
                    deferLoadAfterSourceOpen: false,
                    fixAudioTimestampGap: true,
                    autoCleanupSourceBuffer: true,
                });
                flvPlayer.attachMediaElement(player);
                flvPlayer.load();
            };
        };
    });

    // ffmpeg -rtsp_transport tcp -i rtsp://admin:launchang2001@192.168.1.65:554/h264/ch1/main/av_stream -vcodec copy -acodec copy -vbsf h264_mp4toannexb -f flv rtmp://192.168.1.204:1935/live/test2
    // ffmpeg -rtsp_transport tcp -i rtsp://admin:launchang2001@192.168.1.64:554/h264/ch1/main/av_stream -vcodec copy -acodec copy -vbsf h264_mp4toannexb -f flv rtmp://192.168.1.204:1935/live/test3

    e("live", {});
});