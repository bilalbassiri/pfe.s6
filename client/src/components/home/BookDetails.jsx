import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import SimpleTabs from './Tabs';
import { Rating, CircularProgress, CustomizedButton } from '..';
import { updateCart, getBookDetailFromDB } from '../../helpers/requests';
import { setCurrentBook } from '../../redux/actions/bookActions';
import { useDispatch, useSelector } from 'react-redux';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import { cartAddRemoveItem } from '../../redux/actions/userActions';

const styles = {
    add: {
        margin: `10px 0px`,
        backgroundColor: '#EF7C8E',
        padding: '8px',
        borderRadius: 20,
        width: '100%',
        '&:hover': {
            backgroundColor: '#DA7080',
        },
    }
}
const BookDetails = () => {
    const { bookId } = useParams();
    const {
        book: { currentBook: book },
        user: { credentials, accessToken } } = useSelector(state => state);
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    let alreadyAddedToCart = credentials?.card?.map(item => item._id)?.includes(bookId);
    const handleAddAndRemove = () => {
        if (accessToken) {
            setDisabled(true)
            let books = credentials?.card.map(book => book._id);
            if (alreadyAddedToCart) {
                books = books.filter(id => id !== bookId);
            }
            else {
                books = [...books, bookId];
            }
            updateCart(books, accessToken).then(newCart => {
                dispatch(cartAddRemoveItem(newCart))
                setDisabled(false)
                console.log(newCart)
            })
        }
        else return
    }
    useEffect(() => {
        (async () => {
            const res = await getBookDetailFromDB(bookId);
            dispatch(setCurrentBook(res));
            setIsLoading(false)
        })()
    }, [bookId])
    return (
        !isLoading ?
            <div className="book-details">
                <section className="main-section">
                    <div className="left">
                        <img src={book.cover} alt={book.name} className="cover" />
                        <div className="add-to-cart">
                            <CustomizedButton
                                type="button"
                                style={styles.add}
                                disableElevation
                                disabled={disabled}
                                onClick={handleAddAndRemove}>
                                {
                                    alreadyAddedToCart ?
                                        <>
                                            <RemoveShoppingCartOutlinedIcon /><span>Remove from card</span>
                                        </>
                                        :
                                        <>
                                            <AddShoppingCartIcon /><span>Add to card</span>
                                        </>
                                }
                            </CustomizedButton>
                        </div>
                    </div>
                    <div className="right">
                        <h1>{book.name}</h1>
                        <h3 className="author">by {book.author}</h3>
                        <div className="other">
                            <h3 className="price">
                                ${book.price ?? '00.00'}
                            </h3>
                            <Rating porpose="global_read" count={book.rating_count} rating={book.rating} />
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