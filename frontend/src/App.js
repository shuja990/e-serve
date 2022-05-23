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
import UserListScreen from './pages/module3/Users'
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
import PaymentUpdate from './pages/module1/PaymentUpdate'
import { useDispatch } from 'react-redux'
import PaymentDone from './pages/PromotePost/PaymentDone'
import { addWebVisits, getWebVisits } from './actions/webVisitActions'
import MakeAdmin from './pages/module3/MakeAdmin'
import RentPostsAdmin from './pages/module3/RentPosts'
import ServicePostsAdmin from './pages/module3/ServicePosts'
import CommunityServicePostAdmin from './pages/module3/CommunityServicePosts'
import AdminDashboard from './pages/module3/Dashboard'
import ChatScreen from './pages/m-3-chat/ChatScreen'
import PaymentSuccessScreen from './pages/paidServicesOrder/PaymentSuccessPage'
import OrderPage from './pages/paidServicesOrder/OrderPage'
import ConflictScreen from './pages/m-4-conflict-management/ConflictScreen'
import OrdersHistory from './pages/m-4-conflict-management/OrdersHistory'
import SellersOrdersHistory from './pages/m-4-conflict-management/SellersOrdersHistory'
import Conflicts from './pages/m-4-conflict-management/Conflicts'
import RentContractPage from './pages/module5/RentContract'
import MyProductsRented from './pages/module5/MyProductsRented'
import MyRentedProducts from './pages/module5/MyRentedProducts'
import OffersRecieved from './pages/module5/OffersRecieved'
import OffersSent from './pages/module5/OffersSent'
import PromotePaidSerivcePost from './pages/PromotePost/PromotePaidServicePost'
import PromoteRentPost from './pages/PromotePost/PromotRentPost'
import RentContracts from './pages/module3/RentContracts'
import ServiceOrders from './pages/module3/ServiceOrders'
const App = () => {
  
  const dispatch= useDispatch()
  const updateWebAppVisit=()=>{
    const visited= sessionStorage.getItem('visitSession')

    if(!visited){
      dispatch(addWebVisits())
    

      // dispatch(addWebVisits())
    }
  }
  updateWebAppVisit()
  sessionStorage.setItem('visitSession', true)

  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          {/* <Route path='/order/:id' component={OrderPage} /> */}
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
        {/* Admin Panel */}
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={MakeAdmin} />
          <Route path='/admin/rent/' component={RentPostsAdmin} />
          <Route path='/admin/services/' component={ServicePostsAdmin} />
          <Route path='/admin/communityservices/' component={CommunityServicePostAdmin} />
          <Route path='/admin/dashboard/' component={AdminDashboard} />

 
          <Route path='/order/:id' component={OrderPage} />
          {/* paid services */}
          <Route path='/paidservices' component={PaidServices} />
          <Route exact path='/paidservice/:id' component={PaidServiceDetails} />
          <Route path='/createpaidservice' component={CreatePaidService} />
          <Route path='/paidservice/:id/edit' component={PaidServiceUpdate} />
          <Route path='/promotepaidservice/:id' component={PromotePaidSerivcePost} />
          <Route path='/promoterentpost/:id' component={PromoteRentPost} />

          <Route path='/promotepaymentsuccess/:id' component={PaymentDone} />

          {/*  */}

          {/* Map */}
          <Route path='/map' component={MapScreen} />

          {/* Admin */}
        
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
          <Route path='/onboardsuccess' component={PaymentUpdate} exact />
          <Route path='/paymentsuccess/:id' component={PaymentSuccessScreen} exact />
          <Route path='/rentcontract/:id' component={RentContractPage} exact />
          <Route path='/myrentedproducts' component={MyProductsRented} exact />
          <Route path='/myrentedfromproducts' component={MyRentedProducts} exact />
          <Route path='/offersreceived' component={OffersRecieved} exact />
          <Route path='/offerssent' component={OffersSent} exact />
          <Route path='/admin/rentcontracts' component={RentContracts} exact />
          <Route path='/admin/orders' component={ServiceOrders} exact />

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
          {/* chat screen */}
          <Route path='/chat' component={ChatScreen} exact />
          {/* conflict screen */}
          <Route path='/conflict/:id' component={ConflictScreen} exact />
          {/* buyers order history */}
          <Route path='/buyersorderhistory' component={OrdersHistory} exact />
          {/* sellers order history */}
          <Route path='/sellersorderhistory' component={SellersOrdersHistory} exact />
          {/* my conflicts */}
          <Route path='/myconflicts/:id' component={Conflicts} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
