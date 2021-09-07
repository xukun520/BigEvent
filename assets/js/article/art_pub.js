$(function () {
    const {
        layer,
        form
    } = layui;
    initCate();

    // 初始化富文本编辑器
    initEditor()

    function initCate() {
        $.get('/my/article/cates', function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message || '请求数据出错');
            } else {

                //调用模版引擎渲染数据 
                // console.log(res);
                let htmlStr = template('tpe_cate', res);
                // console.log(htmlStr);
                $('[name=cate_id]').html(htmlStr);
                form.render()
            }
        })





    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#changeCover').on('click', function () {
        $('#coverFile').click();
    })

    $('#coverFile').on('change', function (e) {

        var file = e.target.files[0]
        if (file.length <= 0) {
            return layer.msg('请选择图片')
        }

        var newImgURL = URL.createObjectURL(file)
        // console.log(newImgURL);

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域


    })
    // 定义文章状态
    let art_status = '已发布';

    //发布事件
    $('#publish').on('click', function () {


    })
    //存为草稿事件
    $('#savadraft').on('click', function () {
        let art_status = '草稿';


    })

    $('#form_pub').on('submit', function (e) {
        e.preventDefault();
        let formdata = new FormData($(this)[0])
        formdata.append('state', art_status);

        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                formdata.append('cover_img', blob);

                //定义一个发布文章的方法
                publishArticle(formdata)

            })

        formdata.forEach((key, value) => {
            console.log(key, value);
        })
        

    })

    function publishArticle(value){

        $.ajax({
            method:'post',
            url:'/my/article/add',
            data:value,
            contentType:false,
            processData:false,
            success(res){
                console.log(res);
                if(res.status!==0){
                    return layer.msg(res.message||'文章发布失败！');
                }else{
                    layer.msg(res.message||'文章发布成功！');
                    location.href='/article/art_list.html';
                   

                }
               
            }

        })

    }



})