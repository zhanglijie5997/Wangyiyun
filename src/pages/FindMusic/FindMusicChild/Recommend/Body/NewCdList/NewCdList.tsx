import * as React from 'react';
import { Link } from 'react-router-dom';
import "./NewCdLIst.scss"
const NewCdList = (props: any) => {
    // console.log(props,'..');
    const { name, artist} = props.item;
    return (
        <div className="newCdList">
            <img src={artist.picUrl} alt="" className="img"/>
            <Link to="/" className="nameLink" />
            
            <Link to="/" className="introduction">{name}</Link>
            <Link to="/" className="description">{artist.name}</Link>
        </div>
    );
}

export default NewCdList;
