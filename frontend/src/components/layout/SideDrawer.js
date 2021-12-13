import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class SideDrawer extends Component {

    state = {
        drawer: false
    };

    closeDrawer = () => {
        this.props.onClick(this.state.drawer);
    }

    render() {
        return (
            <div className="sidebar-modal">  
                <div 
                    className={`modal right fade ${this.props.show}`}
                    style={this.props.show ? {
                        display: "block", paddingRight: "16px"
                    } : { display: "none" }}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button 
                                    type="button" 
                                    className="close" 
                                    data-dismiss="modal" 
                                    aria-label="Close"
                                    onClick={this.closeDrawer}
                                >
                                    <span aria-hidden="true">
                                        <i className="icofont-close"></i>
                                    </span>
                                </button>

                                <h2 onClick={this.closeDrawer} className="modal-title" style={{opacity:"1",background:"white"}} id="myModalLabel2"><a href="/">
                                    <img src={require("../../images/logo.png")} alt="logo" /></a>
                                </h2>
                            </div>

                            <div className="modal-body">
                                <div className="sidebar-modal-widget">
                                    <h3 className="title">Additional Links</h3>

                                    <ul>
                                        <li>
                                            <Link to="/login">
                                                <a>Login</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/signup">
                                                <a>Register</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/faq">
                                                <a>FAQ</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/logout">
                                                <a>Logout</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="sidebar-modal-widget">
                                    <h3 className="title">Contact Info</h3>

                                    <ul className="contact-info">
                                        <li>
                                            <i className="icofont-google-map"></i>
                                            Address
                                            <span>3510 Church Ave, Brooklyn, NY 11203</span>
                                        </li>
                                        <li>
                                            <i className="icofont-email"></i>
                                            Email
                                            <span><a href="#">info@linkcaranow</a></span>
                                        </li>
                                        <li>
                                            <i className="icofont-phone"></i>
                                            Phone
                                            <span><a href="#">(212) 641-0482</a></span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="sidebar-modal-widget">
                                    <h3 className="title">Connect With Us</h3>

                                    <ul className="social-list">
                                    <li><a href="https://www.instagram.com/linkcaranow/"><i className="icofont-instagram"></i></a></li>
                                    <li><a href="https://www.facebook.com/linkcaranow"><i className="icofont-facebook"></i></a></li>
                                    <li><a href="https://twitter.com/linkcaranow"><i className="icofont-twitter"></i></a></li>
                                    <li><a href="https://www.linkedin.com/company/linkcaranow/"><i className="icofont-linkedin"></i></a></li>
                                    </ul>
                                </div>

                                <div className="sidebar-modal-widget">
                                    <h3 className="title">Search</h3>

                                    <form className="modal-search-form">
                                        <input type="text" className="form-control" placeholder="Serch here.." />
                                        <button type="submit"><i className="icofont-search-2"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SideDrawer;
