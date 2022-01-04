import React from 'react'
import BookCard from './BookCard';
import { CircularProgress, Scroller } from '..';

const Collection = ({ title, books }) => {
    return (
        <section className="books">
            <div className="genre-head">
                <h1 className="books-title">
                    {title}
                </h1>
                <div className="bar">

                </div>
                <Scroller title={title} />
            </div>
            <div className="books-container" id={"bc" + title}>
                {
                books?.length ?

                    books.map(item => <BookCard item={item} key={item._id} />)
                    :
                    <CircularProgress plan={{ h: '200px', w: '100%' }} />

                }
            </div>
        </section>
    )
}
export default Collection;