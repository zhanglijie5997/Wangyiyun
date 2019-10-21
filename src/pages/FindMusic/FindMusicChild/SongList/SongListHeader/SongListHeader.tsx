import React, { useState, useEffect, useCallback } from 'react';
import './SongListHeader.scss'
import { Link } from 'react-router-dom';
import { PlaylistCatlist, TopPlaylist } from '../../../../../utils/Http/SongList/SongList';
import { GetListCategory, SubType, Props} from './SongListType/SongListType';
import eventBus from 'src/components/EventBus/EventBus';




const SongListHeader = (props: Props) => {
    const [getShowList,setShowList] = useState<boolean>(false);
    const [getChoicState, setChoicState] = useState<string>("全部"); // 选中项目
    const [getListCategory, setListCategory] = useState<GetListCategory>({}); // 语种
    const [getSub, setSub] = useState<SubType[]>([]); // 歌单分类
    
    useEffect(()=>{
        // 进入请求分类
        getPlaylistCatlist();
    },[])

    /**
     * 选择的分类类型
     * @param name 名称
     */
    const choicName = useCallback((name: string) => {
        // const EmitValue = ;
        setChoicState(name);
        props.choicName(name);
        setShowList(false);
        eventBus.Emit("type", name)
    }, [getChoicState])

    
    // 请求分类接口
    const getPlaylistCatlist = async () => {
        const data: {sub: [], categories: GetListCategory} = await PlaylistCatlist();
        setListCategory(data.categories);
        setSub(data.sub)
        console.log(getSub, '[[[')
    }

    // 选择分类下啦列表
    const showChoicList = useCallback(() => { 
        setShowList(!getShowList)
    }, [getShowList]);
    
    // 点击热门
    const hotMusicList = useCallback(async () => {
        // props.choicName("hot")
        props.choicName("全部", "hot");

    },[])

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
                                            return data.category === index ? <li key={i} onClick={() => choicName(data.name)}>{ data.name }</li> : null;
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
                { getChoicState }
            </span>
            <span className="choicType" onClick={showChoicList}>
               <em> 选择分类</em>
               <em className=" iconfont icon-xiangxia" />
            </span>
        </h3>
    </div>)
    const SongListHeaderPageRight: JSX.Element = (<div className="SongListHeaderPageRight" onClick={hotMusicList}>
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
