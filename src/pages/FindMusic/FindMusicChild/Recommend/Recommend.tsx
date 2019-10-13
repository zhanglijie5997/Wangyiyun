import * as React from 'react';
import loadable from "@loadable/component";
const RecommendHeader = loadable(() => import("./Header/RecommendHeader"));
const RecommendBody = loadable(() => import("./Body/RecommendBody"));
import "./Recommend.scss";
import IndexHttp from '../../../../utils/Http/HttpList/IndexHttp';
import ThemeColor from './Provider/Provider';
import { RecommendState } from 'src/components/Type/Recommend';
// import { debounce } from 'src/utils';

export default class Recommend extends React.Component {
    public state: RecommendState;
   
    constructor(props:any) {
        super(props);
        this.state = {
            banner:'',
            hotMusicList:{}
        };
        
    }
    public scrollBack = (event: any)  => {
        console.log(event,'iiii')
    }

    public async componentDidMount():Promise<void> {
        // const self = this;
       // 请求banner数据
       const banner = await IndexHttp.banner();
       const hotMusicList = await IndexHttp.hotMusicList();
        // console.log(banner);
       await this.setState({
           banner,
           hotMusicList
       });
       
        // document.addEventListener("scroll", debounce(self.scrollBack,500))
        // console.log(hotMusicList)
    }

    public  render() {

        return (
            <div>
                <ThemeColor.Provider value='#ff3030'> 
                    {this.state.banner ? <RecommendHeader  {...this.state.banner} />:null}
                    {this.state.hotMusicList.tags ? <RecommendBody {...this.state.hotMusicList}/> : null}
                </ThemeColor.Provider>
                
            </div>
        )
    }
}
