import { IUser } from 'src/components/Type/Type';
import { ShowPopoveType } from '../../components/Type/ReduxType';

export const token: string = 'shabi'; // token默认值

export const showPopove: ShowPopoveType = {// 显示登陆popove
    show:false,
    type:'phone'
} 

export const user: IUser = { // 用户信息
    email: '',
    phone: 110,
    username: '',
}

export const loginType: string = "手机号登陆"; // 登陆类型

export const toastMsg = {  // toast信息
    duation: 3000,  // 停留时间
    msg: '暂不支持此登陆类型',        // 展示信息
    show: false,    // 是否显示
}

export const targetPage: string = `/`; // 当前路由