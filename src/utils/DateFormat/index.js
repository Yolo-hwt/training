export const FormatDate = function (dateobj) {
    var year = dateobj.getFullYear(); //得到年份
    var month = dateobj.getMonth(); //得到月份
    var date = dateobj.getDate(); //得到日期
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    return year + "-" + month + "-" + date; //（格式化"yyyy-MM-dd"）
}