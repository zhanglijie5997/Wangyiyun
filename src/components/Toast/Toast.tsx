import * as React from 'react'
import { IToastState, IToastMsg } from '../Type/Type';
import "./Toast.scss"

import { connect } from "react-redux";
import actionsStore from 'src/redux/actions/actions';

const mapStateToProps = (state:any) => ({
    // tslint:disable-next-line:no-string-literal
    toastMsg: state
})

const mapDispatch = (dispatch:any) => {
    return {
        changeToastState: (payload: IToastMsg) => dispatch(actionsStore.setToastStatus({ ...payload })),
    }
}

class Toast extends React.Component {
    public state: IToastState;
    constructor(props:any) {
        super(props);
        console.log(props,'toastProps')
        this.state = {
            addAnimate: false,
            
            toastMsg: {
                duation: 3000,
                msg: '暂不支持此登陆类型',
                show: false
            }
        }
    }

    public async UNSAFE_componentWillMount():Promise<void> {
        // await this.changeAnimateStatus(500, true);
        // await this.changeAnimateStatus(3000,true);
    }

    /**
     * toast显示时间
     * @param time  时间
     */
    public async changeAnimateStatus(time:number,status:boolean) {
        const self =this;
      
        await setTimeout(() => {
            self.setState({
                toastMsg: {
                    duation: 3000,
                    msg: '暂不支持此登陆类型',
                    show: status
                }
            })
         }, time)
          // tslint:disable-next-line:no-string-literal
        await self.props['changeToastState'](self.state.toastMsg)
        console.log(this.state.addAnimate,'???')
    }

    public render() {
        return (
            <div className={
                // tslint:disable-next-line:no-string-literal
                ["toast", 'iconfont icon-xiaoxi-jinggao', this.props['toastMsg']['toast']['show'] ? 'topToBottom' :'' ].join(' ')
                }>
                {
                    // tslint:disable-next-line:no-string-literal
                    this.props['toastMsg']['toast']['msg']
                    // this.state.toastMsg
                }
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatch)(Toast);