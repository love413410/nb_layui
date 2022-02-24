

layui.define(["http"], function (e) {
    var form = layui.form;

    var player = document.getElementById('live');
    var url="http://192.168.1.120:8080/live?port=1935&app=live&stream=test2";
    if (flvjs.isSupported()) {
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: url,
            "isLive": true,//<====加个这个 
            hasAudio: false,
            hasVideo: true,
            //withCredentials: false,
            //cors: true
        }, {
            enableWorker: true,	// 开启多线程
            enableStashBuffer: false,
            lazyLoad: false,
            lazyLoadMaxDuration: 0,
            lazyLoadRecoverDuration: 0,
            deferLoadAfterSourceOpen: false,
            fixAudioTimestampGap: true,
            autoCleanupSourceBuffer: true,
        });
        flvPlayer.attachMediaElement(player);
        flvPlayer.load(); //加载
        // flv_start();
    };

    
    form.on('submit(subBtn)', function (data) {

    });

    e("live", {});
});