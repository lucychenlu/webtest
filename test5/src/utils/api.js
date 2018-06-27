import Crypto from './crypto'
import Vue from 'vue'
import $ from "jquery"
import * as Cookies from "js-cookie"

var json = {
    //登录
    // "LOGIN": "/api/v1/account/account/login",
    "LOGIN": "/api/v1/factory/login/",
    
    "LOGIN_QUICK": "/api/v1/account/account/login-quick",
    "LOGIN_CODE": "/api/v1/account/account/code",

    "UPLOAD_FILE":"/api/v1/tool/upload/file",


    "CLUB_INIT":"/api/v1/registration/club/init-club",
    "CLUB_ADD_INFO":"/api/v1/registration/club/add-info",
    "CLUB_ADD_BASE":"/api/v1/registration/club/add-base",
    "CLUB_LOAD_BASE":"/api/v1/registration/club/load-base",
    "CLUB_ADD_USER":"/api/v1/registration/club/add-user",
    "CLUB_LOAD_USER":"/api/v1/registration/club/load-user",
    "CLUB_ADD_CAPITAL":"/api/v1/registration/club/add-capital",
    "CLUB_LOAD_CAPITAL":"/api/v1/registration/club/load-capital",
    "CLUB_MY_INFO":"/api/v1/registration/club/my",
    "CLUB_LOAD_DEPARTMENT":"/api/v1/registration/club/load-department",
    "CLUB_ADD_DEPARTMENT":"/api/v1/registration/club/add-department",
    "CLUB_DEL_DEPARTMENT":"/api/v1/registration/club/del-department",
    // "CLUB_LOAD_PLAYER":"/api/v1/registration/club/load-player",
    "CLUB_LOAD_PLAYER":"/api/v1/factory/medicineFactory",
    "CLUB_ADD_PLAYER":"/api/v1/registration/club/add-player",
    "CLUB_DEL_PLAYER":"/api/v1/registration/club/del-player",
    "CLUB_LOAD_COACH":"/api/v1/registration/club/load-coach",
    "CLUB_ADD_COACH":"/api/v1/registration/club/add-coach",
    "CLUB_DEL_COACH":"/api/v1/registration/club/del-coach",
    "CLUB_ADD_MEMBER":"/api/v1/registration/club/add-member",
    "CLUB_LOAD_MEMBER":"/api/v1/registration/club/load-member",
    "CLUB_ADD_LOGO":"/api/v1/registration/club/add-member",
    "CLUB_ADD_ATTACHMENT":"/api/v1/registration/club/add-attachment",
    "CLUB_LOAD_ATTACHMENT":"/api/v1/registration/club/load-attachment",
    "CLUB_LOAD_QUERY":"/api/v1/registration/club/query-step",

    "CLUB_REVIEW":"/api/v1/registration/club/review",


    "TEAM_ADD":"/api/v1/registration/team/add",
    "TEAM_CREATE":"/api/v1/registration/team/create",

    "REGISTER_TEAM_LIST":"/api/v1/registration/team/get",
    "PLAYER_LIST":"/api/v1/registration/player/list",


    "TEAM_LIST":"/api/v1/team/index/team",
}

function post(key, data,router, cb) {
    let url= process.env.SERVER_URL+ json[key];
    // let cfa_id=process.env.CFA_ID;
    // data["cfa_id"]=cfa_id;

    //数据需要加密
    // var buf = Crypto.encrypt(data);
    // data = {DATA:buf};
    
    var token =Cookies.get('token') || '';
    $.ajax({
        //请求类型，这里为POST
        type: 'POST',
        //你要请求的api的URL
        url: url,
        //是否使用缓存
        cache: false,
        //数据类型，这里我用的是json
        //dataType: "json",
        //必要的时候需要用JSON.stringify() 将JSON对象转换成字符串
        data: data, //data: {key:value},
        // headers: { 'token': token },
        //请求成功的回调函数
        success: function(data) {
            var obj = data;
            // var d = Crypto.decrypt(data.DATA);
            // obj = eval('(' + d + ')');

            console.log(obj);
            if (obj.code == 1) {
                cb(obj.code, obj.msg, obj.detail);
                console.log("111");
            } else if(obj.code == 503){
                //登录过期
                router.push({ path: '/'});
            } else {
                alert(obj.msg);
                cb(obj.code, obj.msg, null)
            }
        },
    });
}


function get(key, data,router, cb) {
    let url= process.env.SERVER_URL+ json[key];
    // let cfa_id=process.env.CFA_ID;
    // data["cfa_id"]=cfa_id;

    //数据需要加密
    // var buf = Crypto.encrypt(data);
    // data = {DATA:buf};
    
    var token =Cookies.get('token') || '';
    $.ajax({
        //请求类型，这里为POST
        type: 'GET',
        //你要请求的api的URL
        url: url,
        //是否使用缓存
        cache: false,
        //数据类型，这里我用的是json
        //dataType: "json",
        //必要的时候需要用JSON.stringify() 将JSON对象转换成字符串
        data: data, //data: {key:value},
        headers: { 'Authorization': token },
        //请求成功的回调函数
        success: function(data) {
            var obj = data;
            // var d = Crypto.decrypt(data.DATA);
            // obj = eval('(' + d + ')');

            console.log(obj);
            if (obj.code == 1) {
                cb(obj.code, obj.msg, obj.detail);
                console.log("111");
            } else if(obj.code == 503){
                //登录过期
                router.push({ path: '/'});
            } else {
                alert(obj.msg);
                cb(obj.code, obj.msg, null)
            }
        },
    });
}
// 返回在vue模板中的调用接口
export default {
    post: post,
    get:get,
}