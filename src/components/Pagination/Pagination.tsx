import React, { useEffect, useState, useCallback, useMemo, useRef, RefObject } from "react";
import "./Pagination.scss";
/**
 * 分页组件
 * @param props {page} 分页
 */
const  Paginations = (props: {page: number}) => {
    const [getDefaultPage, setDefaultPage] = useState<number>(5); // 选择分页
    const [getShowOnPage, setShowOnpage] = useState<boolean>(false); // 上一页显示...
    const [getNextPage, steNextpage] = useState<boolean>(true); // 下一页显示...
    const [getTargetPage, setTargetPage] = useState<number>(-1);
    useEffect(() => {
        // 大于8显示左侧省略号
        if(getDefaultPage > 5) {
            setShowOnpage(true)
        } else {
            setShowOnpage(false)
        }
        if (props.page > 0 && getDefaultPage >= props.page - 4) {
             
            steNextpage(false);
        }else {
            steNextpage(true);
        }
       
        
        console.log(getTargetPage, props.page - 3, getDefaultPage, 'pppp')
        // console.log(getTargetPage, 'getTargetPage')
        if(getTargetPage === 5) {
            setTargetPage(-1)
        }
        
    }, [props.page, getDefaultPage, getTargetPage])

    // 获取子组件内容做加减
    const paginationBtn: RefObject<HTMLDivElement> = useRef(null);

    // 选择分页
    useEffect(() => {
        const paginationBtnRef: HTMLDivElement  = paginationBtn.current!;
        paginationBtnRef.addEventListener("click", addEventListrenFn);
        return  () => paginationBtnRef.removeEventListener('click', addEventListrenFn);
    }, [paginationBtn, getDefaultPage, props.page]);
    // 监听函数
    const addEventListrenFn = useCallback((event: Event) => {
        const targetInput = event.target as HTMLInputElement;
        if ((+targetInput.value <= props.page - 4) && (+targetInput.value >= 5)) {
            setTargetPage(-1);
            setDefaultPage(+targetInput.value);
        } else if ((+targetInput.value < 5)) {
            // 前面的临界点
            setTargetPage(+targetInput.value);
            setDefaultPage(5);
            
            
        } else if (+targetInput.value < props.page - 3) {
             
            // 后面的临界点
            setDefaultPage(props.page);
            setTargetPage(+targetInput.value);
        } else if (+targetInput.value >= props.page - 3) {
            setTargetPage(+targetInput.value);
            setDefaultPage(props.page - 4);
           
        }
        
        //  
    }, [props.page, getDefaultPage, getTargetPage]) 
    
    /**
     * 上一页,下一页分页函数
     * @param index -1 上一页, 1下一页
     */
    const onPageFn =  useCallback((index: number) =>{
        // console.log(getTargetPage,'////')
        switch (getTargetPage) {
            case 1:
                if(index === 1) {
                    setTargetPage(2);
                }
                break;
            case 2:
            case 3:
            case 4:
            
            case props.page - 2:
            case props.page - 1:
                setTargetPage(getTargetPage+index)
                break;
            case props.page - 3:
                if(index === 1) {
                    setTargetPage(getTargetPage+index);
                }else if(index === -1){
                    setTargetPage(-1)
                }
                break;
            case 5:
                setTargetPage(-1);
                break;
            case props.page:
                if(index === -1) {
                    setTargetPage(getTargetPage + index)
                }
                break;
            default:
                console.log(`${getDefaultPage}--()${getTargetPage}--()${index}`)
                if(getDefaultPage === 5 && index === -1) {
                    setTargetPage(4);
                } else if (getDefaultPage >= 5 && getDefaultPage + 1 < props.page - 3 ) {
                    setDefaultPage(getDefaultPage + index)
                }else if(getDefaultPage === props.page - 4 && index === 1) {
                    console.log(`ggggg`);
                    setTargetPage(props.page - 3);
                }else if(getDefaultPage === props.page - 4 && index === -1) {
                    console.log(-1)
                    setTargetPage(-1);
                    setDefaultPage(getDefaultPage + index)
                }
                break;
        }
         /* if(getTargetPage !== 1) {
            if(getTargetPage === -1 && index === -1 && getDefaultPage === 5) {
                setTargetPage(getDefaultPage + index);
            } else if (getTargetPage > 1 && getTargetPage < 5) {
                setTargetPage(getTargetPage + index);
            }else if(getTargetPage === 1 && index === 1 ) {
                setTargetPage(getTargetPage + index);
            } else if (getDefaultPage >= 5 && getDefaultPage < props.page - 4 ) {
                setTargetPage(-1);
                if (getTargetPage === -1) {
                    
                    setDefaultPage(getDefaultPage + index)
                }
            }else if(getTargetPage === -1 && index === 1 && getDefaultPage === props.page -3) {
                
                setTargetPage(props.page - 3)
            }else if(getTargetPage >= props.page - 3 && getTargetPage < props.page) {
                console.log(getTargetPage,'....')
                setTargetPage(getTargetPage + index)
            } else if(getTargetPage === props.page && index === -1) {
                setTargetPage(getTargetPage + index)
            }else if(getDefaultPage + 1 === props.page - 3 && getTargetPage === -1) {
                console.log(`4`)
                setTargetPage(props.page - 3)
            }else if(getTargetPage >= props.page - 4 && getTargetPage < props.page) {
                setTargetPage(getTargetPage + index)
            }
         } */
    }, [getDefaultPage, props.page, getTargetPage])

    // 点击第一页和最后一页
    const clickFirstOrEnd = useCallback((index: number) => {
        setTargetPage(index);
        switch (index) {
            case 1:
                setDefaultPage(5);
                
                break;
            case props.page:
                setDefaultPage(props.page - 4)
            default:
                break;
        }
    }, [props.page])

    // useCallback根据依赖进行更新的,这里要实时更新
    useMemo(() => onPageFn,[getDefaultPage])

    // 上一页组件
    const onPage:JSX.Element = (<div className="onPage" onClick={() => onPageFn(-1)}>上一页</div>)
    // 下一页组件
    const nextPage:JSX.Element = (<div className="onPage" onClick={() => onPageFn(1)}>下一页</div>)
    
    return (
        <div className="pagination">
            <div className="pageWidgetBox">
                {onPage}
                {/* { pageWidget() } */}
                <input type="text" className={["paginationBox", getTargetPage === 1 ? "active" : " "].join(' ')} value="1" readOnly={true} onClick={() => clickFirstOrEnd(1)}/>
                <div className="numBox" ref={paginationBtn} >
                    <span className="onHide" style={{ display: getShowOnPage ? "inline-block" : "none"  }}>...</span>
                    <input type="text" className={["paginationBox", getTargetPage === 2 ? "active": " " ].join(' ')}  value={`${getDefaultPage - 3}`} readOnly={true}/>
                    <input type="text" className={["paginationBox", getTargetPage === 3 ? "active" : " "].join(' ')}  value={`${getDefaultPage - 2}`} readOnly={true}/>
                    <input type="text" className={["paginationBox", getTargetPage === 4 ? "active" : " "].join(' ')}  value={`${getDefaultPage - 1}`} readOnly={true}/>
                    <input type="text" className={["paginationBox", getTargetPage > -1 ? "" : "active"].join(' ')}  value={`${getDefaultPage}`} readOnly={true} />
                    <input type="text" className={["paginationBox", getTargetPage === props.page - 3 ? "active" : ""].join(' ')}  value={`${getDefaultPage + 1}`} readOnly={true}/>
                    <input type="text" className={["paginationBox", getTargetPage === props.page - 2 ? "active" : ""].join(' ')}  value={`${getDefaultPage + 2}`} readOnly={true}/>
                    <input type="text" className={["paginationBox", getTargetPage === props.page - 1 ? "active" : ""].join(' ')}  value={`${getDefaultPage + 3}`} readOnly={true}/>
                    <span className="nextHide" style={{ display: getNextPage ? "inline-block": "none"  }}>...</span>
                </div>
                <input type="text" className={["paginationBox", getTargetPage === props.page ? "active" : " "].join(' ')} value={`${props.page}`} readOnly={true} onClick={() => clickFirstOrEnd(props.page)}/>
                {nextPage}
            </div>
            
        </div>
    )
}

export default Paginations;