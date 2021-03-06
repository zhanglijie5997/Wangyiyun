import * as React from 'react';

import { list } from "../pages/index";

import IRouterList, { IRouterState } from '../components/Type/Type';

import { Link, Route, Switch,} from 'react-router-dom';

import FindMusicChild from "../pages/FindMusic/FindMusicChild/index";

import Seach from "../components/Seach/Seach";

import Login from 'src/components/Login/Login';

import "./Router.scss"

import LoginPopove from '../components/Login/LoginPopove/LoginPopove';
import { connect } from "react-redux";
import { ShowPopoveType } from 'src/components/Type/ReduxType';
import actionsStore from 'src/redux/actions/actions';


const mapStateToProps = (state: { showPopove: ShowPopoveType }) => ({
    showPopove: state.showPopove
})
const mapDispatch = (dispatch: any) => ({
    setTargetPage: (page: string) => dispatch(actionsStore.setTargetPage(page))
})

class Router extends React.Component {
    public state: IRouterState;

    constructor(props: { showPopove: ShowPopoveType}) {
        super(props);
        // tslint:disable-next-line:no-console
        // console.log(props)
        this.state = {
            defaultName: 'recommend',
            findmusicLisDefaultName: 'recommend'
        };
        this.changeRoute = this.changeRoute.bind(this);
        this.changeRouteFind = this.changeRouteFind.bind(this)
    }
    /**
     * 一级导航点击事件
     * @param name 一级导航name值
     */
    public changeRoute = (name: string, path: string) => {
        // tslint:disable-next-line:no-console
        // console.log(path, 'path')
        this.setState({
            defaultName: name
        });
        // 将Link存本地
        // Storage.SessionStorage("path", name);
        this.props["setTargetPage"](path)
    }

    /**
     * 二级导航点击事件
     * @param name 二级导航样式
     */
    public changeRouteFind = (name: string, path: string): void => {
        this.setState({
            findmusicLisDefaultName: name
        });
        this.props["setTargetPage"](path)
    }

    public async componentDidMount(): Promise<void> {
        // 
       
        
        // tslint:disable-next-line:no-string-literal
        const pathname:string = this.props['location'].pathname;
       
        list.forEach((item:IRouterList) => {
                // tslint:disable-next-line:no-string-literal
            if (item.to === pathname) {
                this.setState({
                    defaultName: item.classname
                })
            }
        });

        FindMusicChild.forEach((item:IRouterList) => {
            if(item.to === pathname) {
                this.setState({
                    findmusicLisDefaultName: item.classname
                })
            }
        })
         
    }
    // 路由跳转选中跳转路由
    public changeRouteDefaultName(lists: IRouterList[], name: string,): void {
        lists.forEach((item: IRouterList) => {
            if (item.to === name) {
                this.setState({
                    findmusicLisDefaultName: item.classname
                })
            }
        })
    }

    public UNSAFE_componentWillUpdate(nextProps: {location: {pathname: string}}): void {
        // tslint:disable-next-line:no-string-literal
        if (this.props["location"].pathname !== nextProps["location"].pathname ) {
            this.changeRouteDefaultName(FindMusicChild, nextProps.location.pathname);
        }
    }

    public render() {
        // Link 导航
        const routerLink: JSX.Element[] = list.map((item: IRouterList, index: number) => {

            let defaultName = this.state.defaultName;
            defaultName = defaultName.replace(/\"/g, '');
            return (
                // tslint:disable-next-line:jsx-no-lambda
                <li key={index} onClick={() => this.changeRoute(item.classname, item.to)} className={[item.classname === defaultName ? 'linkAddBg' : '', item.classname].join(' ')}>
                    <Link to={item.to} className={item.classname}>
                        <em>{item.name}</em>
                    </Link>
                    {defaultName === item.classname ? <div className="triangle" /> : null}
                    {item.hot ? <div className="hot">HOT</div> : null}

                </li>
            )
        })

        // 页面
        const routePage: JSX.Element[] = (list.concat(FindMusicChild)).map((item: IRouterList, index: number) => {
            return (
                <Route path={item.to} component={item.component} key={index} exact={true} />
            )
        })
        // 发现音乐二级路由
        const findMusiceChild: JSX.Element[] = FindMusicChild.map((item: IRouterList, index: number) => {
            
            return (
                // tslint:disable-next-line:jsx-no-lambda
                <li key={index} onClick={() => this.changeRouteFind(item.classname, item.to)}>
                    <Link to={item.to} className={item.classname} >
                        <em className={`${this.state.findmusicLisDefaultName === item.classname ? 'linkSecendAddBg' : null}`}> {item.name}</em>
                    </Link>
                </li>
            )
        })

        return (
            <div className="router-view">
                <div className="tabBarBox">
                    <div className="tabBar">
                        <nav className="navBar">
                            <h1 className="logo">
                                <a href="#" />
                            </h1>
                            <ul>
                                {routerLink}
                            </ul>
                            {/* 搜索框 */}
                            <Seach />
                            <div className="makeCenter">
                            <Link to='/MyMusic' className="makeCenterText" onClick={() => this.changeRoute('mymusic', '/MyMusic')}>
                                    创作者中心
                                </Link>
                            </div>
                            <Login {...this.props}/>
                        </nav>

                    </div>

                    {
                        // tslint:disable-next-line:no-string-literal
                        this.props["showPopove"]["show"] ? <LoginPopove /> : null
                    }

                    <div className="bottomSolid">
                        <ul>
                        {this.state.defaultName.replace(/\"/g, '') ===  "recommend" ? findMusiceChild : null}
                        </ul>
                    </div>
                </div>
                <Switch> {routePage}</Switch>
                    
                

            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatch)(Router);
