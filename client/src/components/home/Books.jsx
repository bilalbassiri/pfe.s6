import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import BookCard from './BookCard';
const Books = () => {
    const { book, user } = useSelector(state => state);
    return (
        <section className="books-container">
            {
                book?.allbooks?.map(book => <BookCard book={book} key={book._id}/>)
            }
        </section>
    )
}
export default Books;