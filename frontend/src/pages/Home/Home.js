import React,{useEffect,useState} from 'react'
import './Home.css'
import {Link} from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ProductsContent from '../../components/shop/ProductsContent';
import axios from 'axios'
const Home = () => {
    const[data,setData] = useState([])
    useEffect( () => {
            async function fetchdata(){
            // const { rent } = await axios.get(`/api/rent`)
            // const { services } = await axios.get(`/api/services`)
            // const { community } = await axios.get(`/api/communityservice`)
            // console.log(services);
            // console.log(services);
            // console.log(community);
            var axiosInstance = axios.create({
                baseURL: 'http://127.0.0.1:5000',
                /* other custom settings */
              });
            const { rent } = await axiosInstance.get(`/api/rent`)
                console.log(rent);
            console.log('here');
            fetch('http:localhost:5000/api/services')
  .then(response => response.json())
  .then(data => {console.log(data)
    setData(data)
});
  

        }
        fetchdata()
    }, [])

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
