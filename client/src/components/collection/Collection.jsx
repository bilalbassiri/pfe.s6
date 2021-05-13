import React from 'react'
import BookCard from './BookCard';
const Collection = ({ title, books }) => {
    return (
        <section className="books">
            <h1 className="books-title">
                {title}
            </h1>
            <div className="books-container">
                {
                    books?.map(item => <BookCard item={item} key={item._id} />)
                }
            </div>
        </section>
    )
}
export default Collection;