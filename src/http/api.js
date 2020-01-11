import Http from "./http";
import site from './site';
const method = ["get", "post", "put", "delete"];
const http = new Http();
let baseUrl = site.baseUrlDev;
function setUrl(url) {
    baseUrl = url;
}

function restFul(url, excludeMethod = []) {
    let obj = {};
    if (typeof excludeMethod === "string") {
        excludeMethod = [excludeMethod];
    }
    if (!Array.isArray(excludeMethod)) {
        excludeMethod = [];
    }
    method.forEach(item => {
        if (!excludeMethod.includes(item)) {
            let conf = {};
            if(item === 'post'){
                obj[item] = (params, conf,loading) => {
                    return http.requestAll(baseUrl + url, params, { 'content-type': 'application/x-www-form-urlencoded' },item,true);
                };
            }else{
                obj[item] = (params, conf,loading) => {
                    return http.requestAll(baseUrl + url, params, conf,item,true);
                };
            }
        }
    });
    return obj;
}
export default {
    setUrl: setUrl,
    login: restFul('/Api/Login'),
}

