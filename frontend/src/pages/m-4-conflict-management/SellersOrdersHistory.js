import React, { useEffect }  from 'react'
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import { Button, Table } from "react-bootstrap";
import Loader from "../../components/Loader";
import {
  deleteRentPost,
  rentPostsListAnalytics,
} from "../../actions/rentActions";
import {
  deletePaidService,
  paidServicesListAnalytics,
} from "../../actions/paidServiceActions";
import {
  deletecommunityServicePost,
  myCommunityServicePosts,
} from "../../actions/communityServiceActions";
import { RENT_DELETE_RESET } from "../../constants/rentConstants";
import { COMMUNITY_SERVICE_DELETE_RESET } from "../../constants/communityServiceConstants";
import { PAID_SERVICES_DELETE_RESET } from "../../constants/paidServiceConstants";
import { listMyOrdersAsBuyer, listMyOrdersAsSeller } from '../../actions/orderActions';
import { LinkContainer } from 'react-router-bootstrap';


function SellersOrdersHistory({history}) {

    const dispatch = useDispatch();
  const rentPostList = useSelector((state) => state.rentPosts);
  const { loading: rentLoading, error: rentError, rentPosts } = rentPostList;
  const paidServicesStoreList = useSelector((state) => state.paidServiceList);
  const orderListMy = useSelector((state) => state.orderListMy);
  const {
    
    paidServices
  } = paidServicesStoreList;

  const {
    loading: ordersLoading,
    error: ordersError,
    orders: buyersOrders,
  } = orderListMy;

  const communitySList = useSelector((state) => state.communityServicePosts);
  const { loading, error, communityServicePosts } = communitySList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const rentDelete = useSelector((state) => state.rentPostDelete);
  const { loading: rdloading, error: rdError, success: rdSuccess } = rentDelete;
  const csDelete = useSelector((state) => state.communityServicePostDelete);
  const { loading: csloading, error: csError, success: csSuccess } = csDelete;
  const paidDelete = useSelector((state) => state.paidServiceDelete);
  const { loading: psloading, error: psError, success: psSuccess } = paidDelete;

    
  useEffect(() => {
    if (userInfo) {
    //   dispatch(rentPostsListAnalytics(userInfo._id));
    //   dispatch(paidServicesListAnalytics(userInfo._id));
    //   dispatch(myCommunityServicePosts(userInfo._id));
      dispatch(listMyOrdersAsSeller(userInfo._id))
  

    } else {
      history.push("/login");
    }
    return () => {
    //   dispatch({ type: RENT_DELETE_RESET });
    //   dispatch({ type: COMMUNITY_SERVICE_DELETE_RESET });
    //   dispatch({ type: PAID_SERVICES_DELETE_RESET });
    };
  }, [
    dispatch,
    userInfo._id,
    userInfo,
    history,
    psSuccess,
    csSuccess,
    rdSuccess,
  ]);

  const deletePSPost = (id) => {
    dispatch(deletePaidService(id));
  };


  return (
    <div>
        <h1 className='text-center' >Seller's Orders History</h1>
       {
           ordersLoading? 
           
           <Loader/>
           :
           error ?
           <Message variant="danger">{ordersError}</Message>
           :
           <Table striped bordered hover responsive className="table-sm">
           <thead>
             <tr>
               <th>ID</th>
               <th>Title</th>
               <th>Price</th>
               <th>Seller</th>
               <th>Order Status</th>
               <th>Is Paid</th>
               <th>timestamps</th>
               <th colSpan={2} >Actions</th>
             </tr>
           </thead>
           <tbody>
             {buyersOrders?.map((order) => (
               <tr key={order._id}>
                 <td>{order._id}</td>
                 <td>{order.orderItem.title}</td>
                 <td>{order.orderItem.price}</td>
                 <td>{order.seller.name}</td>
                 <td>{order.orderStatus}</td>
                 <td>{order.isPaid.toString()}</td>
                 <td>{order?.createdAt}</td>
                 <td>  <LinkContainer to={`/createconflict/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Create Dispute
                    </Button>
                  </LinkContainer></td>
                 <td>
                   {" "}
                   {ordersLoading ? (
                     <Loader />
                   ) : (
                    <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                   )}
                 </td>
               </tr>
             ))}
           </tbody>
         </Table>
       }
    </div>
  )
}

export default SellersOrdersHistory