import * as React from 'react'
import "./Seach.scss"

export default class Seach extends React.Component {
    public state:any;
    public defaultPlacehold:string;
    constructor(props:any){
        super(props);
        this.defaultPlacehold = "音乐/视频/电台/用户";
        Object.freeze(this.defaultPlacehold);
        this.focusUp = this.focusUp.bind(this);
        this.blurUp = this.blurUp.bind(this);
        this.state = {
            inputText: '',
            placeholder: this.defaultPlacehold,
            
        }
    }
    // 聚焦
    public focusUp():void {
        this.setState({
            placeholder:''
        })
    }
    // 失焦
    public blurUp():void {
        if (this.state.inputText.length < 1) {
            this.setState({
                placeholder:this.defaultPlacehold
            })
        }  
    }
    // 监听输入框输入事件
    public inputUp(e:any):void {
        this.setState({
            inputText:e.target.value
        })
    }

    public render() {
        return (
            <div className="seach">
                <div className="seachBox">
                    {/* 放大镜 */}
                    <span className="magnifier"/>
                    {/* 输入框 */}
                    <span className="seachList">
                        <input type="text" id="seach" placeholder={this.state.placeholder} onFocus={this.focusUp} onBlur={this.blurUp} onInput={this.inputUp.bind(this,event)}/>
                    </span>
                </div>
            </div>
        )
    }
}
