layui.define(["http", "store", "utils"], function (e) {
    var http = layui.http,
        urls = layui.urls;

    var store = layui.store,
        utils = layui.utils;

    var $ = layui.$;

    function setTimeFn() {
        var date = new Date();
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        date = date.toJSON().substr(0, 19).replace(/T/g, ' ');
        $('#headDate').html(date);
        setTimeout(setTimeFn, 500);
    };
    setTimeFn();

    var userName = store.getSessionData('userName');
    $("#users").html(userName);

    window.routerTo = function (url) {
        store.toRouter(url);
    };

    var isIe = layui.device().ie;
    window.alrliveFn = function () {
        if (!isIe) {
            layer.msg("请使用最新版IE打开")
            return;
        };
        var iRet = WebVideoCtrl.I_CheckPluginInstall();
        if (-1 == iRet) {
            alrHtmlFn('down.html', '下载监控插件', '400px', '300px');
            return;
        };
        window.open('./real.html');
    };
    function isSign() {
        http({
            url: urls.personnelSign,
            type: "post",
            success: function (res) {
                if (res.code == 200) {
                    $("#singTips").show();
                    $("#isSign").show();
                }
            },
            complete: function () {
                setTimeout(function () {
                    isSign();
                }, 1800000);
            }
        });
    };
    isSign();
    // 值班签到
    $("#menuBtn").click(function () {
        http({
            url: urls.personnelSign,
            success: function (res) {
                layer.msg(res.msg, {
                    time: 1500
                }, function () {
                    $("#singTips").hide();
                    $("#isSign").hide();
                });
            }
        });
    });
    // 退出
    $("#outBtn").click(function () {
        store.logOut();
    });

    // 判断权限
    function isNoFn() {
        var grade = store.getSessionData("grade");
        grade.indexOf(utils.grade.duty) > -1 ? $("#menuBtn").show() : $("#menuBtn").hide();
        // console.log(userName)
        // grade.userList.indexOf(userName) > -1 ?
        // grade.userList.indexOf("username") > -1 ? $("#admin [name='uniHide']").show() : $("#admin [name='uniHide']").hide();
    };
    isNoFn();
    e("mapInit", {})
});


