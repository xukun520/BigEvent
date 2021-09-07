// 所有接口发起请求都会经过ajaxPrefilter
$.ajaxPrefilter(function (options) {

    // indexOf 返回查找到元素索引 否则-1
    // includes
    // console.log(options.url);
    if (options.url.startsWith('/my')) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //生命周期 complete 在success回调函数之后执行
    options.complete = function (res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }

    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

})