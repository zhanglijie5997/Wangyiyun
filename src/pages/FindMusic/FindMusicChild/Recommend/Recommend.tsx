import * as React from 'react'
import RecommendHeader from './Header/RecommendHeader';
import "./Recommend.scss";
import IndexHttp from '../../../../utils/Http/HttpList/IndexHttp';
import ThemeColor from './Provider/Provider';
import { RecommendState } from 'src/components/Type/Recommend';
import RecommendBody from './Body/RecommendBody';

export default class Recommend extends React.Component {
    public state: RecommendState;
   
    constructor(props:any) {
        super(props);
        this.state = {
            banner:'',
            hotMusicList:[]
        };
        
    }
    public async componentDidMount():Promise<void> {
       // 请求banner数据
       const banner = await IndexHttp.banner();
        const hotMusicList = await IndexHttp.hotMusicList();
        // console.log(banner);
       await this.setState({
           banner,
           hotMusicList
       });
    }

    public  render() {

        return (
            <div>
                <ThemeColor.Provider value='#ff3030'> 
                    {this.state.banner ? <RecommendHeader  {...this.state.banner} />:null}
                    {this.state.hotMusicList ? <RecommendBody {...this.state.hotMusicList}/> : null}
                </ThemeColor.Provider>
                
            </div>
        )
    }
}
