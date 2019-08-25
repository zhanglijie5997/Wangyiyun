import * as React from 'react';
import './App.scss';
import Router from './router/Router';
import './static/fonts/iconfont.css'

class App extends React.Component {
  public componentDidMount():void {
    // 
  }
  public render() {
    return (
      <div className="App">
        <Router />
        {/* {Router} */}
      </div>
    );
  }
}

export default App;
