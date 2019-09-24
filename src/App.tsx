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



const mapStateToProps =(state:any) => ({
  toast  : state.toast
})

class App extends React.Component {
  public state: IAppState;
  constructor(props:any){
    super(props);
    // console.log(props,'nnn')
    this.state = {
      toastStatus:true , // toast状态
    }
  }
  public componentDidMount():void {
    // 
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

        <Music />
      </div>
    );
  }
}

export default withRouter<RouteComponentProps<any, StaticContext, any>,any>(connect(mapStateToProps)(App));
