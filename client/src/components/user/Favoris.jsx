import React from 'react'
import { useSelector } from 'react-redux';
import { FavorisItem } from '..';
const Favoris = () => {
    const { favoris } = useSelector(state => state.user)
    return (
        <div className="favoris">
            {
                favoris.map(item => <FavorisItem key={item._d} item={item} />)
            }
        </div>
    )
}
export default Favoris;