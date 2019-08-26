import * as React from 'react';
import './App.scss';
import Router from './router/Router';
import './static/fonts/iconfont.css'

import { withRouter } from 'react-router-dom';
import Toast from './components/Toast/Toast';
import { IAppState } from './components/Type/Type';

class App extends React.Component {
  public state: IAppState;
  constructor(props:any){
    super(props);
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
        {this.state.toastStatus ? <Toast {...this.state} />:null}  
      </div>
    );
  }
}

export default withRouter(App) ;
