import Vue from "vue"
export function getWebsocket(url,id){
    let ws;
    if("websoket" in window){
        console.log("您的浏览器支持 WebSocket!");
        ws = new WebSocket(url);
        ws.onpen = function (){
            console.log("WebSocket 连接中");

        }
        Vue.prototype.$ws = ws;
    
        // function Packet(cmd,body){
        //     return {
        //         cmd:cmdm
        //         body:body
        //     }
        // }
        ws.onmessage = function (evt){
            // 接受服务端的消息推送
            let dt = evt.data;
            dt = JSON.stringify(evt.data);
            dt.t = new Date().getTime();
            StorageEvent.commit("set_skt",dt);
        };
        ws.onerror = function (){
            // 通信发生错误时触发
            console.log("WebSocket 连接发生错误...")
        }
        ws.onclose = function (){
            //关闭websocket
            console.log("WebSocket 连接已关闭...")
        }
        function sendMsg(msg){
            if(window.WebSocket){
                if(ws.readyState == ws.OPEN){
                    ws.send(JSON.stringify(msg))
                }
            }else{
                return;
            }
        }
    }else{
        //浏览器不支持 WebSocket
        console.log("您的浏览器不支持 WebSocket")
    }
}