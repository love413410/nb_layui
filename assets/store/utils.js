layui.define(function (e) {
    var service = 'development';//开发
    // var service = 'deploy';//部署
    var baseUrl, baseFileUrl;
    var baseOrigin = window.location.origin || window.location.protocol + "//" + window.location.host;
    var pathName = window.document.location.pathname;
    var basePath = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    var isPath = basePath == "/dist" ? '' : "/dist";

    var pathIndex;
    if (service == 'development') {
        baseUrl = 'http://192.168.1.178:8006';
        pathIndex = pathName == "/dist/" || pathName == "/dist/index.html";
    }
    if (service == 'deploy') {
        baseUrl = baseOrigin;
        pathIndex = pathName.indexOf("/static/dist/index.html") > -1;
    }
    baseFileUrl = baseOrigin + basePath + isPath;


    // 截取页面传参
    function locaStr(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    };

    var admin = 1, instAdmin = 2, duty = 4, generAdmin = 5;
    //admin:1,//超级管理员
    //instAdmin: 2,//仪器管理员
    //duty: 4,//值班用户
    //generAdmin: 5//普通管理员
    var grade = {
        admin: admin,
        instAdmin: instAdmin,
        duty: duty,
        generAdmin: generAdmin
    };

    e("utils", {
        baseUrl: baseUrl,
        baseFileUrl: baseFileUrl,
        pathIndex: pathIndex,
        locaStr: locaStr,
        grade: grade
    });
});