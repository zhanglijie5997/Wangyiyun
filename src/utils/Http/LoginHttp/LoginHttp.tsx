import HttpClient from '../Http';
 class LoginHttp {
    public static instance: LoginHttp = new LoginHttp();
    private _APPID: string = 'wx2bd0f9860a630ab4';
    private _SECRET: string = '719215c9c666225420fe9ef5fbd2a324';
    
    // 微信登陆获取token
    public async getAccessToken(): Promise<any> {
        return await HttpClient.init(`/cgi-bin/token?grant_type=client_credential&appid=${this._APPID}&secret=${this._SECRET}`, { method: 'get' },'https://api.weixin.qq.com')
                .then((res: any) => res)
    }
}

export default LoginHttp.instance;