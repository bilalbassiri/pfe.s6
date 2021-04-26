import React, { useEffect } from 'react'
import { Header } from '..';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCategories } from '../../redux/actions/categoryActions';

const MainPage = () => {
    const dispatch = useDispatch();
    const apiGetCategories = async () => {
        try {
            const res = await axios.get('/api/category')
            dispatch(setCategories(res.data))
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        apiGetCategories()
    }, [])
    return (
        <div>
            <Header />
        </div>
    )
}
export default MainPage