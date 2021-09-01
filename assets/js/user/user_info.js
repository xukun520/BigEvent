$(function(){

    const {form,layer}=layui;

    form.verify({
        nickname:function(value){
            if(value.length<6){
                return '输入用户名长度小于6'
            }
        }
    })
    initUerInfo();
    // 初始化用户基本信息
    function initUerInfo(){
        $.get('/my/userinfo',function(res){
            // console.log(res);
            if(res.status!==0){
                return layer.msg(res.message||'获取用户信息失败')
            }else{
                // layer.msg(res.message||'获取用户信息成功')
                // form.val('user_info',res.data)
                form.val('formUserInfo', res.data)
                // $('.layui-input-block [name=username]').val(res.data.username);

                // // 昵称
                // if(res.data.nickname){
                // $('.layui-input-block [name=nickname]').val(res.data.nickname);

                // }
                // //邮箱
                // if(res.data.email){
                //     $('.layui-input-block [name=email]').val(res.data.email);
    
                //     }
            }
        })
    }
    $('#reset').on('click',function(e){
        e.preventDefault();
        initUerInfo();
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            url:'/my/userinfo',
            method:'post',
            data:$(this).serialize(),
            success(res){
                if(res.status!==0){
                    layer.msg('修改信息失败！')
                }else{
                    layer.msg('修改信息成功！')
                    window.parent.getUserInfo();
                }
                
            }
        })
    })
    




})