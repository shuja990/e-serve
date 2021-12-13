import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import SearchForm from './SearchForm';
import SideDrawer from './SideDrawer';
export class Navbar extends Component {
    _isMounted = false;

    state = {
        drawer: false,
        searchForm: false,
        collapsed: true,
    };

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    handleSearchForm = () => {
        this.setState( prevState => {
            return {
                searchForm: !prevState.searchForm
            };
        });
    }

    handleDrawer = () => {
        this.setState( prevState => {
            return {
                drawer: !prevState.drawer
            };
        });
    }

    componentDidMount() {
        this._isMounted = true;
        let elementId = document.getElementById("navbar");
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                elementId.classList.add("is-sticky");
            } else {
                elementId.classList.remove("is-sticky");
            }
        });
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        // console.log(pathname);
        let { products } = this.props;
        const { collapsed } = this.state;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
        let layOutCls = '';
        layOutCls = 'p-relative';

        return (
            <header id="header">
                <div id="navbar" className={`artflex-nav ${layOutCls}`}>
                    <div className="container">
                        <nav className="navbar navbar-expand-md navbar-light">
                            <Link to="/">
                                <a className="navbar-brand">
                                    <img width="300px" src={require("../../images/logo.png")} alt="logo" />
                                </a>
                            </Link>

                            <button 
                                onClick={this.toggleNavbar} 
                                className={classTwo}
                                type="button" 
                                data-toggle="collapse" 
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                                aria-expanded="false" 
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className={classOne} id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item"><a to="#" className="nav-link"><Link activeClassName="active" to="/">
                                                    <a className="nav-link">Home</a>
                                                </Link></a>
                                    </li>
                                    <li className="nav-item">
                                                    <Link activeClassName="active" to="/about-us">
                                                        <a className="nav-link">About Us</a>
                                                    </Link>
                                                </li>
                            <li className="nav-item">
                        <Link activeClassName="active" to="/services">
                            <a className="nav-link">Services</a>
                        </Link>
                    </li>
                   
                                    {/* <li className="nav-item">
                                        <a to="#" className="nav-link">Pages <i className="icofont-simple-down"></i>
                                    </a>
                                        <ul className="dropdown_menu">
                                            <li className="nav-item">
                                                <a to="#" className="nav-link">About</a>
                                                <ul className="dropdown_menu">
                                                    
                                                    <li className="nav-item">
                                                        <Link activeClassName="active" to="/about-me">
                                                            <a className="nav-link">About Me</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>

                                            <li className="nav-item">
                                                <a to="#" className="nav-link">Team</a>
                                                <ul className="dropdown_menu">
                                                    <li className="nav-item">
                                                        <Link activeClassName="active" to="/team">
                                                            <a className="nav-link">Team</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link activeClassName="active" to="/team-details">
                                                            <a className="nav-link">Team Details</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            
                                            
                                           

                                            <li className="nav-item">
                                                <Link activeClassName="active" to="/coming-soon">
                                                    <a className="nav-link">Coming Soon</a>
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link activeClassName="active" to="/error">
                                                    <a className="nav-link">404 Error</a>
                                                </Link>
                                            </li>
                                            
                                            <li className="nav-item">
                                                <Link activeClassName="active" to="/faq">
                                                    <a className="nav-link">FAQ</a>
                                                </Link>
                                            </li>

                                           
                                        </ul>
                                    </li> */}
                                   
                                            <li className="nav-item">
                                                <Link activeClassName="active" to="/faq">
                                                    <a className="nav-link">FAQ</a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link activeClassName="active" to="/blog">
                                                    <a className="nav-link">News</a>
                                                </Link>
                                            </li>
                                            {/* <li className="nav-item">
                                                <Link activeClassName="active" to="/blog">
                                                    <a className="nav-link">Blog</a>
                                                </Link>
                                            </li> */}
                                             <li className="nav-item">
                                                <Link activeClassName="active" to="/contact">
                                                    <a className="nav-link">Contact</a>
                                                </Link>
                                            </li>
                                           
                                            <li className="nav-item">
                                                <Link activeClassName="active" to="/signup">
                                                    <a className="nav-link">Join</a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link activeClassName="active" to="/login">
                                                    <a className="nav-link">Login</a>
                                                </Link>
                                            </li>
                       
                                   
                                 
                                    {/* <li className="nav-item">
                                        <Link activeClassName="active" to="/contact">
                                            <a className="nav-link">Contact</a>
                                        </Link>
                                    </li> */}
                                </ul>

                                <div className="others-option">
                                    <ul>
                                        {/* <li>
                                            <span 
                                                className="search-popup-icon"
                                                onClick={this.handleSearchForm}
                                            >
                                                <i className="icofont-ui-search"></i>
                                            </span>
                                        </li> */}

                                        {/* <li>
                                            <Link to="/cart">
                                                <a className="cart-icon">
                                                    <i className="icofont-bag"></i>
                                                    <span>{products.length}</span>
                                                </a>
                                            </Link>
                                        </li> */}

                                        <li onClick={this.handleDrawer}>
                                            <div className="side-menu">
                                                <span className="bar-1"></span>
                                                <span className="bar-2"></span>
                                                <span className="bar-3"></span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <SearchForm onClick={this.handleSearchForm} active={this.state.searchForm ? 'active' : ''} />
                    <SideDrawer onClick={this.handleDrawer} show={this.state.drawer ? 'show' : ''} />
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        products: state.addedItems
    }
}

export default Navbar;