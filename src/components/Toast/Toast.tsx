import * as React from 'react'
import { IToastState, IToastMsg } from '../Type/Type';
import "./Toast.scss"

import { connect } from "react-redux";
import actionsStore from 'src/redux/actions/actions';
import { Action, ActionFunction1 } from 'redux-actions';
import { ShowPopoveType } from '../Type/ReduxType';

const mapStateToProps = (state: {toast:{ msg: string}}) => ({
    // tslint:disable-next-line:no-string-literal
    toast: state.toast
})

const mapDispatch = (dispatch: any) => {
    return {
        changeToastState: (payload: IToastMsg) => dispatch(actionsStore.setToastStatus({ ...payload })),
    }
}

class Toast extends React.Component {
    public state: IToastState;
    public timer: NodeJS.Timeout;
    constructor(props:{toast: {show: boolean, msg: string}}) {
        super(props);
        // console.log(props,'toastProps')
        this.state = {
            addAnimate: false,
            
            toastMsg: {
                duation: 3000,
                msg: '暂不支持此登陆类型',
                show: false
            }
        }
    }

    public async componentDidMount():Promise<void> {
        // await this.changeAnimateStatus(500, true);
    //    this.timer = await this.changeAnimateStatus(3000,true);
        this.timer = await this.changeAnimateStatus(5000, false);
    }

    /**
     * toast显示时间
     * @param time  时间
     */
    public async changeAnimateStatus(time:number,status:boolean) {
        const self =this;
      
       return await setTimeout(() => {
            self.setState({
                toastMsg: {
                    duation: 3000,
                    msg: '暂不支持此登陆类型',
                    show: status
                }
            })
            // tslint:disable-next-line:no-string-literal
            self.props['changeToastState'](self.state.toastMsg)
        //    console.log(this.state.addAnimate, '???')
         }, time)
          
        
    }

    public componentWillUnmount():void {
        // 清楚定时器
        clearTimeout(this.timer)
    }

    public render() {
        return (
            <div className={
                // tslint:disable-next-line:no-string-literal
                ["toast", 'iconfont icon-xiaoxi-jinggao', this.props['toast']['show'] ? 'addAnimate':''].join(' ')
                }>
                {
                    // tslint:disable-next-line:no-string-literal
                    this.props['toast']['msg']
                    // this.state.toastMsg
                }
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatch)(Toast);