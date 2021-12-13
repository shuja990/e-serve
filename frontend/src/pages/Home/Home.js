import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ProductsContent from '../../components/shop/ProductsContent';

const Home = () => {
    return (
        <React.Fragment>
        <Navbar />
        <div className="page-title-area item-bg2">
            <div className="container">
                <h1>Home</h1>
                <ul>
                    <li>
                        <Link to="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>Shop</li>
                </ul>
            </div>
        </div>
        <ProductsContent />
        <Footer />
    </React.Fragment>
    )
}

export default Home
