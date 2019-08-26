import * as React from 'react';
import './App.scss';
import Router from './router/Router';
import './static/fonts/iconfont.css'

import { withRouter } from 'react-router-dom';






class App extends React.Component {
  constructor(props:any){
    super(props)
  }
  public componentDidMount():void {
    // 
  }
  public render() {
    return (
      <div className="App">
        <Router {...this.props}/>
        {/* {Router} */}
      </div>
    );
  }
}

export default withRouter(App) ;
