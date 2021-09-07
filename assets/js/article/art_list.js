  // 定义一个查询的参数对象，将来请求数据的时候，
  // 需要将请求参数对象提交到服务器
  const {
    layer,
    form,
    laypage
  } = layui;
  const q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: '', // 文章分类的 Id
    state: '' // 文章的发布状态
  }
  //   获取文章列表方法
  initTable()

  // 时间美化
  template.defaults.imports.dataFormate = function (value) {
    let dt = new Date();
    let y = padZero(dt.getFullYear());
    let m = padZero(dt.getMonth() + 1);
    let d = padZero(dt.getDate());
    let hh = padZero(dt.getHours());
    let mm = padZero(dt.getMinutes());
    let ss = padZero(dt.getSeconds());

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;

  }

  //定义补零函数
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }

  // 获取文章列表数据的方法
  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        // console.log(res);

        if (res.status !== 0) {
          return layer.msg('获取文章列表失败！')
        }
        // 使用模板引擎渲染页面的数据
        let htmlStr = template('tpl-table', res)
        // console.log(htmlStr);
        $('tbody').html(htmlStr)
        renderPages(res.total)
      }
    })
  }
  articleCat();
  // 获取文章分类 模版引擎渲染到页面上去
  function articleCat() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        } else {
          let htmlStr = template('tpl_cat', res);
          // console.log(htmlStr);
          $('#cat_select').html(htmlStr);
          form.render();

        }
      }
    })
  }

  $('#filterData').on('click', function (e) {
    e.preventDefault()
    let cate_id = $('[name=cate_id]').val();
    let state = $('[name=state]').val();
    q.cate_id = cate_id;
    q.state = state;
    initTable();

  })


  //渲染分页的方法
  renderPages();

  function renderPages(total) {
    console.log(total);
    laypage.render({
      elem: 'pageBox',
      count: total,
      limit: q.pagesize,
      curr: q.pagenum,
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [2, 3, 5, 10],
      // 分页触发回调函数
      jump: function (obj, first) {
        // console.log(obj.curr);
        // 最新页码值复制到pagenum
        q.pagenum = obj.curr;
        q.pagesize = obj.limit;
        if (!first) {
          initTable()
        }
        //  

      }
    }) 
  }

  // 删除功能
  // 当数据除完成后，需要判断当前这一页中，是否还有剩余的数据
  // 如果没有剩余的数据了，则让页码值-1 之后，再重新调用 imitable 方法

  // 判断删除按钮个数

  // $('body').on('click', '#del', function () {
  //   const len=$('#del').length;
  //   let id = $(this).attr('data-id');
  //   console.log(id);
  //   $.ajax({
  //     method: 'get',
  //     url: '/my/article/delete/' + id,
  //     success(res) {
  //       if (res.status !== 0) {
  //         return layer.msg(res.message || '删除失败');

  //       } else {
  //         layer.msg(res.message || '删除成功');
  //         if(len===1){
  //           q.pagenum=q.pagenum===1?1:q.pagenum--;
  //         }
  //         initTable();

  //       }
  //     }
  //   })
  // })

  $('tbody').on('click', '#del', function() {
    // 获取删除按钮的个数
    var len = $('#del').length;
    // 获取到文章的 id
    var id = $(this).attr('data-id')
    // 询问用户是否要删除数据
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/delete/' + id,
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('删除文章失败！')
          }
          layer.msg('删除文章成功！')
          // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
          // 如果没有剩余的数据了,则让页码值 -1 之后,
          // 再重新调用 initTable 方法
          // 4
          if (len === 1) {
            // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
            // 页码值最小必须是 1
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
          }
          initTable()
        }
      })

      layer.close(index)
    })
})