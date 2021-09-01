

    $('#link_reg').on('click',function(){
        $('.loginBox').hide();
        $('.regBox').show();
    })

    $('#link_login').on('click',function(){
        $('.loginBox').show();
        $('.regBox').hide();
    })

    //获取form对象
    const {form,layer}=layui;
    form.verify({
        
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] ,
        // 校验两次密码是否一致的规则

        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容然后进行一次等于的判断

        // 如果判断失败，则 returnー个提示消息即
        repwd:function(value){
            let password=$('.regBox [name=password]').val();

            if(value!==password) return '两次密码输入不一致'

        }
      });  

    //   注册 regForm
    $('#regForm').on('submit',function(e){
            e.preventDefault();
            let data={
                username:$('#regForm [name=username]').val(),
                password:$('#regForm [name=password]').val()
            };
        $.post('/api/reguser',data,function(res){
            console.log(res);
            if(res.status!==0){
                console.log('注册失败！');
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            $('#link_login').click();
        }
    



    )})

    // 登录表单事件
    $('#loginForm').on('submit',function(e){
        
        e.preventDefault();
        let data=$(this).serialize();
       
        $.post('/api/login',data,function(res){
            console.log(res);
           if(res.status!==0){
               return layer.msg(res.message|'注册成功');
           }
           localStorage.setItem('token',res.token);
           
           location.href='./index.html'
           console.log('login');
        })
    })

    // TODO对url地址进行优化












