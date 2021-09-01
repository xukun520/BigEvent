  const {
      layer
  } = layui;
 
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
      // 纵横比
      aspectRatio: 1,
      // 指定预览区域
      preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  $('#btn').on('click', function (e) {
      $('#file').click();

  })

  //file 绑定一个change事件
  $('#file').on('change', function (e) {
      let file = e.target.files[0];
      console.log(file);
      if (file.length == 0) {
          return layer.msg('请选择图片')
      } else {

          let fileUrl = URL.createObjectURL(file);
          $image
              .cropper('destroy') // 销毁旧的裁剪区域
              .attr('src', fileUrl) // 重新设置图片路径
              .cropper(options) // 重新初始化裁剪区域
      }
  })
//   上传图片到服务器
  $('#btnComfirm').on('click',function(){
    var dataURL = $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    console.log(dataURL);

    $.ajax({
        url:'/my/update/avatar',
        method:'post',
        data:{
            avatar:dataURL
        },
        success(res){
            console.log(res);
            if(res.status!==0){
                return layer.msg(res.message||'请求失败')
            }else{
                layer.msg(res.message||'请求成功');
                window.parent.getUserInfo();
            }
            
        }
    })

  })