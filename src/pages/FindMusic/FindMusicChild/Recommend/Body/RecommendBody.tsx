import * as React from 'react';
import  "./RecommendBody.scss";
import loadable from "@loadable/component";
const MusicList = loadable(() => import("../../../../../components/MusicList/MusicList"));
const BodyChild = loadable(() => import("./BodyChild/BodyChild"));
const NewCdList = loadable(() => import('./NewCdList/NewCdList'));
import IndexHttp from '../../../../../utils/Http/HttpList/IndexHttp';


const RecommendBody = (props:any):JSX.Element => {
    const [musicList,setMusicList] = React.useState<any[]>([]); // 推荐数据
    const [leaderBorderData,setLeaderBorderData] = React.useState<any[]>([]); // 新碟上架数据
    const [newCdMargin,setNewCdMargin] = React.useState<number>(-645); // 左右滑动距离
    const [newCdTransition,setNewCdTransition] = React.useState<number>(2); // 轮播图过度时间
    const [time,setTime] = React.useState<any>(null); // 轮播定时器
    React.useEffect(() => {
        // 首页推荐接口
        const getTopArtists = async (): Promise<any> => {
            const data: any = await IndexHttp.personalized(8);
            const leaderBorderList = await IndexHttp.albumNewest();
            console.log(leaderBorderList);
            setLeaderBorderData(leaderBorderList.albums);
            
            Promise.all([IndexHttp.topList(3),IndexHttp.topList(0),IndexHttp.topList(2)])
            .then((res: any) => {
                console.log(res,';;;;;;ppp')
            })
            // console.log(data, musicList,'gggg');
            setMusicList(data.result);
        }
       getTopArtists();
    },[])
    // 音乐列表
    // tslint:disable-next-line:ban-types
    const musicTypeList = (lists: any[],ComponentsList: Function ):JSX.Element[] => {
        return lists.map((item:any,index:number) => {
            return (
                <li key={index}>
                    <ComponentsList item={item} className="musicLists" />
                </li>
                
            )
        })
        
    }

     
     /**
      * 新碟上架左右滑动
      * @param type 左右滑动，true 向右，false向左
      */
    const slideNewCd = (type: boolean) => React.useCallback(() => {

        const clientWidth: number = -645;
        let newClientWidth:number = newCdMargin;
        
        if(type) {
            newClientWidth < clientWidth * 3 ? (newClientWidth = 0, setNewCdTransition(0)) : (newClientWidth += clientWidth,setNewCdTransition(2));
        }else {
            newClientWidth > 0 ? (newClientWidth = 3 * clientWidth, setNewCdTransition(0)) : (newClientWidth -= clientWidth, setNewCdTransition(2));
        }
        // console.log(setNewCdTransition,'???')
        setNewCdMargin(newClientWidth);

    }, [newCdMargin])

    React.useEffect(() => {
        // 新碟上架轮播左侧到0
        if (newCdMargin <= -1935) {
           const times = setTimeout(() => {
                
                setNewCdTransition(0);
                setNewCdMargin(-645);
               clearTimeout(times)
            },2000)
            setTime(times)
        }else if(newCdMargin >= 0) {
            const times = setTimeout(() => {
                
                setNewCdTransition(0);
                setNewCdMargin(-1290);
                clearTimeout(times)
            }, 2000)
            setTime(times)
            // setNewCdTransition(0);
            
        }
        return () => clearTimeout(time)
     }, [newCdMargin])

    return (
        <div className="recommemdBodyHeader">
            <div className="recommemdBody">
                {/* 左侧 */}
                <div className="recommemdBodyLeft">
                    {/* 头部导航 */}
                    <div className="musicHeader">
                        <BodyChild tags={props.tags} to={'/'} name={'热门推荐'}/>
                    </div>
                    {/* 中间显示部分 */}
                    <div className="musicBody">
                        <ul>
                            {musicTypeList(musicList, MusicList)}
                        </ul>
                    </div>
                    {/* 新碟上架板块 */}
                    <div className="newCd">
                        <div className="newCdHeader musicHeader">
                            <BodyChild tags={[]} to={'/'} name={'新碟上架'}/>
                        </div>
                        <div className="newCdBody">
                            <span className="iconfont icon-youjiantou" onClick={slideNewCd(false)}/>
                            <div className="viewBox">
                                <div className="leaderBorderDataBox" style={{ marginLeft: newCdMargin + 'px', transition: `margin ${newCdTransition}s`}}>
                                    <ul>
                                        {musicTypeList(leaderBorderData.slice(5, 10), NewCdList)}
                                    </ul>
                                    <ul>
                                        {musicTypeList(leaderBorderData.slice(0, 5), NewCdList)}
                                    </ul>
                                    <ul>
                                        {musicTypeList(leaderBorderData.slice(5, 10), NewCdList)}
                                    </ul>
                                    <ul>
                                        {musicTypeList(leaderBorderData.slice(0, 5), NewCdList)}
                                    </ul>
                                </div>
                            </div>
                            <span className="iconfont icon-youjiantou" onClick={slideNewCd(true)}/>
                        </div>
                    </div>
                    {/* 榜单 */}
                    <div className="leaderBoardList">
                        <div className="leaderBoardHeader musicHeader">
                            <BodyChild tags={[]} to={'/'} name={'榜单'} />
                        </div>
                        <div className="leaderBoardBody musicBody">
                           
                            <ul>
                                {musicTypeList(musicList, MusicList)}
                            </ul>
                           
                        </div>
                    </div>
                </div>
                <div className="recommemBodyRight">
                    22
                </div>
            </div>
        </div>
    );
}
export default RecommendBody;
