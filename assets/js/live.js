

layui.define(["http"], function (e) {

    var http = layui.http,
        urls = layui.urls;

    var $ = layui.$,
        form = layui.form,
        layer = layui.layer;

    var baseFileUrl = urls.baseFileUrl;

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
                        expandedKeys: true,
                        strict: true,
                        showLine: false,
                    },
                    iconfont: {
                        parent: "hidden"
                    },
                    radio: true,
                    clickClose: true,
                    model: { label: { type: 'text' } },
                    filterable: true,
                    data: res.data
                })
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

    var videoId = "", videoName = "";
    // 播放
    form.on('submit(playBtn)', function (data) {
        videoId = data.field.id;
        iRet == -1 ? loadWebKit() : videoDeta();
    });
    // 停止播放
    form.on('submit(stopPlay)', function (data) {
        clickStopRealPlay();
    });
    // 更换屏幕
    form.on('select(selectChange)', function (data) {
        var value = data.value;
        WebVideoCtrl.I_ChangeWndNum(parseInt(value, 10));
    });
    // 摄像头详情
    function videoDeta() {
        http({
            url: urls.videoDeta,
            data: { id: videoId },
            success: function (res) {
                var data = res.data.fields;
                videoName = data.videoName;
                clickLogin(data.account, data.passWord, data.ip);
            }
        });
    };

    var g_iWndIndex = 0;
    WebVideoCtrl.I_InitPlugin(960, 540, {
        iWndowType: 2,
        bNoPlugin: true,
        cbSelWnd: function (xmlDoc) {
            g_iWndIndex = parseInt($(xmlDoc).find("SelectWnd").eq(0).text(), 10);
        },
        cbInitPluginComplete: function () {
            WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
        }
    });

    function clickLogin(username, password, ip) {
        var port = 80;
        WebVideoCtrl.I_Login(ip, 1, port, username, password, {
            success: function (xmlDoc) {
                var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
                var startRealPlay = function () {
                    WebVideoCtrl.I_StartRealPlay(ip + '_' + port, {
                        iStreamType: 2,
                        error: function (status, xmlDoc) {
                            showOPInfo(videoName + '开始预览失败！');
                        }
                    });
                };
                if (oWndInfo != null) {
                    WebVideoCtrl.I_Stop({
                        success: function () {
                            startRealPlay();
                        }
                    });
                } else {
                    startRealPlay();
                };
            },
            error: function (status, xmlDoc) {
                showOPInfo(videoName + " 登录失败！");
            }
        });
    };
    function clickStopRealPlay() {
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