import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { getCategory } from '../../helpers/axios.helpers';

const Category = ({ genre, index }) => {
    const [category, setCategory] = useState(null);

    useEffect(() => {
        getCategory(genre).then(setCategory)
    }, [])
    return (
        <section className="books">
            <h1 className="books-title">
                In {genre}
            </h1>
            <div className="books-container">
                {category ?
                    category.map((book, index) => <BookCard item={book} key={index} />)
                    :
                    null
                }
            </div>
        </section>
    )
}
export default Category;