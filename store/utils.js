layui.extend({
    urls: "../assets/api/urls",
}).define(["urls"], function (e) {

    var instObsState = [
        { id: 0, title: "正常", color: "#009688" },
        { id: 1, title: "故障", color: "#FFB800" },
        { id: 2, title: "报废", color: "#f00" }
    ];
    var staffXmList = [];
    for (var i = 1; i <= 31; i++) {
        staffXmList.push({
            id: i,
            name: i + "号"
        })
    };

    // 截取页面传参
    function locaStr(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    };

    function differ(actual, list) {
        actual = actual.indexOf(',') > 0 ? actual.split(',') : actual;
        var result = false;
        for (var i = 0; i < actual.length; i++) {
            for (var j = 0; j < list.length; j++) {
                if (actual[i] == list[j]) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    };
    var userList = ["admin"];//超管列表

    var admin = 1, instAdmin = 2, duty = 4, generAdmin = 5;
    //admin:1,//超级管理员
    //instAdmin: 2,//仪器管理员
    //duty: 4,//值班用户
    //generAdmin: 5//普通管理员
    var grade = {
        admin: admin,
        instAdmin: instAdmin,
        duty: duty,
        generAdmin: generAdmin,
        siteAction: [admin, generAdmin],
        instAction: [admin, instAdmin],
        queryAction: [admin, instAdmin, duty, generAdmin],
        systemAction: [admin, generAdmin],
        dutyAction: [duty],
        recordAction: [admin, instAdmin, duty, generAdmin],
        liveAction: [admin, instAdmin, duty, generAdmin],
    };

    var live = {
        livePort: 8080,//视频端口号
        playPort: 1935,//拉流端口号
        live: "live",//接口名,
        app: "live"
    };
    e("utils", {
        instObsState: instObsState,
        staffXmList: staffXmList,
        locaStr: locaStr,
        differ: differ,
        userList: userList,
        grade: grade,
        live: live
    });
});