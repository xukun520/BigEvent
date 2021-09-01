// console.log(1);
function request(url,data,method='GET'){
    return fetch(url,{
        method,
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        },
    }).then(response=>{
        return response.json();
    })
}
function getAll(){
    console.log(1);
    request('http://localhost:3000/preson').then(response=>console.log(response))
}

function postAll(){
    request('http://localhost:3000/preson',{name:'xx',age:11},'post').then(
        response=>console.log(response)
    )
}

// TODO 返回一个promise 2.stream 数据流 需要使用JSON方法进行转换