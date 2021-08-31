$(function () {









    getUserInfo();

})

// 获取用户的基本信息
function getUserInfo() {
    // let data:
    $.ajax({
        type: 'GET',

        url: '/my/userinfo',
        //TODO:请求头
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success(res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message || '获取用户信息失败')
            } else {
                layer.msg(res.message || '获取用户信息成功')
                renderUserImg(res.data)
            }
        },
        // complete(res){
        //     if(res.responseJSON.status==1||res.responseJSON.message=='身份认证失败'){
        //         localStorage.removeItem('token');
        // location.href='/login.html';
        //     }
        // }
    })
}

//渲染用户头像
//优先 nikename

function renderUserImg(value) {
    // 获取用户名称
    let username = value.nickname || value.username;
    console.log(username);
    $('#welcome').html('欢迎&nbsp' + username);
    //渲染图片头像
    if (value.user_pic) {
        $('.userinfo img').attr('src', user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.userinfo img').hide();
        //TODO 获取字符串第一个字符
        let first = username[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }

}

//退出
$('#exit').on('click',function(){

    // layer.confirm('确定要退出吗？', {icon: 3, title:'提示'}, function(index){
    //     //do something
        

    //     layer.close(index);
    //   });
      //eg2
      layer.confirm('确定要退出吗？', function(index){
        //do something
        localStorage.removeItem('token');
        location.href='/login.html';
        layer.close(index);
      });       
    
})