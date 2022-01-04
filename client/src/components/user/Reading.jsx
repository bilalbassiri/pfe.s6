import React from 'react';
import { useHistory } from 'react-router-dom';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import StarRoundedIcon from '@material-ui/icons/StarRounded';

const Reading = ({ books }) => {
    const history = useHistory();
    return (
        <AccordionDetails className="books-cont">
            {
                books?.length ?
                    books.map(book => (
                        <div className="piece" key={book._id} onClick={() => history.push(`/book/${book._id}`)}>
                            <h3 className="name">
                                {book.name}
                            </h3>
                            <div className="price">
                                $ {book.price.toFixed(2)}
                            </div>
                            <div className="rating">
                                <StarRoundedIcon className="icon" />
                                <div>{book.rating.toFixed(1)}</div>
                            </div>
                        </div>
                    ))
                    :
                    <p className="no-books">
                        No books to show here
                </p>
            }
        </AccordionDetails>
    )
}
export default Reading;