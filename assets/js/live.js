

layui.define(["http"], function (e) {

    var http = layui.http,
        urls = layui.urls;

    var $ = layui.$,
        form = layui.form,
        tree = layui.tree,
        layer = layui.layer;

    var baseFileUrl = urls.baseFileUrl;

    var videoId = "", playList = {};
    function getTree() {
        http({
            url: urls.videoTree,
            success: function (res) {
                var data = res.data;
                var isClick = false;
                tree.render({
                    elem: '#siteList',
                    data: data,
                    accordion: 1,
                    click: function (obj) {
                        if (isClick) {
                            videoId = obj.data.id;
                            iRet == -1 ? loadWebKit() : videoDeta();
                        } else {
                            isClick = true;
                        };
                        setTimeout(function () {
                            isClick = false
                        }, 800);
                    }
                });
            }
        });
    };
    getTree();

    function loadWebKit() {
        layer.confirm('您还未安装过插件，点击按钮进行下载', {
            btn: ['下载', '取消']
        }, function () {
            layer.msg('根据浏览器选择', {
                btn: ['32位(建议)', '64位'],
                yes: function (index) {
                    var href = baseFileUrl + '/assets/lib/WebComponentsKit32.exe';
                    window.top.location.href = href;
                    layer.closeAll();
                },
                btn2: function () {
                    var href = baseFileUrl + '/assets/lib/WebComponentsKit64.exe';
                    window.top.location.href = href;
                }
            })
        });
    };
    var iRet = -1;

    function iRetFn() {
        iRet = WebVideoCtrl.I_CheckPluginInstall();
        iRet == -1 ? loadWebKit() : "";
    };
    iRetFn();

    // 播放
    form.on('submit(playBtn)', function (data) {
        videoId = data.field.id;
        iRet == -1 ? loadWebKit() : videoDeta();
    });
    // 停止播放
    form.on('submit(stopPlay)', function (data) {
        stopRealPlay();
    });
    // 更换屏幕
    form.on('select(selectChange)', function (data) {
        var value = data.value;
        WebVideoCtrl.I_ChangeWndNum(parseInt(value, 10));
    });
    // 摄像头详情
    var videoName = "";
    function videoDeta() {
        http({
            url: urls.videoDeta,
            data: { id: videoId },
            success: function (res) {
                var data = res.data.fields;
                videoName = data.videoName;
                var loginData = playList[videoId];
                !loginData ? clickLogin(data.account, data.passWord, data.ip) : startRealPlay(loginData);
            }
        });
    };
    var width = $("#live").width(), height = $("#live").height();
    var g_iWndIndex = 0;
    WebVideoCtrl.I_InitPlugin(width, height, {
        // WebVideoCtrl.I_InitPlugin(960, 540, {
        iWndowType: 2,
        bNoPlugin: true,
        cbSelWnd: function (xmlDoc) {
            g_iWndIndex = parseInt($(xmlDoc).find("SelectWnd").eq(0).text(), 10);
        },
        cbInitPluginComplete: function () {
            WebVideoCtrl.I_InsertOBJECTPlugin("live");
        }
    });
    // 登录监控
    function clickLogin(username, password, ip) {
        var port = 80;
        WebVideoCtrl.I_Login(ip, 1, port, username, password, {
            success: function () {
                var loginData = ip + '_' + port;
                startRealPlay(loginData);
            },
            error: function () {
                showOPInfo(videoName + " 登录失败！");
            }
        });
    };
    // 预览监控
    function startRealPlay(loginData) {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
        var realPlay = function () {
            WebVideoCtrl.I_StartRealPlay(loginData, {
                iStreamType: 2,
                success: function () {
                    playList[videoId] = loginData;
                },
                error: function () {
                    showOPInfo(videoName + '开始预览失败！');
                }
            });
        };
        if (oWndInfo != null) {
            WebVideoCtrl.I_Stop({
                success: function () {
                    realPlay();
                }
            });
        } else {
            realPlay();
        }
    };
    function stopRealPlay() {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
        if (oWndInfo != null) {
            WebVideoCtrl.I_Stop({
                error: function () {
                    showOPInfo(videoName + "停止预览失败！");
                }
            });
        }
    };
    function showOPInfo(val) {
        $("#text").html(val)
    };
    e("live", {});
});