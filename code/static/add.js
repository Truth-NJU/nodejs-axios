var express = require('express');
var fs = require("fs");
var app = express();

app.use(express.static(__dirname));

// 解决跨域问题
var cors = require('cors');
app.use(cors({
    // 63342是前端的端口地址
    origin:['http://localhost:63342'],
    methods:['GET','POST'],
    alloweHeaders:['Conten-Type', 'Authorization']
}));

app.get('/signUp', function (req, res) {

    // 连接数据库
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'tzh444582',
        port: '3306',
        database: 'UserData'
    });

    connection.connect();

    // 获得前端传过来的参数
    var response = {
        "username":req.query.username,
        "password":req.query.password
    };

    // 插入新的用户名和密码数据
    var  addSql = 'INSERT INTO user(username,password) VALUES(?,?)';
    var  addSqlParams = [response.username, response.password];
    //增
    connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }

        console.log(result);
        // 将结果返回到前端
        res.send(result);
    });


    connection.end();
});


var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

});

