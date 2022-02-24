layui.extend({
    getFn: "../../../store/getFn"
}).define(["getFn"], function (e) {
    var getFn = layui.getFn;

    var $ = layui.$,
        form = layui.form;

    form.verify({
        // 个人中心修改密码
        userNewPass: function (val) {
            if (getFn.trimFn(val) && !getFn.password(val)) {
                return '请输入8至16位的密码,字母开头并包含数字和特殊字符';
            }
        },
        userNewPass2: function (val) {
            var pass = $('#pass').val();
            if (pass != '' && val !== pass) {
                return '两次输入密码不一致';
            }
        },
        // 权限管理>>添加用户
        userName: function (val) {
            if (!getFn.username(val)) {
                return '请输入4至11位的账号,可包含数字但不可包含特殊字符';
            }
        },
        passWord: function (val) {
            if (!getFn.password(val)) {
                return '请输入4至16位的密码,字母开头包含数字和特殊字符';
            };
        },
        newPass: function (val) {
            var pass = $('#pass').val();
            if (pass != '' && val !== pass) {
                return '两次输入密码不一致';
            }
        },

        // 站点管理
        stationName: function (val) {
            if (!getFn.trimFn(val)) {
                return '请输入站点名';
            }
        },
        stationNumCode: function (val) {
            if (!getFn.trimFn(val)) {
                return '请输入站名代码';
            }
        },
        ip: function (val) {
            if (getFn.trimFn(val) && !getFn.regIp(val)) {
                return '请输入正确的IP';
            }
        },
        lon: function (val) {
            if (!getFn.regLog(val) || !getFn.trimFn(val)) {
                return '请输入经度,小数点后最长5位';
            }
        },
        lat: function (val) {
            if (!getFn.regLat(val) || !getFn.trimFn(val)) {
                return '请输入纬度,小数点后最长5位';
            }
        },
        delayTime: function (val) {
            if (!getFn.inte(val)) {
                return '请输入值大于0的正整数';
            }
        },
        // 人员信息
        personnel: function (val) {
            if (!getFn.user(val) || val.length <= 0) {
                return '请输入正确的人员姓名!';
            }
        },
        mobile: function (val) {
            if (!getFn.mobile(val)) {
                return '请输入正确的手机号!';
            }
        },
        // 监控管理
        videoName: function (val) {
            if (!getFn.trimFn(val)) {
                return '请输入监控名';
            }
        },
        videoIp: function (val) {
            if (!getFn.regIp(val)) {
                return '请输入正确的监控IP';
            }
        },
        account: function (val) {
            if (!getFn.trimFn(val)) {
                return '请输入监控账号';
            }
        },
        videoPassWord: function (val) {
            if (!getFn.trimFn(val)) {
                return '请输入监控密码';
            }
        },

        // 在用设备
        validTime: function (val) {
            if (!getFn.inte(val)) {
                return '请输入正确的有效期天数!';
            }
        },
        testpeople: function (val) {
            if (!getFn.trimFn(val)) {
                return '请输入送检人!';
            }
        },
        partPeople: function (val) {
            if (!getFn.trimFn(val)) {
                return '请输入更换人!';
            }
        },
        content: function (val) {
            if (!getFn.trimFn(val)) {
                return '请输入更换内容!';
            }
        },

        // 仪器管理
        instrumentName: function (val) {
            if (!getFn.trimFn(val)) {
                return '请输入仪器名称!';
            }
        },
        instrumentModel: function (val) {
            if (!getFn.trimFn(val)) {
                return '请输入型号!';
            }
        },
        instrumentNumber: function (val) {
            if (!getFn.trimFn(val)) {
                return '请输入仪器序列号!';
            }
        },
        internalNum: function (val) {
            if (!getFn.trimFn(val)) {
                return '请输入仪器内部编号!';
            }
        },
        supplier: function (val) {
            if (!getFn.trimFn(val)) {
                return '请输入供应商!';
            }
        },
        price: function (val) {
            if (!getFn.trimFn(val)) {
                return '请输入价格!';
            }
        },
        purchaseTime: function (val) {
            if (!getFn.regDeta(val)) {
                return '请选择采购时间';
            }
        },
        warehouseTime: function (val) {
            if (!getFn.regDeta(val)) {
                return '请选择入库时间';
            }
        },

        // 备品备件
        deviceName: function (val) {
            if (!getFn.trimFn(val)) {
                return '请输入备品备件名称!';
            }
        },
        stockTime: function (val) {
            if (!getFn.regDeta(val)) {
                return '请选择采购时间';
            }
        },
        totalNum: function (val) {
            if (!getFn.inte(val)) {
                return '请输入正确的数量!';
            }
        },
        savePath: function (val) {
            if (!getFn.trimFn(val)) {
                return '请输入存放位置!';
            }
        },
        // 出库和入库
        stockNum: function (val) {
            if (!getFn.inte(val)) {
                return '请输入正确的数量!';
            }
        },
        pickName: function (val) {
            if (!getFn.user(val) || val.length <= 0) {
                return '请输入正确的姓名!';
            }
        },
        destination: function (val) {
            if (!getFn.trimFn(val)) {
                return '请输入正确的目的地!';
            }
        },
    });
    e("allReg", {})
});

