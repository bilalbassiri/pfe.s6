import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BookCard } from '..';


const Genre = () => {
    const { genre } = useParams();
    const { books } = useSelector(state => state);
    const getBooksByGenre = () => books?.all?.filter(item => item.genres.includes(genre) === true);
    return (
        <div>
            <h1>
                In {genre}
            </h1>
            <div className="result" style={{display: 'flex', gap: 20}}>
        {
            getBooksByGenre()?.map(book => <BookCard item={book} key={book._id}/>)
        }
            </div>
        </div>
    )
}
export default Genre;