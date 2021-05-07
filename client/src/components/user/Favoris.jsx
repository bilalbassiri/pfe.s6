import React from 'react'
import { useSelector } from 'react-redux';
import { FavorisItem } from '..';
const Favoris = () => {
    const { favoris } = useSelector(state => state.user)
    return (
        <div className="favoris">
            <h1>
                Favoris
            </h1>
            <div className="container">
                {
                    favoris.map((item, index) => <FavorisItem key={item._id} item={item} index={index}/>)
                }
            </div>
        </div>
    )
}
export default Favoris;