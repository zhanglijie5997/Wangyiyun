import { IUser } from 'src/components/Type/Type';

export const token: string = ''; // token默认值

export const showPopove: boolean = false; // 显示登陆popove

export const user: IUser = { // 用户信息
    email: '',
    phone: 110,
    username: '',
}

export const loginType: string = "手机号登陆"; // 登陆类型

export const toastMsg = {  // toast信息
    duation: 3000,  // 停留时间
    msg: '',        // 展示信息
    show: true,    // 是否显示
}