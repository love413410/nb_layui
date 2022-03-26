layui.extend({
    urls: "api/urls",
}).define(["urls"], function (e) {
    var utils = layui.utils,
        urls = layui.urls;

    var baseFileUrl = urls.baseFileUrl,
        grade = utils.grade;
    var router = {
        "index": "/index.html",
        "map": "/views/map.html",
        "404": "/views/system/404.html",
        "500": "/views/system/500.html",
        "501": "/views/system/501.html",
        "sketch": "/views/system/sketch.html",
        "pages/realData": "/views/pages/realData.html",
        "pages/home": "/views/pages/home.html",
        "pages/instSpare": {
            url: "/views/pages/instSpare.html",
            blacklist: [grade.duty]
        },
        "pages/instReuse": {
            url: "/views/pages/instReuse.html",
            blacklist: [grade.duty]
        },
        "pages/instObs": {
            url: "/views/pages/instObs.html",
            blacklist: [grade.duty]
        },
        "pages/queryData": "/views/pages/queryData.html",
        "pages/queryCall": "/views/pages/queryCall.html",
        "pages/queryCensus": "/views/pages/queryCensus.html",
        "pages/monthReport": "/views/pages/monthReport.html",
        "pages/site": {
            url: "/views/pages/site.html",
            blacklist: [grade.instAdmin, grade.duty]
        },
        "pages/systemCall": {
            url: "/views/pages/systemCall.html",
            blacklist: [grade.instAdmin, grade.duty]
        },
        "pages/systemLimits": {
            url: "/views/pages/systemLimits.html",
            blacklist: [grade.instAdmin, grade.duty]
        },
        "pages/systemStaff": {
            url: "/views/pages/systemStaff.html",
            blacklist: [grade.instAdmin, grade.duty]
        },
        "pages/setupTable": {
            url: "/views/pages/setupTable.html",
            blacklist: [grade.instAdmin, grade.duty]
        },
        "pages/systemVideo": {
            url: "/views/pages/systemVideo.html",
            blacklist: [grade.instAdmin, grade.duty]
        },
        "pages/systemLog": {
            url: "/views/pages/systemLog.html",
            blacklist: [grade.instAdmin, grade.duty]
        },
        "pages/dutyMonitor": "/views/pages/dutyMonitor.html",
        "pages/dutyQuery": "/views/pages/dutyQuery.html",
        "pages/dutyCensus": "/views/pages/dutyCensus.html",
        "pages/dutyTable": "/views/pages/dutyTable.html",
        "record/memorabilia": "/views/pages/memorabilia.html",
        "record/instComp": "/views/pages/instComp.html",
        "record/facility": "/views/pages/facility.html",
        "pages/businessArchives": "/views/pages/businessArchives.html",
        "pages/live": "/views/pages/live.html",
        
        "pages/test": "/views/pages/test.html"
    };

    var pages = {
        "layHome": "/views/components/layHome.html",
        "instReuseCheck": "/views/components/instReuseCheck.html",
        "instReuseContrast": "/views/components/instReuseContrast.html",
        "instReusePart": "/views/components/instReusePart.html",
        // 备品备件
        "instSpareAdd": "/views/components/instSpareAdd.html",
        "instSpareChange": "/views/components/instSpareChange.html",
        "instSpareRecord": "/views/components/instSpareRecord.html",
        // 在用设备
        "instReuseChange": "/views/components/instReuseChange.html",
        "instObsAdd": "/views/components/instObsAdd.html",
        "instObsChange": "/views/components/instObsChange.html",
        "instCheckList": "/views/components/instCheckList.html",
        "instContrastList": "/views/components/instContrastList.html",
        "instPartList": "/views/components/instPartList.html",

        "T011": "/views/components/monthT011.html",
        "T012": "/views/components/monthT012.html",
        "T021": "/views/components/monthT021.html",
        "T022": "/views/components/monthT022.html",
        "T023": "/views/components/monthT023.html",
        "T051": "/views/components/monthT051.html",
        "T051_2": "/views/components/monthT051_2.html",
        "T051_3": "/views/components/monthT051_3.html",
        "T052": "/views/components/monthT052.html",
        "T053": "/views/components/monthT053.html",
        "T054": "/views/components/monthT054.html",
        "T054_2": "/views/components/monthT054_2.html",
        "T054_3": "/views/components/monthT054_3.html",

        "systemSiteAdd": "/views/components/systemSiteAdd.html",
        "systemSiteChange": "/views/components/systemSiteChange.html",
        "systemCallChange": "/views/components/systemCallChange.html",
        "systemStaffAdd": "/views/components/systemStaffAdd.html",
        "systemStaffChange": "/views/components/systemStaffChange.html",
        "systemLimitsAdd": "/views/components/systemLimitsAdd.html",
        "systemVideoAdd": "/views/components/systemVideoAdd.html",
        "businessArchivesUpload": "/views/components/businessArchivesUpload.html",
        "loadWebKit": "/views/components/loadWebKit.html",
        "userChange": "/views/system/change.html",
    };

    for (var key in pages) {
        router[key] = pages[key];
    };

    var pagesList = [{
        title: "实时数据", name: "pages/realData", id: "realData",
        meta: { isChildren: false, icon: "layui-icon-chart" },
    }, {
        title: "设备巡查",
        meta: { isChildren: true, icon: "layui-icon-survey" },
        children: [
            { title: "备品备件", name: "pages/instSpare", id: "instSpare" },
            { title: "在用设备", name: "pages/instReuse", id: "instReuse" },
            { title: "比测仪器", name: "pages/instObs", id: "instObs" }
        ]
    }, {
        title: "数据查询",
        meta: { isChildren: true, icon: "layui-icon-chart-screen" },
        children: [
            { title: "站点数据", name: "pages/queryData", id: "queryData" },
            { title: "报警记录", name: "pages/queryCall", id: "queryCall" },
            { title: "数据统计", name: "pages/queryCensus", id: "queryCensus" },
            { title: "月报表", name: "pages/monthReport", id: "monthReport" },
        ]
    }, {
        title: "系统管理",
        meta: { isChildren: true, icon: "layui-icon-set" },
        children: [
            { title: "站点管理", name: "pages/site", id: "site", },
            { title: "报警参数", name: "pages/systemCall", id: "systemCall" },
            { title: "权限管理", name: "pages/systemLimits", id: "systemLimits" },
            { title: "人员信息", name: "pages/systemStaff", id: "systemStaff" },
            { title: "值班报表", name: "pages/setupTable", id: "setupTable" },
            { title: "视频监控", name: "pages/systemVideo", id: "systemVideo" },
            { title: "操作日志", name: "pages/systemLog", id: "systemLog" },
        ]
    }, {
        title: "值班管理",
        meta: { isChildren: true, icon: "layui-icon-user" },
        children: [
            { title: "值班监控", name: "pages/dutyMonitor", id: "dutyMonitor" },
            { title: "值班查询", name: "pages/dutyQuery", id: "dutyQuery" },
            { title: "值班统计", name: "pages/dutyCensus", id: "dutyCensus" },
            { title: "值班记录", name: "pages/dutyTable", id: "dutyTable" },
            // { title: "记得删除", name: "pages/test", id: "test" }
        ]
    }, {
        title: "业务管理",
        meta: { isChildren: true, icon: "layui-icon-read" },
        children: [
            { title: "大事记", name: "record/memorabilia", id: "memorabilia" },
            { title: "仪器对比表", name: "record/instComp", id: "instComp" },
            { title: "设施巡检记录", name: "record/facility", id: "facility" },
            { title: "业务工作档案", name: "pages/businessArchives", id: "businessArchives" }
        ]
    }, {
        title: "视频监控", name: "500", id: "live",
        meta: { isChildren: false, icon: "layui-icon-video" }
    }, {
        title: "系统介绍", name: "sketch", id: "sketch",
        meta: { isChildren: false, icon: "layui-icon-read" }
    }];

    var ie = layui.device().ie;
    if (!ie || ie < 11) {
        pagesList[pagesList.length - 2].name = '500'
    } else {
        pagesList[pagesList.length - 2].name = 'pages/live'
    };
    //拼接路径
    function filterUrl(src) {
        var dataItem = router[src];
        var url;
        if (typeof dataItem == 'string') {
            url = dataItem;
        } else {
            var blacklist = dataItem.blacklist;
            var grade = layui.sessionData('grade').key;
            blacklist = blacklist.join(',');
            url = blacklist.indexOf(grade) > -1 ? router["501"] : router[src].url;
        };
        url = baseFileUrl + url;
        return url;
    };
    //页面跳转
    function toRouter(url) {
        window.top.location.href = filterUrl(url);
    };
    //退出登录
    function logOut(msg) {
        sessionStorage.clear();
        msg ? layer.msg(msg, {
            id: "logOut"
        }, function () {
            toRouter('index');
        }) : toRouter('index');
    };

    function already() {
        var token = layui.sessionData('token').key;
        !token && !utils.pathIndex ? logOut("请先登录") : "";
    };
    already();

    e("store", {
        filterUrl: filterUrl,
        toRouter: toRouter,
        logOut: logOut,
        pagesList: pagesList
    });
});