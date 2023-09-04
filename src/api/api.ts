import axios, { AxiosInstance } from 'axios';
import { ENV } from '@/assets/enum/enum';

let hostURL : string = ''; //預設的後端網址
let apiReq: AxiosInstance =  axios.create({});//axios實體
let nowENV = import.meta.env.VITE_ENV ;

//#region URL
let urlExample = '/';
//#endregion 
//#region API
export let apiExample: any;
//#endregion
//#region API共用處理 axios 實例
const axionInit = (axios:any, base: string) => {
    axios.defaults.baseURL = base;
    axios.interceptors.request.use((config: any) => {
        //處理驗證問題
        // config.headers.Authorization ='Bearer '+ csrfToken;
        config.withCredentials = true
        return config;
    }, function (error: any) {
        return Promise.reject(error);
    });
    axios.interceptors.response.use(function (response : any) {
        if (response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }, function (error: any) {
        console.log('error',error)
        if (error.response) {
            apiErrorHandle(error);
            // 處理api error的錯誤
        }
        return Promise.reject(error);
    });
  // console.log('axionInit END')
}
axionInit(apiReq, hostURL);
const apiErrorHandle = (res:any) => {
    console.log(`api error:${res}`)
}
//#endregion
switch(nowENV){
    case ENV.MOCK:
        break;
    case ENV.DEV:
    case ENV.STAGING:
    case ENV.PROD:
        apiExample = (sendData) =>  {
            let base = `${urlExample}`
            return urlFilter(base, sendData, 'get')
        }
        apiExample = (url,sendData) => {
            let base = `${urlExample}`
            return urlFilter(base, url, 'post',sendData)
        };
        apiExample = (urlData,sendData,bodyData) => {
            let base = `${urlExample}/${urlData.id}`
            return urlFilter(base, sendData, 'patch',bodyData)
        };
        apiExample = (urlData,sendData) => {
            let base = `${urlExample}/${urlData.id}`
            return urlFilter(base, sendData, 'delete',)
        };
        break;
}

const urlFilter = (orgUrl:any, sendData = {}, method = 'get', bodyData = undefined, type = '') => {
    let url = '?'
    for (let e in sendData) {
        if (sendData[e] || sendData[e] == 0) {
            url += `${e}=${sendData[e]}&`
        }
    }
    let hasParams = Object.keys(sendData).length > 0
    url = hasParams ? url.substring(0, url.length - 1)+type : '?'+url.substring(0, url.length - 1)+type;
    // console.log('url',orgUrl, url,)
    switch (method) {
        case 'post':
            return apiReq.post(`${orgUrl}${url}`, bodyData)
        case 'get':
            return apiReq.get(`${orgUrl}${url}`, { params: bodyData })
        case 'delete':
            return apiReq.delete(`${orgUrl}${url}`, bodyData)
        case 'put':
            return apiReq.put(`${orgUrl}${url}`, bodyData)
        case 'patch':
            return apiReq.patch(`${orgUrl}${url}`, bodyData)
        default:
            console.log(`未知的 method: ${method}`);
            return false;
    }
  // return apiReq.method(`${orgUrl}${url}`)
}
