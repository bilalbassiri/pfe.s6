import React, { useEffect } from 'react'
import { Header } from '..';
import { useDispatch } from 'react-redux';
import { setBooks } from '../../redux/actions/bookActions';
import {getBooksFromDB} from '../../helpers/requests';
import Books from './Books';

const MainPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        getBooksFromDB().then(books => dispatch(setBooks(books)))
    }, [dispatch])
    return (
        <div>
            <Header />
            <Books />
        </div>
    )
}
export default MainPage