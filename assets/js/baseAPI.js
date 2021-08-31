// 所有接口发起请求都会经过ajaxPrefilter
$.ajaxPrefilter(function(options){

    console.log(options.url);
    options.url+='http://api-breakingnews-web.itheima.net';

})