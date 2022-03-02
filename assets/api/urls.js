layui.define(function (exports) {
    var protocol = window.location.protocol;//协议
    var hostname = window.location.hostname;//域名
    var port = window.location.port;//端口号

    // var base = 'http://192.168.1.156';
    var base = 'http://192.168.1.206';
    var baseUrl = base + ':8006';
    var baseFileUrl = protocol + "//" + hostname + ":" + port;
    
    // var baseUrl=baseFileUrl=protocol + "//" + hostname + ":" + port;//实际项目中
    // var base = protocol + "//" + hostname;
    exports('urls', {
        // 项目目录
        base: base,
        baseFileUrl: baseFileUrl,
        mapUrl: baseFileUrl + "/assets/lib/zhejiang.json",
        fileUpload: baseUrl + "/file/upload/",//文件上传
        login: baseUrl + '/user/login/',//登录
        // 多个页面用到的
        siteType: baseUrl + '/site/type/',//站点类型:首页、数据查询>>站点数据、数据查询>>数据统计、系统设置>>站点添加、系统设置>>站点修改、系统设置>>视频添加
        dataList: baseUrl + '/data/site/',//站点列表,根据站点类型查询:数据查询>>站点数据、系统设置>>视频添加
        // 首页
        index: baseUrl + '/index/',//地图数据
        indexReceive: baseUrl + '/index/receive/',//数据到报
        indexClock: baseUrl + '/index/clock/',//站点详情
        personnelSign: baseUrl + '/personnel/sign/',//值班签到

        // 值班记录
        personnelLog: baseUrl + '/personnel/log/',//值班监控>>人员列表 or 值班监控>>值班列表
        getRecord: baseUrl + '/personnel/get/record/',//值班记录表1 值班记录表2>>获取历史模板列表
        record: baseUrl + '/personnel/record/',//值班记录表1 值班记录表2>>详情和保存
        signList: baseUrl + '/sign/list/',//值班查询列表
        personnelCount: baseUrl + '/personnel/count/',//值班统计

        dutyCurve: baseUrl + '/duty/curve/',//值班统计

        // 业务管理
        word: baseUrl + '/work/event/',//大事记
        getWord: baseUrl + '/work/get/event/',//获取大事记历史模板列表
        compared: baseUrl + '/instrument/compared/',//仪器对比表
        getCompared: baseUrl + '/instrument/get/compared/',//获取仪器对比表历史模板列表
        inspection: baseUrl + '/instrument/inspection/',//仪器巡检表
        getInspection: baseUrl + '/instrument/get/inspection/',//获取仪器巡检表历史模板列表

        workList: baseUrl + '/work/list/',//业务档案>>业务档案列表
        workDlete: baseUrl + '/work/delete/',//业务档案>>删除业务档案
        workUpload: baseUrl + '/work/upload/',//业务档案>>上传业务档案
        // 数据查询
        dataCenter: baseUrl + '/data/center/',//站点数据列表 or 图形列表

        alarmType: baseUrl + '/alarm/type/',//报警记录>>故障类型
        alarmList: baseUrl + '/alarm/list/',//报警记录>>列表
        dataRate: baseUrl + '/data/rate/',//数据统计>>列表
        indexList: baseUrl + "/month/site/",//月报表>>站点列表 or 观测月报>>站点列表
        monthreport: baseUrl + "/month/report/",//月报表>>详情
        shows: baseUrl + '/shows/', // 月报表>>详情
        file: baseUrl + '/file/',//月报表>>下载
        upload: baseUrl + "/upload/",//数据上传

        // 设备巡查
        useList: baseUrl + '/use/list/',//在用设备列表
        useDevice: baseUrl + '/use/device/',//在用设备>>添加>>可用仪器列表 在用设备>>添加>>添加在用设备
        useRecede: baseUrl + '/use/recede/',//在用设备>>归还
        useCheck: baseUrl + '/use/check/',//在用设备>>添加校验信息 在用设备>>校验记录
        useCompare: baseUrl + '/use/compare/',//在用设备>>添加对比信息 在用设备>>对比记录

        usePart: baseUrl + '/use/part/',//在用设备>>更换零部件 get为列表 post为添加

        deviceList: baseUrl + '/device/register/',//备品备件列表
        deviceRegister: baseUrl + '/device/register/',//备品备件>>添加
        deviceDelete: baseUrl + '/device/delete/',//备品备件>>删除
        deviceDetail: baseUrl + '/device/detail/',//备品备件详情:出库、入库
        deviceChange: baseUrl + '/device/change/',//备品备件修改

        deviceStock: baseUrl + '/device/stock/',//出入库接口  post:出库  get:入库
        deviceStockList: baseUrl + '/device/stock/list/',//备品备件记录表

        instList: baseUrl + '/tool/list/',//仪器管理>>列表
        instType: baseUrl + '/tool/type/',//仪器类型
        instAdd: baseUrl + '/tool/register/',//仪器管理>>添加
        instDelete: baseUrl + '/tool/delete/',//仪器管理>>删除
        instChange: baseUrl + '/tool/change/',//详情和修改:修改、出库、在用设备>>添加
        toolRecede: baseUrl + '/tool/recede/',//仪器管理>>入库仪器列表
        toolStockPeople: baseUrl + '/tool/stock/people/',//仪器管理>>出库领用人
        toolStock: baseUrl + '/tool/stock/',//仪器管理>>出库
        toolRecord: baseUrl + '/tool/stock/list/',//仪器管理>>出入库记录

        // 系统设置
        siteList: baseUrl + '/site/list/',//站点信息>>列表
        siteDelete: baseUrl + '/site/delete/',//站点信息>>删除

        siteStyle: baseUrl + '/site/style/',//站点信息>>添加>>站点区域 or 站点类型
        siteAdd: baseUrl + '/site/register/',//站点信息>>添加

        siteEl: baseUrl + '/site/el/',//站点信息>>添加>>要素  站点信息>>修改>>要素
        siteChange: baseUrl + '/site/change/',//站点信息>>修改和详情

        parameterList: baseUrl + '/parameter/list/',//报警参数>>列表
        parameterDeta: baseUrl + '/parameter/detail/',//报警参数>>详情
        parameterChange: baseUrl + '/parameter/change/',//报警参数>>详情

        personnelList: baseUrl + '/personnel/list/',//人员信息>>列表
        personnelAdd: baseUrl + '/personnel/register/',//人员信息>>添加
        personnelDelete: baseUrl + '/personnel/delete/',//人员信息>>删除
        personnelChange: baseUrl + '/personnel/change/',//人员信息>>修改和详情
        personnelUser: baseUrl + '/personnel/user/',//人员信息>>添加>>所属账号

        userList: baseUrl + '/user/list/',//权限管理>>列表
        userAdd: baseUrl + '/user/register/',//权限管理>>添加
        grade: baseUrl + '/user/grade/',//权限管理>>添加>>权限列表
        userSite: baseUrl + '/user/site/',//权限管理>>添加>>归属站点 or 在用设备>>添加
        userDelete: baseUrl + '/user/delete/',//权限管理>>删除

        userPass: baseUrl + '/user/change/pass/',//个人信息和修改信息
        signUpload: baseUrl + '/sign/upload/',//签名上传:权限添加、个人中心

        log: baseUrl + '/user/log/',//操作日志>>一级筛选框和列表
        logs: baseUrl + '/user/logs/',//操作日志>>二级筛选框

        // 视频监控管理
        videoIndex: baseUrl + '/video/site/',//视频监控>>检索框
        videoList: baseUrl + '/video/list/',//视频监控>>列表
        videoAdd: baseUrl + '/video/register/',//视频监控>>增加
        videoDelete: baseUrl + '/video/delete/',//视频监控>>删除
        videoDeta: baseUrl + '/video/detail/',//视频监控>>修改和详情
        videoTree: baseUrl + '/video/tree/',//监控页面的树形结构
    });
});
