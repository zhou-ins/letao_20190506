/*后台管理系统的公共js文件*/
/*1.进度展示*/
/*了解jquery相关的ajax方法*/
/*当ajax发生请求  显示进度条*/
/*当ajax请求中没响应过来  显示进度加载*/
/*当ajax完成了结束了  进度条要走完  隐藏*/
/*有相关配置*/
NProgress.configure({ showSpinner: false });
$(window).ajaxStart(function(){
    /*只要使用的ajax就会执行这个方法*/
    /*开启进度条*/
    NProgress.start();
});
$(window).ajaxComplete(function(){
    /*结束进度条*/
    NProgress.done();
});

/*2.侧边栏的显示一i你馆藏 二级菜单的显示隐藏*/
$('[data-menu]').on('click',function(){
    $('.ad_aside').toggle();
    $('.ad_section').toggleClass('menu'); /*加menu去掉180的左边距，不去menu加上180做编剧——>为什么呀，不懂！*/
});
$('.menu [href="javascript:;"]').on('click',function(){
    $(this).siblings('.child').slideToggle();

});
/*3.退出功能——（第二种方式——js的方式来解决）*/
/*把html格式的字符串转成 js字符串拼接 数字拼接    https://www.html.cn/tool/html2js/*/   /*周周:这个好难啊——第一次见*/
var modalHtml = ['<div class="modal fade" id="logoutModal">',
                '    <div class="modal-dialog modal-sm">',
                '        <div class="modal-content">',
                '            <div class="modal-header">',
                '                <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>',
                '                <h4 class="modal-title">温馨提示</h4>',
                '            </div>',
                '            <div class="modal-body">',
                '                <p class="text-danger"><span class="glyphicon glyphicon-info-sign"></span>您确定要退出后台管理系统吗？&hellip;</p>',
                '            </div>',
                '            <div class="modal-footer">',
                '                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>',
                '                <button type="button" class="btn btn-primary">确定</button>',
                '            </div>',
                '        </div>',
                '    </div>',
                '</div>'].join("");
$('body').append(modalHtml);
$('[data-logout]').on('click',function(){
    /*需要一个模态框 而且每个页面都需要*/
    var $logoutModal=$('#logoutModal');
    $logoutModal.modal('show').find('.btn-primary').on('click',function(){
        /*退出业务*/
        $.ajax({
            type:'get',
            url:' /employee/employeeLogout',
            data:'',
            dataType:'json',
            success:function(data){
                if(data.success = true){
                    $logoutModal.modal('hide');
                    /*跳转登录*/
                    location.href='/zz/admin666/login.html'; /*在app.js中取消拦截 省的总是退出跳到admin/login.html*/
                }else{

                }
            }



        });

    });

    $('')
});