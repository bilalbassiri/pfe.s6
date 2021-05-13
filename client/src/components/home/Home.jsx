import React from 'react'
import { Header } from '..';
import { useSelector } from 'react-redux';
import Collection from '../collection/Collection';

const Home = () => {
    const { books: { all, popular, most_rated, categories } } = useSelector(state => state);

    return (
        <div className="home">
            <Header />
            <div className="main-page">

            </div>
            <div className="home-body">
                <Collection title="Added Recently" books={all} />
                <Collection title="Popular" books={popular} />
                <Collection title="Most Rated" books={most_rated} />
                {
                    categories.map(category => <Collection key={category.genre} title={'In ' + category.genre} books={category.books} />)
                }
            </div>
        </div>
    )
}
export default Home