import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import {stringify} from "querystring";
import HttpStatus from './HttpStatus/HttpStatus';
class HttpClient {
    public static instance:HttpClient = new HttpClient();
    public mapList:Map<string,boolean>;
    constructor() {
        // 
        this.mapList = new Map();
    }
    /**
     * 请求拦截，相应拦截
     * @param url   地址
     * @param http  axios
     */
    public httpClient(url: string, http: any) {
        // 请求拦截
        http.interceptors.request.use((config:AxiosRequestConfig):any => {
            this.mapList.set("url",false)
            return config;
        })

        // 响应拦截
        http.interceptors.response.use((config:AxiosResponse):any => {
            // 如果存在此请求则取消上一个请求,并从map对象中删除
            if(!this.mapList.get(url)) {
                this.cancelToken();
                this.mapList.delete(url)
            }
            const data = new HttpStatus(config.data).init(config.data);
            // console.log(config.data,'config')
            return Promise.resolve(data)
        },(err:Error) => {
           return  Promise.reject(err);
        })
    }
    /**
     * 创建请求
     * @param url    地址
     * @param param1 axios内容 必须包含data
     */
    public async init(url: string, { ...params }: any, baseUrl: string = "http://localhost:3000/"): Promise<any> {
        const axiosInit = axios.create({
            baseURL: baseUrl,   
            method: "GET",
            timeout: 10000,
            ...params,
            data: stringify(params.data),
            url,
        })
        // console.log(axiosInit,'axiosInit')
        await this.httpClient(url,axiosInit);
        return axiosInit(url,{...params})
    }

    // 取消请求
    public cancelToken(): CancelTokenSource {
        return axios.CancelToken.source()
    }

}

export default HttpClient.instance;