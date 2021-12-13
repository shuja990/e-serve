import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class ProductsContent extends Component {



    render() {

        let  products  = [
            {
                id: 1,
                title: "Pencil",
                price: 99,
                image: require("../../images/shop-image/1.jpg")
            },
            {
                id: 2,
                title: "T-Shirt",
                price: 120,
                image: require("../../images/shop-image/2.jpg")
            },
            {
                id: 3,
                title: "Casual Shoe",
                price: 160,
                image: require("../../images/shop-image/3.jpg")
            },
            {
                id: 4,
                title: "Drop Side Watch",
                price: 130,
                image: require("../../images/shop-image/4.jpg")
            },
            {
                id: 5,
                title: "Chair",
                price: 90,
                image: require("../../images/shop-image/5.jpg")
            },
            {
                id: 6,
                title: "Card",
                price: 180,
                image: require("../../images/shop-image/6.jpg")
            },
            {
                id: 7,
                title: "Book Cover",
                price: 330,
                image: require("../../images/shop-image/7.jpg")
            },
            {
                id: 8,
                title: "Wall Watch",
                price: 140,
                image: require("../../images/shop-image/8.jpg")
            },
            {
                id: 9,
                title: "Drop Side Watch",
                price: 430,
                image: require("../../images/shop-image/9.jpg")
            },
            {
                id: 10,
                title: "Camera Stand",
                price: 650,
                image: require("../../images/shop-image/9.jpg")
            },
            {
                id: 11,
                title: "Drop Side Watch",
                price: 230,
                image: require("../../images/shop-image/5.jpg")
            },
            {
                id: 12,
                title: "Drop Side Watch",
                price: 670,
                image: require("../../images/shop-image/7.jpg")
            }
        ]
        return (
            <section className="product-area ptb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="woocommerce-topbar">
                                <div className="row h-100 align-items-center">
                                    <div className="col-lg-9 col-md-7">
                                        <div className="woocommerce-result-count">
                                            <p>Showing 1–9 of 11 results</p>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-5">
                                        <div className="woocommerce-topbar-ordering">
                                            <form>
                                                <div className="select-box">
                                                    <select className="form-control">
                                                        <option value="1">Sort by Popularity</option>
                                                        <option value="2">Sort by Average Rating</option>
                                                        <option value="0">Sort by Latest</option>
                                                        <option value="3">Sort by price: Low to High</option>
                                                        <option value="4">Sort by price: High to Low</option>
                                                        <option value="5">Sort by New</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {products.map((data, idx) => (
                            <div className="col-lg-4 col-md-6 col-sm-6" key={idx}>
                                <div className="single-product">
                                    <div className="product-image">
                                        <Link to="/shop/product-details">
                                            <a>
                                                <img src={data.image} alt="image" />
                                            </a>
                                        </Link>
                                    </div>

                                    <div className="product-content">
                                        <h3>
                                            <Link to="/shop/product-details">
                                                <a>{data.title}</a>
                                            </Link>
                                        </h3>

                                        <ul className="rating">
                                            <li><i className="icofont-star"></i></li>
                                            <li><i className="icofont-star"></i></li>
                                            <li><i className="icofont-star"></i></li>
                                            <li><i className="icofont-star"></i></li>
                                            <li><i className="icofont-star"></i></li>
                                        </ul>

                                        <span className="price">${data.price}</span>
{/* 
                                        <Link to="#">
                                            <a 
                                                className="btn btn-primary"
                                                onClick={(e) => {
                                                    e.preventDefault(); this.handleAddToCart(data.id)
                                                }}
                                            >
                                                Add to Cart
                                            </a>
                                        </Link> */}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="col-lg-12 col-md-12">
                            <div className="pagination-area">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item"><a className="page-link" to="#"><i className="icofont-double-left"></i></a></li>
                                        <li className="page-item active"><a className="page-link" to="#">1</a></li>
                                        <li className="page-item"><a className="page-link" to="#">2</a></li>
                                        <li className="page-item"><a className="page-link" to="#">3</a></li>
                                        <li className="page-item"><a className="page-link" to="#"><i className="icofont-double-right"></i></a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}



export default ProductsContent
