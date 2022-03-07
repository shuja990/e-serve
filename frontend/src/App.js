import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './pages/module1/login/LoginScreen'
import RegisterScreen from './pages/module1/signup/RegisterScreen'
import ProfileScreen from './pages/module1/profile/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import PaidServices from './pages/PaidServices/PaidServices'
import CreatePaidService from './pages/CreatePaidService/CreatePaidService'
import PaidServiceUpdate from './pages/PaidServiceUpdate/PaidServiceUpdate'
import PaidServiceDetails from './pages/PaidServiceDetails/PaidServiceDetails'
import Dashboard from './pages/module1/dashboard/Dashboard'
import MapScreen from './pages/Module-8/MapScreen/MapScreen'
import CreateRentPost from './pages/module5/CreateRentPost'
import RentPosts from './pages/module5/RentPostsList'
import RentPostsPage from './pages/module5/RentPostPage'
import UpdateRentPost from './pages/module5/UpdateRentPost'
import CommunityServicePostsLists from './pages/module6/CommunityServicePostsLists'
import CreateCommunityServicePost from './pages/module6/CreateCommunityServicePost'
import CommunityServicePage from './pages/module6/CommunityServicePage'
import UpdateCommunityServicePost from './pages/module6/UpdateCommunityServicePost'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          {/* paid services */}
          <Route path='/paidservices' component={PaidServices} />
          <Route exact path='/paidservice/:id' component={PaidServiceDetails} />
          <Route path='/createpaidservice' component={CreatePaidService} />
          <Route path='/paidservice/:id/edit' component={PaidServiceUpdate} />

          {/*  */}

          {/* Map */}
          <Route path='/map' component={MapScreen} />

          {/*  */}
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact 
          />
          <Route path='/' component={HomeScreen} exact />
          {/* Rent Posts */}
          <Route path='/rentposts' component={RentPosts} exact />
          <Route path='/createrentpost' component={CreateRentPost} exact />
          <Route path='/rentposts/:id' component={RentPostsPage} exact />
          <Route path='/rentposts/:id/edit' component={UpdateRentPost} exact />
          {/* Community Service Posts */}
          <Route path='/communityserviceposts' component={CommunityServicePostsLists} exact />
          <Route path='/createcommunityservicepost' component={CreateCommunityServicePost} exact />
          <Route path='/communityserviceposts/:id' component={CommunityServicePage} exact />
          <Route path='/communityserviceposts/:id/edit' component={UpdateCommunityServicePost} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
