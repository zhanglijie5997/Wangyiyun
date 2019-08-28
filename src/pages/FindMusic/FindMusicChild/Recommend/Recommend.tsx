import * as React from 'react'
import RecommendHeader from './Header/RecommendHeader';
import "./Recommend.scss";
import IndexHttp from '../../../../utils/Http/HttpList/IndexHttp';
export default class Recommend extends React.Component {
    public state:any;
    constructor(props:any) {
        super(props);
        this.state = {}
    }
    public async componentDidMount():Promise<void> {
       const data = await IndexHttp.banner();
       console.log(data)
    }

    public render() {
        return (
            <div>
                <RecommendHeader />
            </div>
        )
    }
}
