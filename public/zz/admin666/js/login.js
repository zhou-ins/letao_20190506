$(function(){
    /*初始化校验插件*/
    /*1.是form表单结构 并且有一个提交按钮*/
    /*2.这个插件就是jquery插件 样式和bootstrap风格一致*/
    $('#login').bootstrapValidator({
        /*配置校验的不同状态下显示的图标*/
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        /*需要校验的表单元素  通过名称 name*/
        fields:{
            /*对应表单的name*/
            username:{
                /*规则规则 多个校验规则*/
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    /*配置一个校验规则*/
                    callback: {
                        message: '用户名错误'
                    }
                }
            },
            password:{
                validators:{
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:18,
                        message:'密码在6-18个字符内'
                    },
                    callback: {
                        message: '密码不正确'
                    }
                }
            }
        }
        /*7.表单校验成功*/
    }).on('success.form.bv', function(e) {
        /*禁用默认提交的事件 因为要使用ajax提交而不是默认的提交方式*/
        e.preventDefault();
        /*获取当前的表单*/
        var $form = $(e.target);
        /*发送登录请求*/
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$form.serialize(),
            dataType:'json',
            success:function(data){
                /*业务成功*/
                if(data.success){
                    /*后台管理员 root 123456*/
                    /*跳转后台的首页*/
                    location.href = '/zz/admin666/';
                    /*业务失败*/
                }else{
                    if(data.error == 1000){
                        /*用户名错误*/
                        /*设置用户名这个表单元素的校验状态位失败*/
                        /*NOT_VALIDATED 未校验, VALIDATING 校验中, INVALID 失败 or VALID 成功 */
                        /*1.获取校验组件*/
                        /*2.调研更改状态的函数*/
                        /*3.校验的表单，改成什么状态，使用哪个校验规则*/
                        $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                    }else if(data.error == 1001){
                        /*密码错误*/
                        $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                    }
                }
            }
        });
    });
    /*重置功能*/
    $('[type="reset"]').on('click',function(){
        /*6.重置验证*/
        $('#login').data('bootstrapValidator').resetForm();
    });

});