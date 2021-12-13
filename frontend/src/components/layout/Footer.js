import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class Footer extends Component {
    render() {
        return (
            <footer className="footer-area ptb-120 pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <div className="logo">
                                    <a href="#">
                                        <img src={require("../../images/footer-logo.png")} alt="logo" />
                                    </a>
                                </div>
                                <p>CARA will effectively work to navigate the needs of our Caribbean hospitality business owners ensuring equality while protecting our culture.</p>

                                <ul className="social-links">
                                    <li><a href="https://www.instagram.com/linkcaranow/"><i className="icofont-instagram"></i></a></li>
                                    <li><a href="https://www.facebook.com/linkcaranow"><i className="icofont-facebook"></i></a></li>
                                    <li><a href="https://twitter.com/linkcaranow"><i className="icofont-twitter"></i></a></li>
                                    <li><a href="https://www.linkedin.com/company/linkcaranow/"><i className="icofont-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-footer-widget ml-4">
                                <h3>Quick Links</h3>

                                <ul className="list">
                                    <li><Link activeClassName="active" to="/"><a className="">Home</a></Link></li>
                                    <li><Link activeClassName="active" to="/about"><a className="">About</a></Link></li>
                                    <li><Link activeClassName="active" to="/services"><a className="">Services</a></Link></li>
                                    <li><Link activeClassName="active" to="/contact"><a className="">Contact</a></Link></li>
                                    {/* <li><Link activeClassName="active" to="/blog"><a className="">Blog</a></Link></li> */}
                                    <li><Link activeClassName="active" to="/signup"><a className="">Join</a></Link></li>
                                    <li><Link activeClassName="active" to="/login"><a className="">Log In</a></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <h3>Get in Touch</h3>

                                <p>Caribbean American Restaurant Association Inc Copyright @2021. All rights reserved.</p>

                                <ul className="footer-contact-info">
                                    <li>
                                        <i className="icofont-google-map"></i>
                                        <span>Location:</span> 
                                        3510 Church Ave, Brooklyn, NY 11203
                                    </li>

                                    <li>
                                        <i className="icofont-phone"></i>
                                        <span>Phone:</span> 
                                        <a href="#">212-641-0482</a>
                                    </li>

                                    <li>
                                        <i className="icofont-email"></i>
                                        <span>Email:</span> 
                                        <a href="#">info@linkcaranow</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="copyright-area">
                        <div className="row">
                            <div className="">
                                <p>Caribbean American Restaurant Association Inc Copyright @2021. All rights reserved.</p>
                            </div>

                            {/* <div className="col-lg-6 col-md-6 text-right">
                                <p>Design & Developed by <a href="https://envytheme.com" target="_blank">EnvyTheme</a></p>
                            </div> */}
                        </div>
                    </div>
                </div>

                <img src={require("../../images/line-bg.png")} className="line-bg" alt="line-bg" />
                <div className="shape23">
                    <img src={require("../../images/shapes/23.png")} alt="shape" />
                </div>
                <div className="shape24">
                    <img src={require("../../images/shapes/24.png")} alt="shape" />
                </div>
                <div className="shape27">
                    <img src={require("../../images/shapes/27.png")} alt="shape" />
                </div>
            </footer>
        );
    }
}

export default Footer;
