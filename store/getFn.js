layui.define(function (exports) {
    exports('getFn', {
        locaStr: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        },
        initDate: function () {
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
            var d = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
            var dateStr = y + '-' + m + '-' + d;
            return dateStr;
        },
        initM: function () {
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
            var init = y + '-' + m;
            return init;
        },
        initH: function () {
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
            var d = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
            var h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
            var dateStr = y + '-' + m + '-' + d + '-' + h;
            return dateStr;
        },
        reg: function (val) {
            return (/^1[3456789]\d{9}$/.test(val))
        },
        username: function (val) { //账号验证
            return (/^[a-zA-z]\w{4,10}$/.test(val))
        },
        password: function (val) { //密码验证,字母开头,并且包含数字和特殊字符
            var reg = /^([a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{4,16}$/;
            return (reg.test(val))
        },
        trimFn: function (name) {
            var reg = /\S/;
            if (!name) {
                return false;
            } else {
                name.trim();
                return reg.test(name);
            }
        },
        regIp: function (val) {
            var reg = /^(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}$/;
            return (reg.test(val))
        },
        regLog: function (val) { //验证经度  90.12345  小数点后5位  {1,5}控制小数点后面的个数
            var regLog = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]{1,5})?)|180(([.][0]{1,5})?))$/
            return (regLog.test(val));
        },
        regLat: function (val) { //验证纬度 30.12345   小数点后5位
            var regLat = /^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,5})?)|90(([.][0]{1,5})?))$/;
            return (regLat.test(val));
        },

        //姓名验证
        user: function (val) {
            return (/^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]+$/.test(val));
        },
        inte: function (val) {//验证正整数,可以为字符串
            return (/^\+?[1-9][0-9]*$/.test(val))
        },
        //电话验证
        phone: function (val) {
            return (/^0\d{2,3}-?\d{7,8}$/.test(val))
        },
        // 验证手机号
        mobile: function (val) {
            return (/^1[3456789]\d{9}$/.test(val))
        },
        isUserFn: function () {
            var user = sessionStorage.user;
            var isUser = user == "admin" || user == "ADMIN";
            return isUser;
        },
        regTime: function (val) {//验证日期;格式为2020-01-01
            var reg = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1]))$/;
            return (reg.test(val));
        },
        regDeta: function (val) { //验证日期;格式为2020-01-01 00:00:00
            // var reg = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1]))$/;
            var reg = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;

            return (reg.test(val));
        },
    });
});
