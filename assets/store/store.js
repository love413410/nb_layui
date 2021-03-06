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
        "pages/shore": {
            url: "/views/pages/shore.html",
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

        "step": "/views/components/step.html",
        
        "instReuseCheck": "/views/components/instReuseCheck.html",
        "instReuseContrast": "/views/components/instReuseContrast.html",
        "instReusePart": "/views/components/instReusePart.html",
        // ????????????
        "instSpareAdd": "/views/components/instSpareAdd.html",
        "instSpareChange": "/views/components/instSpareChange.html",
        "instSpareRecord": "/views/components/instSpareRecord.html",
        // ????????????
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
        "systemShoreAdd": "/views/components/systemShoreAdd.html",
        "systemShoreChange": "/views/components/systemShoreChange.html",

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
    var live = {
        title: "????????????", name: "500", id: "live",
        meta: { isChildren: false, icon: "layui-icon-video" }
    };
    var ie = layui.device().ie;
    if (!ie || ie < 11) {
        live.name = '500'
    } else {
        live.name = 'pages/live'
    };
    var pagesList = [{
        title: "????????????", name: "pages/realData", id: "realData",
        meta: { isChildren: false, icon: "layui-icon-chart" },
    }, {
        title: "????????????",
        meta: { isChildren: true, icon: "layui-icon-chart-screen" },
        children: [
            { title: "????????????", name: "pages/queryData", id: "queryData" },
            { title: "????????????", name: "pages/queryCall", id: "queryCall" },
            { title: "????????????", name: "pages/queryCensus", id: "queryCensus" },
            { title: "?????????", name: "pages/monthReport", id: "monthReport" },
        ]
    }, {
        title: "????????????",
        meta: { isChildren: true, icon: "layui-icon-user" },
        children: [
            // { title: "????????????", name: "pages/dutyMonitor", id: "dutyMonitor" },
            { title: "????????????", name: "pages/dutyQuery", id: "dutyQuery" },
            { title: "????????????", name: "pages/dutyCensus", id: "dutyCensus" },
            { title: "????????????", name: "pages/dutyTable", id: "dutyTable" },
            // { title: "????????????", name: "pages/test", id: "test" }
        ]
    }, {
        title: "????????????",
        meta: { isChildren: true, icon: "layui-icon-read" },
        children: [
            { title: "?????????", name: "record/memorabilia", id: "memorabilia" },
            { title: "???????????????", name: "record/instComp", id: "instComp" },
            { title: "??????????????????", name: "record/facility", id: "facility" },
            { title: "??????????????????", name: "pages/businessArchives", id: "businessArchives" }
        ]
    }, {
        title: "????????????",
        meta: { isChildren: true, icon: "layui-icon-survey" },
        children: [
            { title: "????????????", name: "pages/instSpare", id: "instSpare" },
            { title: "????????????", name: "pages/instReuse", id: "instReuse" },
            { title: "????????????", name: "pages/instObs", id: "instObs" }
        ]
    },
        live,
    {
        title: "????????????",
        meta: { isChildren: true, icon: "layui-icon-set" },
        children: [
            { title: "????????????", name: "pages/site", id: "site", },
            { title: "????????????", name: "pages/shore", id: "systemShore" },
            { title: "????????????", name: "pages/systemCall", id: "systemCall" },
            { title: "????????????", name: "pages/systemLimits", id: "systemLimits" },
            // { title: "????????????", name: "pages/systemStaff", id: "systemStaff" },
            // { title: "????????????", name: "pages/setupTable", id: "setupTable" },
            { title: "????????????", name: "pages/systemVideo", id: "systemVideo" },
            { title: "????????????", name: "pages/systemLog", id: "systemLog" },
        ]
    }, {
        title: "????????????", name: "sketch", id: "sketch",
        meta: { isChildren: false, icon: "layui-icon-read" }
    }];
    //????????????
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
    //????????????
    function toRouter(url) {
        window.top.location.href = filterUrl(url);
    };
    //????????????
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
        !token && !utils.pathIndex ? logOut("????????????") : "";
    };
    already();

    e("store", {
        filterUrl: filterUrl,
        toRouter: toRouter,
        logOut: logOut,
        pagesList: pagesList
    });
});