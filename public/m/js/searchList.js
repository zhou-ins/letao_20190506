$(function() {
    mui('.mui-scroll-wrapper').scroll({
        indicators: true, //是否显示滚动条
    });
    /*1.页面初始化的时候:关键字在输入框内显示*/
    /*获取关键字*/
    var urlParams = CT.getParamsByUrl();
    var $input = $('input').val(urlParams.key || '');

    /*2.页面初始化的时候:根据关键字查询第一页数据4条*/
    getSearchData({
        proName:urlParams.key,
        page:1,
        pageSize:4
    },function(data){
        /*渲染数据*/
        $('.ct_product').html(template('list',data));
    });
    /*3.用户点击搜索的时候  根据新的关键字搜索商品 重置排序功能*/
    $('.ct_search a').on('tap',function(){
        var key = $.trim($input.val());
        if(!key){
            mui.toast('请输入关键字');
            return false;
        }
        getSearchData({
            proName:key,
            page:1,
            pageSize:4
        },function(data){
            /*渲染数据*/
            $('.ct_product').html(template('list',data));
        });
    });
    /*4.用户点击排序的时候  根据排序的选项去进行排序（默认的时候是 降序 再次点击的时候 升序）*/
    $('.ct_order a').on('tap',function(){
        /*改变当前样式*/
        $(this).addClass('now').siblings().removeClass('now');
        /*获取当前点击的功能参数 price 1 2 num 1 2 */
        /*获取数据*/
    });
    /*5.用户下拉的时候 根据当前条件刷新 上拉加载重置*/
    /*6.用户上拉的时候 加载下一页（没有数据不去加载了）*/
});

var getSearchData = function(params,callback){
    $.ajax({
        url:'/product/queryProduct',
        type:'get',
        data:params,
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    });
}
