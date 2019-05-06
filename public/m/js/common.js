window.CT = {};  /*这里把CT定义为全局变量  也可以用var进行定义*/
CT.getParamsByUrl = function(){
    /*已对象存储地址栏信息*/
    var params = {};
    var search = location.search;
    if(search){
        search = search.replace('?','');
        /*如果有多个键值对*/
        var arr = search.split('&');
        arr.forEach(function(item,i){
            var itemArr = item.split('=');
            params[itemArr[0]] = itemArr[1];/*这个部分不是很理解，左右边分别是什么意思*/
        });
    };
    console.log(params);
    return params;
};