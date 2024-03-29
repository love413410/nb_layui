

layui.extend({
    utils: "store/utils",
}).define(["utils"], function (exports) {

    var utils = layui.utils;

    var baseUrl = utils.baseUrl,
        baseFileUrl = utils.baseFileUrl;

    exports('urls', {
        // 项目目录
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
        indexData: baseUrl + '/index/data/',//实时数据
        indexClock: baseUrl + '/index/clock/',//站点详情
        personnelSign: baseUrl + '/personnel/sign/',//值班签到

        // 值班记录
        personnelLog: baseUrl + '/personnel/log/',//值班监控>>人员列表 or 值班监控>>值班列表
        record: baseUrl + '/personnel/record/',//值班记录表1 值班记录表2>>详情和保存
        signList: baseUrl + '/sign/list/',//值班查询列表
        personnelCount: baseUrl + '/personnel/count/',//值班统计
        dutyCurve: baseUrl + '/duty/curve/',//值班统计
        dutyCurves: baseUrl + '/duty/curves/',//值班统计
        dutyRecord: baseUrl + '/duty/record1/',//值班记录表1
        dutyRecords: baseUrl + '/duty/record2/',//值班记录表2
        personnelCenter: baseUrl + '/personnel/center/',//值班记录表 筛选

        dutySign: baseUrl + '/duty/sign/',//一键签到

        getRecord: baseUrl + '/personnel/get/record/',//获取值班记录表
        dutySite: baseUrl + '/duty/site/', // 值班记录>>获取设置站点     设置值班记录表
        dutyBuoy: baseUrl + '/duty/buoy/', // 值班记录>>获取设置浮标
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
        toolType: baseUrl + '/tool/type/',//备品备件>>仪器名称
        toolState: baseUrl + '/tool/state/',//备品备件>>仪器状态
        toolRegister: baseUrl + '/tool/register/',//备品备件>>添加
        toolList: baseUrl + '/tool/list/',//备品备件>>添加
        toolDelete: baseUrl + '/tool/delete/',//备品备件>>删除
        toolDetail: baseUrl + '/tool/detail/',//备品备件>>详情
        toolChange: baseUrl + '/tool/change/',//备品备件>>修改
        toolRecord: baseUrl + '/tool/record/',//备品备件>>流转记录
        toolStock: baseUrl + '/tool/stock/',//备品备件>>出库

        // 在用设备
        useSite: baseUrl + '/use/site/',//在用设备站点列表
        useDetail: baseUrl + '/use/detail/',//在用设备详情
        useChange: baseUrl + '/use/change/',//在用设备修改
        useType: baseUrl + '/use/type/',//在用设备修改
        useEnter: baseUrl + '/use/enter/',//在用设备归还
        // 比测仪器
        testRegister: baseUrl + '/test/register/',//比测仪器>>添加
        testList: baseUrl + '/test/list/',//比测仪器>>列表
        testDelete: baseUrl + '/test/delete/',//比测仪器>>删除
        testDetail: baseUrl + '/test/detail/',//比测仪器>>详情
        testChange: baseUrl + '/test/change/',//比测仪器>>修改
        /**/
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

        toolRecede: baseUrl + '/tool/recede/',//仪器管理>>入库仪器列表
        toolStockPeople: baseUrl + '/tool/stock/people/',//仪器管理>>出库领用人

        // 系统设置
        dataReal: baseUrl + '/data/real/',//实时数据

        siteList: baseUrl + '/site/list/',//站点信息>>列表
        siteDelete: baseUrl + '/site/delete/',//站点信息>>删除

        siteStyle: baseUrl + '/site/style/',//站点信息>>添加>>站点区域 or 站点类型
        siteAdd: baseUrl + '/site/register/',//站点信息>>添加

        sectionAdd: baseUrl + '/site/add/section/',//岸段>>添加
        sectionDelete: baseUrl + '/site/delete/section/',//岸段>>删除
        sectionChange: baseUrl + '/site/change/section/',//岸段>>修改
        sectionList: baseUrl + '/site/list/section/',//岸段>>列表

        siteEl: baseUrl + '/site/el/',//站点信息>>添加>>要素  站点信息>>修改>>要素
        siteChange: baseUrl + '/site/change/',//站点信息>>修改和详情
        siteImage: baseUrl + '/site/add/image/',//站点信息>>修改站点>>上传图片
        siteImageList: baseUrl + '/site/list/image/',//站点信息>>>>修改站点>>图片列表
        siteImageDelete: baseUrl + '/site/delete/image/',//站点信息>>>>修改站点>>图片删除


        parameterList: baseUrl + '/parameter/list/',//报警参数>>列表
        parameterDeta: baseUrl + '/parameter/detail/',//报警参数>>详情
        parameterChange: baseUrl + '/parameter/change/',//报警参数>>详情

        personnelList: baseUrl + '/personnel/list/',//人员信息>>列表
        personnelAdd: baseUrl + '/personnel/register/',//人员信息>>添加
        personnelDelete: baseUrl + '/personnel/delete/',//人员信息>>删除
        personnelChange: baseUrl + '/personnel/change/',//人员信息>>修改和详情
        personnelUser: baseUrl + '/personnel/user/',//人员信息>>添加>>所属账号
        personnelUsers: baseUrl + '/personnel/users/',//人员信息>>添加>>所属账号



        userList: baseUrl + '/user/list/',//权限管理>>列表
        userAdd: baseUrl + '/user/register/',//权限管理>>添加
        grade: baseUrl + '/user/grade/',//权限管理>>添加>>权限列表
        userSite: baseUrl + '/user/site/',//权限管理>>添加>>归属站点 or 在用设备>>添加
        userSection: baseUrl + '/user/section/',//权限管理>>添加>>所属部门 or 在用设备>>添加
        userDelete: baseUrl + '/user/delete/',//权限管理>>删除
        userChange: baseUrl + '/user/change/',//权限管理>>修改和重置密码

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
