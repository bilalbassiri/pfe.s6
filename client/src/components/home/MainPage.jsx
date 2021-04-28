import React, { useEffect } from 'react'
import { Header } from '..';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBooks } from '../../redux/actions/bookActions';
import Books from './Books';

const MainPage = () => {
    const dispatch = useDispatch();
    const apiGetBooks = async () => {
        try {
            const res = await axios.get('/api/book')
            dispatch(setBooks(res.data))
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        apiGetBooks()
    }, [])
    return (
        <div>
            <Header />
            <h1>
                Books for you 
            </h1>
            <Books />
        </div>
    )
}
export default MainPage