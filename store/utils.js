layui.define(["urls"], function (e) {

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

    var grade = 4;//4为值班用户
    var userList = ["admin"];

    e("utils", {
        instObsState: instObsState,
        staffXmList: staffXmList,
        grade: grade,
        userList: userList
    });
});