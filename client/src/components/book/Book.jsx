import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// Components
import SimpleTabs from "./Tabs";
import ReadingList from './ReadingList';
import { Rating, CircularProgress, CustomizedButton } from "..";
//Material UI Icons
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartOutlinedIcon from "@material-ui/icons/RemoveShoppingCartOutlined";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
// Redux actions
import { setCurrentBook } from "../../redux/actions/bookActions";
import {
  cartAddRemoveItem,
  favorisAddRemoveItem,
} from "../../redux/actions/userActions";
// Helper functions
import {
  updateCart,
  updateFavoris,
  getBookDetailFromDB,
} from "../../helpers/axios.helpers";
import { Description } from "./Description";

const styles = {
  cart: {
    backgroundColor: "#4ecdc4",
    padding: "8.5px 16px",
    borderRadius: 20,
    width: "100%",
    "&:hover": {
      backgroundColor: "#41aaa3",
    },
  },
  favoris: {
    display: "grid",
    placeContent: "center",
  },
  icons: {
    fontSize: "1.4rem",
  },
};
const Book = () => {
  const { bookId } = useParams();
  const {
    books: { currentBook: book },
    user: { cart, favoris, accessToken },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState({
    cart: false,
    favoris: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const alreadyExist = (prop) => {
    if (prop === "cart") return cart?.map((item) => item._id)?.includes(bookId);
    if (prop === "favoris")
      return favoris?.map((item) => item._id)?.includes(bookId);
  };
  const currentBag = (prop) =>
    prop === "cart"
      ? cart?.map((book) => book._id)
      : favoris?.map((book) => book._id);
  const booksBag = (prop, books) =>
    alreadyExist(prop)
      ? books.filter((id) => id !== bookId)
      : [...books, bookId];

  const handleAddAndRemove = (prop) => {
    if (accessToken) {
      setDisabled({
        ...disabled,
        [prop]: true,
      });
      if (prop === "cart") {
        updateCart(booksBag(prop, currentBag(prop)), accessToken).then(
          (newCart) => {
            dispatch(cartAddRemoveItem(newCart));
            setDisabled({
              ...disabled,
              [prop]: false,
            });
          }
        );
      } else if ("favoris") {
        updateFavoris(booksBag(prop, currentBag(prop)), accessToken).then(
          (newFavoris) => {
            dispatch(favorisAddRemoveItem(newFavoris));
            setDisabled({
              ...disabled,
              [prop]: false,
            });
          }
        );
      } else return;
    } else return;
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const res = await getBookDetailFromDB(bookId);
      dispatch(setCurrentBook(res));
      if (isMounted) setIsLoading(false);
    })();
    return () => {
      isMounted = false;
    };
  }, [dispatch, bookId]);
  return !isLoading ? (
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
              onClick={() => handleAddAndRemove("cart")}
            >
              {alreadyExist("cart") ? (
                <>
                  <RemoveShoppingCartOutlinedIcon style={styles.icons} />
                  <span className="spn">Remove from cart</span>
                </>
              ) : (
                <>
                  <AddShoppingCartIcon style={styles.icons} />
                  <span className="spn">Add to cart</span>
                </>
              )}
            </CustomizedButton>
            <button
              className="like-button"
              type="button"
              style={styles.favoris}
              disabled={disabled.favoris}
              onClick={() => handleAddAndRemove("favoris")}
            >
              {!disabled.favoris ? (
                alreadyExist("favoris") ? (
                  <>
                    <FavoriteRoundedIcon
                      style={styles.icons}
                      className="heart"
                    />
                  </>
                ) : (
                  <>
                    <FavoriteBorderRoundedIcon
                      style={styles.icons}
                      className="heart"
                    />
                  </>
                )
              ) : (
                <CircularProgress
                  plan={{ h: 15, w: 15 }}
                  size={{ width: 15, height: 15 }}
                />
              )}
            </button>
          </div>
          <ReadingList />
        </div>
        <div className="right">
          <h1>{book.name}</h1>
          <h3 className="author">by {book.author}</h3>
          <div className="other">
            <h3 className="price">{book.price.toFixed(2) ?? "00.00"}</h3>
            <Rating
              porpose="global_read"
              count={book.rating_count}
              rating={book.rating}
            />
          </div>
          <div>
            <Description book={book} />
            <SimpleTabs book={book} />
          </div>
        </div>
      </section>
    </div>
  ) : (
    <CircularProgress plan={{ h: "calc(100vh - 84px)", w: "100%" }} />
  );
};

export default Book;
