import * as React from 'react';
import "./RecommendHeader.scss";
import { useSelector, useDispatch, useStore } from 'react-redux';
import actionsStore from 'src/redux/actions/actions';
import ThemeColor from '../../pages/FindMusic/FindMusicChild/Recommend/Provider/Provider';

function RecommendHeader(props: any, ref: any): any {
    const [states, setStates] = React.useState<number>(0);
    React.useEffect(() => {
        const time = setInterval(() => {
            setStates(states + 1);
            // document.title = `更新${states}次`
        }, 1000)
        return () => clearInterval(time)
    }, [states])
    // 同步设置设置title值
    const memo = React.useMemo(() => document.title = `更新${states}次`, [states]);
    console.log(memo)
    // 获取redux state user数据
    const user = useSelector((state: any) => state.token)
    // dispatch分发数据
    const dispatchUser = useDispatch();
    const changeMapStateToProps = (name: string) => React.useCallback(() => dispatchUser(actionsStore.setToken(name)), [dispatchUser]);
    const store = useStore();
    // 创建一个ref,useimperatibeHandle 与forwardRef配套使用
    const createRef: any = React.useRef(null);
    React.useImperativeHandle(ref, () => ({
        focus: () => createRef.current.focus(), // 聚焦
    }))
    console.log(props, 'props')
    const value = React.useContext(ThemeColor);

    return (
        <div className="recommendHeader" style={{ color: value }}>
            {value}
            {user}
            {states}
            {store.getState().loginType}
            <button onClick={changeMapStateToProps('zz')}>click</button>
            <input type="text" name="" id="" ref={createRef} />
        </div>
    )
}

const RecommendHeaderFinal = React.forwardRef(RecommendHeader)

export default RecommendHeaderFinal;
