import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import SimpleTabs from './Tabs';
import { Rating, CircularProgress} from '..';
import { getBookDetailFromDB } from '../../helpers/requests';

const BookDetails = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null)
    useEffect(() => {
        getBookDetailFromDB(bookId).then(book => setBook(book))
    }, [bookId])
    return (
        book ?
            <div className="book-details">
                <section className="main-section">
                    <div className="left">
                        <img src={book.cover} alt={book.name} className="cover" />
                        <div className="reading">

                        </div>
                    </div>
                    <div className="right">
                        <h1>{book.name}</h1>
                        <h3 className="author">by {book.author}</h3>
                        <div className="other">
                            <h3 className="price">
                                <span>
                                    ${book.price ?? '00.00'}
                                </span>
                                {
                                    book.old_price
                                    &&
                                    <del>
                                        ${book.old_price}
                                    </del>
                                }

                            </h3>
                            <Rating porpose="global_read" count={book.rating_count} />
                        </div>
                        <div className="tabs">
                            <SimpleTabs book={book} />
                        </div>
                    </div>
                </section>
            </div>
            :
            <CircularProgress />
    )
}
export default BookDetails;