layui.extend({
    utils: "../store/utils",
}).define(["utils"], function (e) {
    var grade = layui.utils.grade,
        urls = layui.urls;
    var router = {
        "index": "/index.html",
        "map": "/views/map.html",
        "404": "/views/system/404.html",
        "501": "/views/system/501.html",
        "sketch": "/views/system/sketch.html",

        "pages/home": "/views/pages/home.html",
        "pages/site": "/views/pages/site.html",

        "pages/instReuse": "/views/pages/instReuse.html",
        "pages/instSpare": "/views/pages/instSpare.html",
        "pages/instObs": "/views/pages/instObs.html",

        "pages/queryData": "/views/pages/queryData.html",
        "pages/queryCall": "/views/pages/queryCall.html",
        "pages/queryCensus": "/views/pages/queryCensus.html",
        "pages/monthReport": "/views/pages/monthReport.html",

        "pages/systemCall": "/views/pages/systemCall.html",
        "pages/systemStaff": "/views/pages/systemStaff.html",
        "pages/systemLimits": "/views/pages/systemLimits.html",
        "pages/systemVideo": "/views/pages/systemVideo.html",
        "pages/systemLog": "/views/pages/systemLog.html",

        "pages/dutyMonitor": "/views/pages/dutyMonitor.html",
        "pages/dutyQuery": "/views/pages/dutyQuery.html",
        "pages/dutyCensus": "/views/pages/dutyCensus.html",
        "pages/dutyTable": "/views/pages/dutyTable.html",

        "record/memorabilia": "/views/pages/memorabilia.html",
        "record/instComp": "/views/pages/instComp.html",
        "record/facility": "/views/pages/facility.html",
        "pages/businessArchives": "/views/pages/businessArchives.html",

        "pages/live": "/views/pages/live.html"
    };

    var pages = {
        "layHome": "/views/components/layHome.html",

        "instReuseCheck": "/views/components/instReuseCheck.html",
        "instReuseContrast": "/views/components/instReuseContrast.html",
        "instReusePart": "/views/components/instReusePart.html",

        "instSpareAdd": "/views/components/instSpareAdd.html",
        "instSpareChange": "/views/components/instSpareChange.html",

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

        "userChange": "/views/system/change.html",
    };

    for (var key in pages) {
        router[key] = pages[key];
    };

    var pagesList = [{
        title: "站点管理", name: "pages/site", id: "site", action: "siteAction",
        meta: { isChildren: false, icon: "layui-icon-home" },
    }, {
        title: "设备巡查",
        meta: { isChildren: true, icon: "layui-icon-survey" },
        children: [
            { title: "在用设备", name: "pages/instReuse", id: "instReuse", action: "instAction" },
            { title: "备品备件", name: "pages/instSpare", id: "instSpare", action: "instAction" },
            { title: "观测仪器", name: "pages/instObs", id: "instObs", action: "instAction" }
        ]
    }, {
        title: "数据查询",
        meta: { isChildren: true, icon: "layui-icon-chart" },
        children: [
            { title: "站点数据", name: "pages/queryData", id: "queryData", action: "queryAction" },
            { title: "报警记录", name: "pages/queryCall", id: "queryCall", action: "queryAction" },
            { title: "数据统计", name: "pages/queryCensus", id: "queryCensus", action: "queryAction" },
            { title: "月报表", name: "pages/monthReport", id: "monthReport", action: "queryAction" },
        ]
    }, {
        title: "系统管理",
        meta: { isChildren: true, icon: "layui-icon-set" },
        children: [
            { title: "报警参数", name: "pages/systemCall", id: "systemCall", action: "systemAction" },
            { title: "人员信息", name: "pages/systemStaff", id: "systemStaff", action: "systemAction" },
            { title: "权限管理", name: "pages/systemLimits", id: "systemLimits", action: "systemAction" },
            { title: "视频监控", name: "pages/systemVideo", id: "systemVideo", action: "systemAction" },
            { title: "操作日志", name: "pages/systemLog", id: "systemLog", action: "systemAction" },
        ]
    }, {
        title: "值班管理",
        meta: { isChildren: true, icon: "layui-icon-user" },
        children: [
            { title: "值班监控", name: "pages/dutyMonitor", id: "dutyMonitor", action: "dutyAction" },
            { title: "值班查询", name: "pages/dutyQuery", id: "dutyQuery", action: "dutyAction" },
            { title: "值班统计", name: "pages/dutyCensus", id: "dutyCensus", action: "dutyAction" },
            { title: "值班记录", name: "pages/dutyTable", id: "dutyTable", action: "dutyAction" },
        ]
    }, {
        title: "业务管理",
        meta: { isChildren: true, icon: "layui-icon-read" },
        children: [
            { title: "大事记", name: "record/memorabilia", id: "memorabilia", action: "recordAction" },
            { title: "仪器对比表", name: "record/instComp", id: "instComp", action: "instAction" },
            { title: "设施巡检记录", name: "record/facility", id: "facility", action: "instAction" },
            { title: "业务工作档案", name: "pages/businessArchives", id: "businessArchives", action: "recordAction" }
        ]
    }, {
        title: "视频监控", name: "pages/live", id: "live",
        meta: { isChildren: false, icon: "layui-icon-video", action: "liveAction" }
    }, {
        title: "权限介绍", name: "sketch", id: "sketch",
        meta: { isChildren: false, icon: "layui-icon-read" }
    }];
    //拼接路径
    function filterUrl(url) {
        var token = getSessionData("token");
        var src = 'index';
        if (token) {
            src = router[url] ? url : "404";
        } else {
            window.top.location.href = urls.baseFileUrl + router[src];
        };
        return urls.baseFileUrl + router[src];
    };
    //页面跳转
    function toRouter(url) {
        window.top.location.href = filterUrl(url);
    };
    //退出登录
    function logOut() {
        sessionStorage.clear();
        toRouter('index');
    };
    function setSessionData(key, val) {
        sessionStorage.setItem(key, JSON.stringify(val));
    };
    function getSessionData(key) {
        return JSON.parse(sessionStorage.getItem(key));
    };
    e("store", {
        setSessionData: setSessionData,
        getSessionData: getSessionData,
        filterUrl: filterUrl,
        toRouter: toRouter,
        logOut: logOut,
        pagesList: pagesList
    });
});