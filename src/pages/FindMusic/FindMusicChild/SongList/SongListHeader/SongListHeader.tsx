import * as React from 'react';
import './SongListHeader.scss'
import { Link } from 'react-router-dom';
import { PlaylistCatlist } from '../../../../../utils/Http/SongList/SongList';
import { GetListCategory, SubObject, SubType} from './SongListType/SongListType';
const SongListHeader = () => {
    const [getShowList,setShowList] = React.useState<boolean>(false);
    const [getListCategory, setListCategory] = React.useState<GetListCategory>({}); // 语种
    const [getSub, setSub] = React.useState<SubType[]>([]);
    
    React.useEffect(()=>{
        getPlaylistCatlist();
    },[])

    // 请求分类接口
    const getPlaylistCatlist = async () => {
        const data: {sub: [], categories: GetListCategory} = await PlaylistCatlist();
        setListCategory(data.categories);
        setSub(data.sub)
        console.log(getSub, '[[[')
    }

    // 选择分类下啦列表
    const showChoicList = React.useCallback(() => { 
        setShowList(!getShowList)
    }, [getShowList]);
    // const listCategory:JSX.Element[] =

    // 列表
    const listType: JSX.Element = (
        <div className="listType">
            <div className="triangle" />
            <div className="triangleHeader">
                <h3>
                    <Link to="/" className="allStyle">全部风格</Link>
                </h3>
            </div>
            <div className="triangleBody">
                <ul className="listCateGoryUl">
                {
                    Object.values(getListCategory).map((item: string, index: number) => {
                        return <li key={index} className="listCateGory">
                                    <span>{item}</span> 
                                    <ul className="getSub">
                                        {getSub.map((data: SubType, i: number) => {
                                            return data.category === index ? <li key={i}>{ data.name }</li> : null;
                                        })}
                                    </ul>
                                </li>
                    })
                }
                </ul>
            </div>
            <div className="triangleFoot" />
        </div>
    )

    

    const SongListHeaderPageLeft: JSX.Element = (<div className="SongListHeaderPageLeft">
        <h3>
            <span className="allType"> 
                全部
            </span>
            <span className="choicType" onClick={showChoicList}>
               <em> 选择分类</em>
               <em className=" iconfont icon-xiangxia" />
            </span>
        </h3>
    </div>)
    const SongListHeaderPageRight: JSX.Element = (<div className="SongListHeaderPageRight">
        热门
    </div>)
    
    return (
        <div className="SongListHeaderPage">
            {SongListHeaderPageLeft}
            {SongListHeaderPageRight}
            {getShowList ? listType : null}
        </div>
    );
}

export default SongListHeader;
