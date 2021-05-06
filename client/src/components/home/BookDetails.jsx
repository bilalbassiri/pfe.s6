import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

// Components
import SimpleTabs from './Tabs';
import { Rating, CircularProgress, CustomizedButton } from '..';

//Material UI Icons
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';

// ...
import { setCurrentBook } from '../../redux/actions/bookActions';
import { cartAddRemoveItem, favorisAddRemoveItem } from '../../redux/actions/userActions';
import { updateCart, updateFavoris, getBookDetailFromDB } from '../../helpers/requests';

const styles = {
    cart: {
        backgroundColor: '#EF7C8E',
        padding: '8.5px 16px',
        borderRadius: 20,
        width: '100%',
        '&:hover': {
            backgroundColor: '#DA7080',
        },
    },
    favoris: {
        display: 'grid',
        placeContent: 'center',
    },
    icons: {
        fontSize: '1.4rem',
    }
}
const BookDetails = () => {
    const { bookId } = useParams();
    const {
        book: { currentBook: book },
        user: { cart, favoris, accessToken }
    } = useSelector(state => state);
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState({
        cart: false,
        favoris: false
    });
    const [isLoading, setIsLoading] = useState(true)
    const alreadyExist = prop => {
        if (prop === 'cart') return cart?.map(item => item._id)?.includes(bookId)
        if (prop === 'favoris') return favoris?.map(item => item._id)?.includes(bookId)
    }
    const currentBag = prop => prop === 'cart' ? cart?.map(book => book._id) : favoris?.map(book => book._id);
    const booksBag = (prop, books) => alreadyExist(prop) ? books.filter(id => id !== bookId) : [...books, bookId];

    const handleAddAndRemove = prop => {

        if (accessToken) {
            setDisabled({
                ...disabled,
                [prop]: true
            })
            if (prop === 'cart') {
                updateCart(booksBag(prop, currentBag(prop)), accessToken).then(newCart => {
                    dispatch(cartAddRemoveItem(newCart))
                    setDisabled({
                        ...disabled,
                        [prop]: false
                    })
                })
            }
            else if ('favoris') {
                updateFavoris(booksBag(prop, currentBag(prop)), accessToken).then(newFavoris => {
                    dispatch(favorisAddRemoveItem(newFavoris))
                    setDisabled({
                        ...disabled,
                        [prop]: false
                    })
                })
            }
            else return
        }
        else return
    }

    useEffect(() => {
        (async () => {
            const res = await getBookDetailFromDB(bookId);
            dispatch(setCurrentBook(res));
            setIsLoading(false)
        })()
    }, [dispatch, bookId])
    return (
        !isLoading ?
            <div className="book-details">
                <section className="main-section">

                    <div className="left">
                        <div className="cover-container">
                            <img src={book.cover} alt={book.name} className="cover" />
                        </div>
                        <div className="add-to-cart-or-favoris">
                            <CustomizedButton
                                type="button"
                                style={styles.cart}
                                disableElevation
                                disabled={disabled.cart}
                                onClick={() => handleAddAndRemove('cart')}>
                                {
                                    alreadyExist('cart') ?
                                        <>
                                            <RemoveShoppingCartOutlinedIcon style={styles.icons} /><span>Remove from cart</span>
                                        </>
                                        :
                                        <>
                                            <AddShoppingCartIcon style={styles.icons} /><span>Add to cart</span>
                                        </>
                                }
                            </CustomizedButton>
                            <button
                                className="like-button"
                                type="button"
                                style={styles.favoris}
                                disabled={disabled.favoris}
                                onClick={() => handleAddAndRemove('favoris')}>
                                {
                                    alreadyExist('favoris') ?
                                        <>
                                            <FavoriteRoundedIcon style={styles.icons} className="heart" />
                                        </>
                                        :
                                        <>
                                            <FavoriteBorderRoundedIcon style={styles.icons} />
                                        </>
                                }
                            </button>
                        </div>
                    </div>
                    <div className="right">
                        <h1>{book.name}</h1>
                        <h3 className="author">by {book.author}</h3>
                        <div className="other">
                            <h3 className="price">
                                {book.price.toFixed(2) ?? '00.00'}
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