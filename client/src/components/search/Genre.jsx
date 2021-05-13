import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const Genre = () => {
    const { genre } = useParams();
    const { book } = useSelector(state => state)
    const getBooksByGenre = () => book?.allbooks?.filter(item => item.genres.includes(genre) === true)
    console.log(getBooksByGenre())
    return (
        <div>

        </div>
    )
}
export default Genre;