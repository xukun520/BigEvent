$(function () {
    const {
        layer,form
    } = layui;
    initArticleCreate();

    function initArticleCreate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'get',
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message || '请求数据错误')
                } else {
                    // console.log(res);
                    layer.msg(res.message || '请求数据成功');
                    let htmlStr = template('tpl-table', res);
                    
                    $('#td').html(htmlStr)

                }
            }
        })
    }
    // 弹出层
    $('#add').on('click', function () {
        indexAdd = layer.open({
            title: '添加文章分类',
            area: ['500px', '250px'],
            type: 1,
            content: $('#dialog-add').html()
        });
    })

    //事件委托的方式发起ajax请求
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/addcates',
            method: 'post',
            data: $(this).serialize(),
            success(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message || '请求数据失败');
                } else {
                    initArticleCreate();
                    layer.msg(res.message || '请求数据成功');
                    layer.close(indexAdd);

                }
            }
        })
    })

    // 修改
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        let id = $(this).attr('data-id')
        console.log(id);

    // 发起请求获取对应分类的数据
    $.ajax({
        method: 'GET',
        url: '/my/article/cates/' + id,
        success: function (res) {
            console.log(res);
            form.val('form-edit', res.data)
        }
    })

    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
              method: 'POST',
              url: '/my/article/updatecate',
              data: $(this).serialize(),
              success: function(res) {
                if (res.status !== 0) {
                  return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArticleCreate();

              }
        })
    })

    
    })

    //删除
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
          $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function(res) {
                console.log(res);
              if (res.status !== 0) {
                return layer.msg('删除分类失败！')
              }
              layer.msg('删除分类成功！')
              layer.close(index)
              initArticleCreate();

            }
          })
        })
    })




})