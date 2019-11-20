
import * as React from 'react';
import Router from './router/Router';
import { withRouter } from 'react-router-dom';
import loadable from "@loadable/component";
const Toast = loadable(() => import('./components/Toast/Toast'));
const Music = loadable(() => import('./components/Music/Music'));
import { IAppState } from './components/Type/Type';
import {connect  } from "react-redux";
import { StaticContext, RouteComponentProps } from 'react-router';
import './App.scss';
import './static/fonts/iconfont.css'
import actionsStore from './redux/actions/actions';



const mapStateToProps =(state:any) => ({
  toast  : state.toast,
  targetPage: state.targetPage
});
const mapDispatch = (dispatch: any) => ({
  setTargetPage: (payload: string) => dispatch(actionsStore.setTargetPage(payload))
})
class App extends React.Component {
  public state: IAppState;
  constructor(props:any){
    super(props);
    console.log(props,'nnn')
    // props.setTargetPage(props.location.pathname);
    this.state = {
      toastStatus:true , // toast状态
    }
  }
  public componentDidMount():void {
    // 
    this.props["setTargetPage"](this.props['location'].pathname)
  }
  public render() {
    return (
      <div className="App">
        <Router {...this.props}/>
        {/* {Router} */}
        {
          // tslint:disable-next-line:no-string-literal
          this.props['toast']['show'] ? <Toast />:null
        }  

        {this.props["targetPage"] !== "/Singer" ? <Music />:null} 
      </div>
    );
  }
}

export default withRouter<RouteComponentProps<any, StaticContext, any>,any>(connect(mapStateToProps, mapDispatch)(App));
