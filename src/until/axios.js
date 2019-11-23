import Vue from "vue";
import axios from "axios";
//impotrt store from "../";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = envObject && envObject[Process.env.NODE.ENV] || "";
const pref = axios.defaults.baseURL;
if(process.env.NODE.ENV =="dev"){
    axios.defaults.baseURL = "http://192.168.0.21;8080";
}
axios.interceptors.request.use((req)=>{
    Response.headers["token"] = Vue.cookie("token") //请求头添加token
    return req;
},(error)=>Promise.reject(error));
//待续