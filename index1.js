const { json } = require('express');
var express = require('express');
var path = require('path')


//创建一个app对象（类似创建一个server对象）
var app = express();


//注销路由
//通过中间件监听指定的路由的请求
//req.url中的pathname部分必须和 / index一致
app.use('/music_list.xml', function (request, response) {

    //response.send('hello express,世界')
    // response.send('<h1>hello express,世界</h1>')
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.sendFile(path.join(__dirname, 'music_list.xml'))

    //response.end('hello world', 'utf-8')

})
app.use('/ajax_info.txt', function (request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.sendFile(path.join(__dirname, 'ajax_info.txt'))
    // response.send(' 请求!!!! ')

})

app.all('/delay', function (request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(function () {
        response.send('延时响应')
    }, 3000)
})

app.all('/jquery-delay', function (request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');

    const data = { name: '啊哈哈' }

    response.send(JSON.stringify(data))
})

app.all('/jquery-jsonp-server', function (request, response) {
    const data = {
        name: 'lily',
        city: 'nanjing'
    };
    let str = JSON.stringify(data);
    let cb = request.query.callback;
    response.send(`${cb}(${str})`)
})

app.all('/jsonp-server', function (request, response) {
    // response.setHeader('Access-Control-Allow-Origin', '*');
    // response.setHeader('Access-Control-Allow-Headers', '*');

    const data = { name: '啊哈哈', exist: 1, msg: '用户名已存在' }
    let str = (JSON.stringify(data))
    response.send(`handle(${str})`)
})

app.use('/', function (request, response) {
    response.send('<h2> use请求 </h2>')
})

//response.params获取路由中的参数；
app.get('/news/:year/:month/:day', function (request, response) {
    response.send(request.params)
})

app.use('/location', function (request, response) {
    response.redirect('https://www.bilibili.com/')
})




//启动服务
app.listen(8088, function () {
    console.log('okk');
});